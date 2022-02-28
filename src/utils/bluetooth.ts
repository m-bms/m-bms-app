import { ScanResult } from "@capacitor-community/bluetooth-le";
import { randMac, randNumber, randProductName } from "@ngneat/falso";
import { promise } from "fastq";
import { proxy } from "valtio";
import { tabSettings } from "../layout/TabSettings";
import { sleep } from "./common";

const SCAN_RESULT_MAX = 20;

export enum BluetoothError {
  BLUETOOTH_NOT_FOUND,
}

const queueScan = promise(async (task: () => unknown) => task(), 1);

export const bluetooth = proxy({
  scanResults: [] as ScanResult[],
  scanning: false,
  startScan(onError?: (error: BluetoothError) => unknown) {
    if (bluetooth.scanning) return;
    bluetooth.scanning = true;
    bluetooth.scanResults = [];

    queueScan.push(() => sleep(1000));
    queueScan.push(async () => {
      if (tabSettings.bluetoothEnabled) return;

      await sleep(500);
      bluetooth.stopScan();
      onError?.(BluetoothError.BLUETOOTH_NOT_FOUND);
    });

    let resultCount = 0;
    const addScanResult = () => {
      if (++resultCount > SCAN_RESULT_MAX || !tabSettings.devicesEnabled) {
        queueScan.push(() => sleep(500));
        queueScan.push(bluetooth.stopScan);
        return;
      }

      queueScan.push(() => {
        bluetooth.scanResults.push({
          device: {
            deviceId: randMac(),
            name: randProductName(),
          },
        });
      });

      queueScan.push(() => sleep(randNumber({ min: 100, max: 500 })));
      queueScan.push(addScanResult);
    };

    addScanResult();
  },
  stopScan() {
    if (!bluetooth.scanning) return;
    bluetooth.scanning = false;
    queueScan.kill();
  },
  reset() {
    bluetooth.stopScan();
    bluetooth.scanResults = [];
  },
});

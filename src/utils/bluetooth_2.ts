import { BleDevice, ScanResult } from "@capacitor-community/bluetooth-le";
import {
  randBoolean,
  randMac,
  randNumber,
  randProductName,
} from "@ngneat/falso";
import { promise } from "fastq";
import { proxy } from "valtio";
import { tabSettings } from "../components/TabSettings";
import { sleep } from "./common";

const SCAN_RESULT_MAX = 20;
const INVALID = "[ INVALID ]";

export enum BluetoothResponse {
  BLUETOOTH_NOT_FOUND,
  UNABLED_TO_CONNECT,
  SUCCESS,
  ERROR,
  INTERRUPTED,
}

const queueScan = promise(async (task: () => unknown) => task(), 1);
const queueConnect = promise(async (task: () => unknown) => task(), 1);

export const bluetooth = proxy({
  // SCANNING
  scanResults: [] as ScanResult[],
  scanning: false,
  startScan(onError?: (error: BluetoothResponse) => unknown) {
    bluetooth.scanning = true;
    bluetooth.scanResults = [];

    queueScan.push(() => sleep(100));
    queueScan.push(() => {
      if (tabSettings.bluetoothEnabled) return;
      bluetooth.stopScan();
      onError?.(BluetoothResponse.BLUETOOTH_NOT_FOUND);
    });

    let resultCount = 0;
    const addScanResult = () => {
      if (++resultCount > SCAN_RESULT_MAX || !tabSettings.devicesEnabled) {
        queueScan.push(bluetooth.stopScan);
        return;
      }

      queueScan.push(() => {
        const invalid = randBoolean();
        bluetooth.scanResults.push({
          device: {
            deviceId: randMac(),
            name: invalid ? INVALID : randProductName(),
          },
        });
      });

      queueScan.push(() => sleep(randNumber({ min: 100, max: 500 })));
      queueScan.push(addScanResult);
    };

    addScanResult();
  },
  stopScan() {
    bluetooth.scanning = false;
    queueScan.kill();
  },
  reset() {
    bluetooth.stopScan();
    bluetooth.scanResults = [];
  },

  // CONNECTING
  connect(device: BleDevice, onFinish: (error: boolean) => unknown) {
    queueConnect.push(() => sleep(1500));
    queueConnect.push(() => onFinish(device.name === INVALID));
  },
  stopConnect() {
    queueConnect.kill();
  },
});

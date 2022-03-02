import { randMac, randProductName } from "@ngneat/falso";
import { promise } from "fastq";
import { sleep } from "./common";

export enum WifiReponse {}

export type WifiDevice = {
  ssid: string;
  mac: string;
  connected?: boolean;
};

const SCAN_RESULT_MAX = 10;
export const WIFI_PASSWORD = "1234";

const queueScanNetwork = promise(async (task: () => unknown) => task(), 1);
const queueScanDevice = promise(async (task: () => unknown) => task(), 1);
const queueJoin = promise(async (task: () => unknown) => task(), 1);

export const wifi = {
  // SCANNING
  scanResults: [] as WifiDevice[],
  scanning: false,
  startScan(onFinish: () => unknown) {
    wifi.scanning = true;
    wifi.scanResults = [];

    queueScanNetwork.push(() => sleep(1500));
    queueScanNetwork.push(() => {
      wifi.scanResults = Array.from({ length: SCAN_RESULT_MAX }).map(
        (_, index) => {
          return {
            ssid: randProductName(),
            mac: randMac(),
            connected: !index,
          };
        }
      );

      onFinish();
    });
  },
  stopScan() {
    wifi.scanning = false;
    queueScanNetwork.kill();
  },
  reset() {
    wifi.stopScan();
    wifi.scanResults = [];
  },

  // JOIN
  join(
    device: WifiDevice,
    password: string,
    onFinish: (error: boolean) => unknown
  ) {
    queueJoin.push(() => sleep(1500));
    queueJoin.push(() => onFinish(password !== WIFI_PASSWORD));
  },
  stopConnect() {
    queueJoin.kill();
  },

  devices: [] as ConnectedDevice[],
  async scanDevices() {
    await sleep(2000);
    return wifi.devices;
  },
};

export type ConnectedDevice = {
  name: string;
  id: string;
};

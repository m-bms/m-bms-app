import { WifiWizard2 } from "@awesome-cordova-plugins/wifi-wizard-2";
import { randMac, randProductName } from "@ngneat/falso";
import { promise } from "fastq";
import { proxy } from "valtio";
import { sleep } from "./common";
WifiWizard2;

export enum WifiReponse {}

export type WifiDevice = {
  ssid: string;
  mac: string;
  connected?: boolean;
};

const SCAN_RESULT_MAX = 10;
export const WIFI_PASSWORD = "1234";

const queueScan = promise(async (task: () => unknown) => task(), 1);
const queueJoin = promise(async (task: () => unknown) => task(), 1);

export const wifi = proxy({
  // SCANNING
  scanResults: [] as WifiDevice[],
  scanning: false,
  startScan(onFinish: () => unknown) {
    wifi.scanning = true;
    wifi.scanResults = [];

    queueScan.push(() => sleep(1500));
    queueScan.push(() => {
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
    queueScan.kill();
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
});

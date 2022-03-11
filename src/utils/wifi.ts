import { BleDevice } from "@capacitor-community/bluetooth-le";
import { randFullName, randMac } from "@ngneat/falso";
import { compareStrings, sleep } from "./common";

export type WifiNetwork = {
  ssid: string;
  mac: string;
  current?: boolean;
};

export enum WifiError {
  NO_ERRORS = "no-errors",
  INTERRUPTED = "interrupted",
  NO_HARDWARE = "no-hardware",
  SCAN_FAILED = "scan-failed",
  NO_NETWORKS = "no-networks",
}

export const MAX_NETWORK_COUNT = 20;

export const wifi = {
  async scanNetworks(running: () => boolean) {
    await sleep(2000);

    if (!running()) {
      throw WifiError.INTERRUPTED;
    }

    // if (settings.wifiInvalid) {
    //   throw WifiError.FAILED_TO_INITIALIZE;
    // }

    // if (settings.wifiDisabled) {
    //   throw WifiError.HARDWARE_DISABLED;
    // }

    // if (settings.wifiNoScan) {
    //   throw WifiError.FAILED_TO_SCAN_NETWORKS;
    // }

    // if (settings.wifiNoNetwork) {
    //   throw WifiError.NO_NETWORKS;
    // }

    return Array.from({ length: MAX_NETWORK_COUNT })
      .map((_, index) => {
        return {
          ssid: randFullName(),
          mac: randMac(),
          current: !index,
        } as WifiNetwork;
      })
      .sort((a, b) => compareStrings(a.ssid, b.ssid));
  },
  async scanDevices(running: () => boolean) {
    await sleep(2000);
    return JOINED_DEVICES;
  },
};

const JOINED_DEVICES = [] as BleDevice[];

export const addJoinedDevice = (device: BleDevice) => {
  JOINED_DEVICES.push(device);
};

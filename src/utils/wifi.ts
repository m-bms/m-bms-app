import { BleDevice } from "@capacitor-community/bluetooth-le";
import { randFullName, randMac } from "@ngneat/falso";
import { settingsPage } from "../components/pages/SettingsPage";
import { compareStrings, sleep } from "./common";

export type WifiNetwork = {
  ssid: string;
  mac: string;
  current?: boolean;
};

export enum WifiError {
  INTERRUPTED,
  FAILED_TO_INITIALIZE,
  HARDWARE_DISABLED,
  FAILED_TO_SCAN_NETWORKS,
  NO_NETWORKS,
  FAILED_TO_CONNECT,
}

export const MAX_NETWORK_COUNT = 20;

export const wifi = {
  async scanNetworks(running: () => boolean) {
    await sleep(2000);

    if (!running()) {
      throw WifiError.INTERRUPTED;
    }

    if (settingsPage.wifiInvalid) {
      throw WifiError.FAILED_TO_INITIALIZE;
    }

    if (settingsPage.wifiDisabled) {
      throw WifiError.HARDWARE_DISABLED;
    }

    if (settingsPage.wifiNoScan) {
      throw WifiError.FAILED_TO_SCAN_NETWORKS;
    }

    if (settingsPage.wifiNoNetwork) {
      throw WifiError.NO_NETWORKS;
    }

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

import { BleDevice } from "@capacitor-community/bluetooth-le";
import { randBoolean, randMac, randProductName } from "@ngneat/falso";
import { settingsPage } from "../components/pages/SettingsPage";
import { sleep } from "./common";

export enum BluetoothError {
  INTERRUPTED,
  FAILED_TO_INITIALIZE,
  BLUETOOTH_DISABLED,
  FAILED_TO_SCAN,
  NO_DEVICES,
}

export const NAME_INVALID = "[invalid]";
export const MAX_DEVICE_COUNT = 20;

export const bluetooth = {
  async scanDevices(running: () => boolean) {
    await sleep(2000);

    if (!running()) {
      throw BluetoothError.INTERRUPTED;
    }

    if (settingsPage.bluetoothInvalid) {
      throw BluetoothError.FAILED_TO_INITIALIZE;
    }

    if (settingsPage.bluetoothDisabled) {
      throw BluetoothError.BLUETOOTH_DISABLED;
    }

    if (settingsPage.bluetoothNoScan) {
      throw BluetoothError.FAILED_TO_SCAN;
    }

    if (settingsPage.bluetoothNoClient) {
      throw BluetoothError.NO_DEVICES;
    }

    return Array.from({ length: MAX_DEVICE_COUNT }).map(() => {
      const name = randBoolean() ? NAME_INVALID : randProductName();
      const deviceId = randMac();
      return { deviceId, name } as BleDevice;
    });
  },
};

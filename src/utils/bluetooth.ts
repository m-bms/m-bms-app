import { BleDevice } from "@capacitor-community/bluetooth-le";
import { randBoolean, randMac, randProductName } from "@ngneat/falso";
import { settingsPage } from "../components/pages/SettingsPage";
import { compareStrings, sleep } from "./common";
import { addJoinedDevice } from "./wifi";

export enum BluetoothError {
  INTERRUPTED,
  FAILED_TO_INITIALIZE,
  BLUETOOTH_DISABLED,
  FAILED_TO_SCAN,
  NO_DEVICES,
  FAILED_TO_CONNECT,
}

export const NAME_INVALID = "[INVALID]";
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

    return Array.from({ length: MAX_DEVICE_COUNT })
      .map(() => {
        const suffix = randBoolean() ? NAME_INVALID : "";
        const name = `${randProductName()} ${suffix}`;
        const deviceId = randMac();
        return { deviceId, name } as BleDevice;
      })
      .sort((a, b) => compareStrings(a.name, b.name));
  },
  async connectDevice(device: BleDevice, running: () => boolean) {
    await sleep(2000);

    if (!running()) {
      throw BluetoothError.INTERRUPTED;
    }

    if (device.name!.indexOf(NAME_INVALID) !== -1) {
      throw BluetoothError.FAILED_TO_CONNECT;
    }
  },
  async joinDevice(device: BleDevice, running: () => boolean) {
    await sleep(2000);

    if (!running()) {
      throw BluetoothError.INTERRUPTED;
    }

    addJoinedDevice(device);
  },
};

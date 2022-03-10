import { BleDevice } from "@capacitor-community/bluetooth-le";
import { randBoolean, randMac, randVehicle } from "@ngneat/falso";
import { compareStrings, sleep } from "./common";
import { addJoinedDevice } from "./wifi";

export type BlueToothDevice = {
  id?: string;
  name?: string;
  bms?: boolean;
};

export enum BluetoothError {
  INTERRUPTED,
  FAILED_TO_INITIALIZE,
  BLUETOOTH_DISABLED,
  FAILED_TO_SCAN,
  NO_DEVICES,
  FAILED_TO_CONNECT,
}

const NAME_BMS = "[BMS]";
const NAME_INVALID = "[INVALID]";
const MAX_DEVICE_COUNT = 15;

export const bluetooth = {
  async scanDevices(running: () => boolean) {
    await sleep(200);

    if (!running()) return BluetoothError.INTERRUPTED;

    return Array.from({ length: MAX_DEVICE_COUNT })
      .map(() => {
        const bms = randBoolean();
        const invalid = randBoolean();
        const tokens = [
          randVehicle(),
          bms && NAME_BMS,
          invalid && NAME_INVALID,
        ];

        return {
          id: randMac(),
          name: tokens.filter(Boolean).join(" "),
          bms,
        } as BlueToothDevice;
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

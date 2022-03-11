import { randBoolean, randMac, randNumber, randVehicle } from "@ngneat/falso";
import { compareStrings, sleep } from "../common";
import { BlueToothDevice, BluetoothError } from "./type";
import { settings } from "/src/layout/SettingsPage";

const NAME_BMS = "[BMS]";
const NAME_INVALID = "[INVALID]";
const MAX_DEVICE_COUNT = 10;

export const fakeBluetooth = {
  async scanDevices(active: () => boolean) {
    await sleep(2000);

    if (!active()) {
      throw BluetoothError.INTERRUPTED;
    }

    if (settings.bluetoothError !== BluetoothError.NO_ERRORS) {
      throw settings.bluetoothError;
    }

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
  async connectDevice(device: BlueToothDevice, active: () => boolean) {
    await sleep(randNumber({ min: 500, max: 2000 }));

    if (!active()) {
      throw BluetoothError.INTERRUPTED;
    }

    if (!device.bms || device.name.indexOf(NAME_INVALID) >= 0) {
      throw BluetoothError.CONNECT_FAILED;
    }
  },
};

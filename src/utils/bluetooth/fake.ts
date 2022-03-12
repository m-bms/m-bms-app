import { randBoolean, randMac, randNumber, randVehicle } from "@ngneat/falso";
import { compareStrings, sleep } from "../common";
import { Status } from "../status";
import { BlueToothDevice } from "./type";
import { settings } from "/src/layout/SettingsPage";

const NAME_BMS = "[BMS]";
const NAME_INVALID = "[INVALID]";
const MAX_DEVICE_COUNT = 10;

export const fakeBluetooth = {
  async scanDevices(unmounted: () => boolean) {
    await sleep(2000);
    if (unmounted()) throw Status.INTERRUPTED;

    if (settings.bluetoothStatus !== Status.SUCCESSFUL)
      throw settings.bluetoothStatus;

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
  async connectDevice(unmounted: () => boolean, device: BlueToothDevice) {
    await sleep(randNumber({ min: 500, max: 3000 }));
    if (unmounted()) throw Status.INTERRUPTED;

    if (!device.bms || device.name.indexOf(NAME_INVALID) >= 0)
      throw Status.FAILED;
  },
};

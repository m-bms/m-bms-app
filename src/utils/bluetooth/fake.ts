import { randBoolean, randMac, randNumber, randVehicle } from "@ngneat/falso";
import { compareStrings, sleep } from "../common";
import { Status } from "../status";
import { WIFI_NETWORK_PASSWORD } from "../wifi";
import { BlueToothDevice } from "./type";
import { settings } from "/src/layout/SettingsPage";

const NAME_BMS = "[BMS]";
const NAME_NO_JOIN = "[NO_JOIN]";
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
        const noJoin = randBoolean();
        const tokens = [randVehicle(), bms && NAME_BMS, noJoin && NAME_NO_JOIN];

        return {
          id: randMac(),
          name: tokens.filter(Boolean).join(" "),
          bms,
        } as BlueToothDevice;
      })
      .sort((a, b) => compareStrings(a.name, b.name));
  },
  async connectDevice(unmounted: () => boolean, device: BlueToothDevice) {
    await sleep(randNumber({ min: 500, max: 2000 }));
    if (unmounted()) throw Status.INTERRUPTED;

    if (!device.bms) throw Status.FAILED;
  },
  async joinDevice(
    unmounted: () => boolean,
    device: BlueToothDevice,
    password?: string
  ) {
    await sleep(randNumber({ min: 500, max: 2000 }));
    if (unmounted()) throw Status.INTERRUPTED;

    if (
      device.name.indexOf(NAME_NO_JOIN) >= 0 ||
      password !== WIFI_NETWORK_PASSWORD
    )
      throw Status.FAILED;
  },
};

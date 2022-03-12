import { randBoolean, randMac, randNumber, randVehicle } from "@ngneat/falso";
import { proxy } from "valtio";
import { compareStrings, sleep } from "../common";
import { Status } from "../status";
import { BlueToothDevice } from "./type";
import { settings } from "/src/layout/SettingsPage";

const NAME_BMS = "[BMS]";
const NAME_INVALID = "[INVALID]";
const MAX_DEVICE_COUNT = 10;

export const fakeBluetooth = proxy({
  devices: [] as BlueToothDevice[],
  scanning: Status.IDLE,
  connecting: Status.IDLE,
  setSelectedAll(value: boolean) {
    fakeBluetooth.devices.forEach((device) => (device.selected = value));
  },
  clean() {
    fakeBluetooth.devices = [];
    fakeBluetooth.scanning = Status.IDLE;
    fakeBluetooth.connecting = Status.IDLE;
  },
  async scanDevices(unmounted: () => boolean) {
    fakeBluetooth.scanning = Status.ACTIVE;

    await sleep(2000);
    if (unmounted()) {
      fakeBluetooth.clean();
      return;
    }

    fakeBluetooth.scanning = settings.bluetoothStatus;
    if (fakeBluetooth.scanning !== Status.SUCCESSFUL) return;

    fakeBluetooth.devices = Array.from({ length: MAX_DEVICE_COUNT })
      .map(() => {
        const bms = randBoolean();
        const invalid = randBoolean();
        const tokens = [
          randVehicle(),
          bms && NAME_BMS,
          invalid && NAME_INVALID,
        ];

        const device: BlueToothDevice = proxy({
          id: randMac(),
          name: tokens.filter(Boolean).join(" "),
          bms,
          connecting: Status.IDLE,
          joining: Status.IDLE,
          toggleSelected: () => (device.selected = !device.selected),
          async connect(unmounted) {
            device.connecting = Status.ACTIVE;

            await sleep(randNumber({ min: 500, max: 3000 }));
            if (unmounted()) return;

            device.connecting =
              device.bms && device.name.indexOf(NAME_INVALID) < 0
                ? Status.SUCCESSFUL
                : Status.FAILED;
          },
        });

        return device;
      })
      .sort((a, b) => compareStrings(a.name, b.name));
  },
});

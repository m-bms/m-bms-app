import { randFullName, randMac } from "@ngneat/falso";
import { proxy } from "valtio";
import { compareStrings, sleep } from "../common";
import { Status } from "../status";
import { WifiNetwork } from "./type";
import { settings } from "/src/layout/SettingsPage";

const MAX_DEVICE_COUNT = 10;

export const fakeWifi = proxy({
  networks: [] as WifiNetwork[],
  scanning: Status.IDLE,
  clean() {
    fakeWifi.networks = [];
    fakeWifi.scanning = Status.IDLE;
  },
  async scanNetworks(unmounted: () => boolean) {
    fakeWifi.scanning = Status.ACTIVE;

    await sleep(200);
    if (unmounted()) {
      fakeWifi.clean();
      return;
    }

    fakeWifi.scanning = settings.wifiStatus;
    if (fakeWifi.scanning !== Status.SUCCESSFUL) return;

    fakeWifi.networks = Array.from({ length: MAX_DEVICE_COUNT })
      .map(() =>
        proxy<WifiNetwork>({
          ssid: randFullName(),
          mac: randMac(),
        })
      )
      .sort((a, b) => compareStrings(a.ssid, b.ssid));

    fakeWifi.networks[0].current = true;
  },
});

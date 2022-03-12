import { randFullName, randMac } from "@ngneat/falso";
import { proxy } from "valtio";
import { compareStrings, sleep } from "../common";
import { Status } from "../status";
import { WifiNetwork } from "./type";
import { settings } from "/src/layout/SettingsPage";

export const MAX_DEVICE_COUNT = 10;
export const WIFI_NETWORK_PASSWORD = "123456";

export const fakeWifi = proxy({
  async scanNetworks(unmounted: () => boolean) {
    await sleep(2000);
    if (unmounted()) throw Status.INTERRUPTED;

    if (settings.wifiStatus !== Status.SUCCESSFUL) throw settings.wifiStatus;

    const networks: WifiNetwork[] = Array.from({ length: MAX_DEVICE_COUNT })
      .map(() => ({
        ssid: randFullName(),
        mac: randMac(),
      }))
      .sort((a, b) => compareStrings(a.ssid, b.ssid));

    networks[0].current = true;
    return networks;
  },
});

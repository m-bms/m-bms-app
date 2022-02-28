import { ThemeMode } from "/src/utils/theme";
import { proxyWithStorage } from "/src/utils/valtio";

export const tabSettings = proxyWithStorage("tab-settings", {
  themeMode: ThemeMode.DARK,
  bluetoothEnabled: true,
  devicesEnabled: true,

  reset() {
    tabSettings.themeMode = ThemeMode.DARK;
    tabSettings.bluetoothEnabled = true;
    tabSettings.devicesEnabled = true;
  },
});

import { ThemeMode } from "/src/components/ThemeModeProvider";
import { proxyWithStorage } from "/src/utils/valtio";

export const settingsPage = proxyWithStorage("settings-page", {
  themeMode: ThemeMode.DARK,
  bluetoothEnabled: true,
  devicesEnabled: true,

  reset() {
    settingsPage.themeMode = ThemeMode.DARK;
    settingsPage.bluetoothEnabled = true;
    settingsPage.devicesEnabled = true;
  },
});

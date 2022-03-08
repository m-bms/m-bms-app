export { BluetoothGroup, WifiGroup };

import { Divider, List } from "@mui/material";
import IconArrowLeft from "~icons/fluent/arrow-left-24-regular?raw";
import { BasePage } from "../../components/BasePage";
import { ThemeMode } from "../../components/ThemeModeProvider";
import { app, AppPage } from "../App";
import { AppGroup } from "./groups/AppGroup";
import { BluetoothGroup } from "./groups/BluetoothGroup";
import { DebugGroup } from "./groups/DebugGroup";
import { InfoGroup } from "./groups/InfoGroup";
import { WifiGroup } from "./groups/WifiGroup";
import { proxyWithStorage } from "/src/utils/valtio";

export const settingsPage = proxyWithStorage("settings-page", {
  themeMode: ThemeMode.DARK,
  bluetoothInvalid: false,
  bluetoothDisabled: false,
  bluetoothNoScan: false,
  bluetoothNoClient: false,
  wifiInvalid: false,
  wifiDisabled: false,
  wifiNoScan: false,
  wifiNoNetwork: false,

  reset() {
    settingsPage.themeMode = ThemeMode.DARK;
    settingsPage.bluetoothInvalid = false;
    settingsPage.bluetoothDisabled = false;
    settingsPage.bluetoothNoScan = false;
    settingsPage.bluetoothNoClient = false;
    settingsPage.wifiInvalid = false;
    settingsPage.wifiDisabled = false;
    settingsPage.wifiNoScan = false;
    settingsPage.wifiNoNetwork = false;
  },
});

export const SettingsPage = () => {
  return (
    <BasePage
      header={{
        title: "Settings",
        headButtons: {
          iconRaw: IconArrowLeft,
          onClick: () => (app.page = AppPage.HOME),
        },
      }}
    >
      <List>
        <InfoGroup />
        <Divider />
        <AppGroup />
        <Divider />
        <DebugGroup />
        <Divider />
        <BluetoothGroup />
        <Divider />
        <WifiGroup />
      </List>
    </BasePage>
  );
};

import { Divider, List } from "@mui/material";
import IconArrowLeft from "~icons/fluent/arrow-left-24-regular?raw";
import { AppGroup } from "./groups/AppGroup";
import { BluetoothGroup } from "./groups/BluetoothGroup";
import { DebugGroup } from "./groups/DebugGroup";
import { InfoGroup } from "./groups/InfoGroup";
import { app, AppPage } from "/src/components/App";
import { BasePage } from "/src/components/BasePage";
import { ThemeMode } from "/src/components/ThemeModeProvider";
import { proxyWithStorage } from "/src/utils/valtio";

export const settingsPage = proxyWithStorage("settings-page", {
  themeMode: ThemeMode.DARK,
  bluetoothInvalid: false,
  bluetoothDisabled: false,
  bluetoothNoScan: false,
  bluetoothNoClient: false,

  reset() {
    settingsPage.themeMode = ThemeMode.DARK;
    settingsPage.bluetoothInvalid = false;
    settingsPage.bluetoothDisabled = false;
    settingsPage.bluetoothNoScan = false;
    settingsPage.bluetoothNoClient = false;
  },
});

export const SettingsPage = () => {
  return (
    <BasePage
      header={{
        title: "Settings",
        headButtons: [
          {
            iconRaw: IconArrowLeft,
            onClick: () => (app.page = AppPage.HOME),
          },
        ],
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
      </List>
    </BasePage>
  );
};

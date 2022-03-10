export { BluetoothGroup, WifiGroup };

import { Container, Divider, List } from "@mui/material";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import { Page } from "../../components/Page";
import { ThemeMode } from "../../components/ThemeModeProvider";
import { app, AppPage } from "../App";
import { AppGroup } from "./groups/AppGroup";
import { BluetoothGroup } from "./groups/BluetoothGroup";
import { DebugGroup } from "./groups/DebugGroup";
import { InfoGroup } from "./groups/InfoGroup";
import { WifiGroup } from "./groups/WifiGroup";
import { Scrollable } from "/src/components/Scrollable";
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
    <Page
      transition
      header={{
        text: "Settings",
        startButtons: {
          iconRaw: IconDismiss,
          onClick: () => (app.page = AppPage.HOME),
        },
      }}
    >
      <Scrollable>
        <Container maxWidth="sm" disableGutters>
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
        </Container>
      </Scrollable>
    </Page>
  );
};

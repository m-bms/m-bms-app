import { Container, Divider, List } from "@mui/material";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import { app, AppPage } from "../App";
import { AppGroup } from "./setting-groups/AppGroup";
import { DebugGroup } from "./setting-groups/DebugGroup";
import { InfoGroup } from "./setting-groups/InfoGroup";
import { Page } from "/src/components/Page";
import { Scrollable } from "/src/components/Scrollable";
import { ThemeMode } from "/src/components/ThemeModeProvider";
import { BluetoothError } from "/src/utils/bluetooth";
import { proxyWithStorage } from "/src/utils/valtio";
import { WifiError } from "/src/utils/wifi";

export const defaultSettings = {
  themeMode: ThemeMode.DARK,
  bluetoothError: BluetoothError.NO_ERRORS,
  wifiError: WifiError.NO_ERRORS,
};

export const settings = proxyWithStorage("settings", {
  ...defaultSettings,
  reset() {
    Object.assign(settings, defaultSettings);
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
          </List>
        </Container>
      </Scrollable>
    </Page>
  );
};

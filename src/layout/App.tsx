import { CssBaseline } from "@mui/material";
import { proxy, useSnapshot } from "valtio";
import { ThemeModeProvider } from "../components/ThemeModeProvider";
import { ConnectDevicesPage } from "./ConnectDevicesPage";
import { HomePage } from "./HomePage";
import { ScanDevicesPage } from "./ScanDevicesPage";
import { ScanNetworksPage } from "./ScanNetworksPage";
import { SelectDevicesPage } from "./SelectDevicesPage";
import { SelectNetworkPage } from "./SelectNetworkPage";
import { settings, SettingsPage } from "./SettingsPage";

export enum AppPage {
  HOME,
  SETTINGS,
  SCAN_DEVICES,
  SELECT_DEVICES,
  CONNECT_DEVICES,
  SCAN_NETWORKS,
  SELECT_NETWORK,
  // ADDED_DEVICE,
}

export const appPageMap = {
  [AppPage.HOME]: <HomePage />,
  [AppPage.SETTINGS]: <SettingsPage />,
  [AppPage.SCAN_DEVICES]: <ScanDevicesPage />,
  [AppPage.SELECT_DEVICES]: <SelectDevicesPage />,
  [AppPage.CONNECT_DEVICES]: <ConnectDevicesPage />,
  [AppPage.SCAN_NETWORKS]: <ScanNetworksPage />,
  [AppPage.SELECT_NETWORK]: <SelectNetworkPage />,
};

export const app = proxy({
  page: AppPage.SCAN_NETWORKS,
});

export const App = () => {
  const { page } = useSnapshot(app);
  const { themeMode } = useSnapshot(settings);

  // TODO: add status bar
  // useEffect(() => {
  //   if (Capacitor.getPlatform() === "web") return;

  //   if (theme.palette.mode === "dark") {
  //     StatusBar.setStyle({ style: Style.Dark });
  //     StatusBar.setBackgroundColor({ color: "#121212" });
  //   } else {
  //     StatusBar.setStyle({ style: Style.Light });
  //     StatusBar.setBackgroundColor({ color: "#fff" });
  //   }
  // }, [theme.palette.mode]);

  return (
    <ThemeModeProvider mode={themeMode}>
      <CssBaseline />

      {appPageMap[page]}
    </ThemeModeProvider>
  );
};

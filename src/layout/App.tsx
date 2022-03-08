import { CssBaseline } from "@mui/material";
import { proxy, useSnapshot } from "valtio";
import { ThemeModeProvider } from "../components/ThemeModeProvider";
import { HomePage } from "./HomePage";
import { SettingsPage, settingsPage } from "./SettingsPage";

export enum AppPage {
  HOME,

  SETTINGS,

  // ADD_DEVICE,
  // SCAN_DEVICES,
  // SELECT_DEVICE,
  // SCAN_NETWORKS,
  // SELECT_NETWORK,
  // ADDED_DEVICE,
}

export const appPageMap = {
  [AppPage.HOME]: <HomePage />,
  [AppPage.SETTINGS]: <SettingsPage />,
  // [AppPage.ADD_DEVICE_START]: <AddDevicePage />,
};

export const app = proxy({
  page: AppPage.SETTINGS,
});

export const App = () => {
  const { page } = useSnapshot(app);
  const { themeMode } = useSnapshot(settingsPage);

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

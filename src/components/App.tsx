import { CssBaseline } from "@mui/material";
import { proxy, useSnapshot } from "valtio";
import { AddDevicePage } from "./pages/AddDevicePage";
import { HomePage } from "./pages/HomePage";
import { SettingsPage, settingsPage } from "./pages/SettingsPage";
import { ThemeModeProvider } from "./ThemeModeProvider";

export enum AppPage {
  HOME,
  SETTINGS,
  ADD_DEVICE,
}

export const app = proxy({
  page: AppPage.HOME,
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

      {page === AppPage.HOME && <HomePage />}
      {page === AppPage.SETTINGS && <SettingsPage />}
      {page === AppPage.ADD_DEVICE && <AddDevicePage />}
    </ThemeModeProvider>
  );
};

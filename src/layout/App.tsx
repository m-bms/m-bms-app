import {
  CssBaseline,
  Stack,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { createTheme } from "../utils/theme";
import { AppBanner } from "./AppBanner";
import { AppBody } from "./AppBody";
import { AppDialog } from "./AppDialog";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { AppToast } from "./AppToast";
import { themeModeAtom } from "./TabSettings";

export const App = () => {
  const [themeMode] = useAtom(themeModeAtom);
  const preferDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => createTheme(themeMode, preferDark),
    [themeMode, preferDark]
  );

  // For mobile browsers that 100vh won't work
  const [appHeight, setAppHeight] = useState(0);
  useEffect(() => {
    const updateAppHeight = () => setAppHeight(visualViewport.height);
    updateAppHeight();
    visualViewport.addEventListener("resize", updateAppHeight);

    return () => visualViewport.removeEventListener("resize", updateAppHeight);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack height={`${appHeight}px`}>
        <AppHeader />
        <AppBody />
        <AppFooter />
      </Stack>
      <AppBanner />
      <AppToast />
      <AppDialog />
    </ThemeProvider>
  );
};

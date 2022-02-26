import { createTheme as _createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export enum ThemeMode {
  AUTO = "auto",
  LIGHT = "light",
  DARK = "dark",
}

export const createTheme = (themeMode: ThemeMode, preferDark: boolean) => {
  return _createTheme({
    palette: {
      mode:
        themeMode !== ThemeMode.AUTO
          ? themeMode
          : preferDark
          ? ThemeMode.DARK
          : ThemeMode.LIGHT,
      grey200: {
        main: grey[200],
      },
    },
  });
};

declare module "@mui/material" {
  interface AppBarPropsColorOverrides {
    grey200: true;
  }

  interface PaletteOptions {
    grey200: SimplePaletteColorOptions;
  }

  interface SimplePaletteColorOptions {}
}

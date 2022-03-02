import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { ReactNode, useMemo } from "react";

export enum ThemeMode {
  AUTO = "auto",
  LIGHT = "light",
  DARK = "dark",
}

const themes = {
  [ThemeMode.LIGHT]: createTheme({ palette: { mode: "light" } }),
  [ThemeMode.DARK]: createTheme({ palette: { mode: "dark" } }),
};

export const ThemeModeProvider = (props: {
  mode: ThemeMode;
  children: ReactNode;
}) => {
  const preferDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return themes[
      props.mode !== ThemeMode.AUTO
        ? props.mode
        : preferDark
        ? ThemeMode.DARK
        : ThemeMode.LIGHT
    ];
  }, [props.mode, preferDark]);

  return <ThemeProvider theme={theme} children={props.children} />;
};

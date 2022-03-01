import { Alert, AlertColor, Snackbar, useTheme } from "@mui/material";
import Color from "color";
import { memo, useMemo } from "react";
import { proxy, useSnapshot } from "valtio";

export const appToast = proxy(
  {} as {
    open?: boolean;
    severity?: AlertColor;
    children?: string;
  }
);

export const AppToast = memo(() => {
  const theme = useTheme();
  const { open, severity = "success", children } = useSnapshot(appToast);

  const themeMode = theme.palette.mode;
  const mainColor = theme.palette[severity].main;

  const backgroundColor = useMemo(() => {
    const color = Color(mainColor);
    return themeMode === "dark" ? color.darken(0.7) : color.lighten(0.7);
  }, [themeMode, mainColor]);

  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      sx={{
        bottom: "58px",
        "@media (min-width: 600px)": {
          bottom: "58px",
        },
        ".MuiAlert-root": {
          width: "100%",
          bgcolor: backgroundColor.toString(),
        },
      }}
      open={open}
      onClose={() => (appToast.open = false)}
    >
      <Alert
        severity={severity}
        onClose={() => (appToast.open = false)}
        children={children}
      />
    </Snackbar>
  );
});

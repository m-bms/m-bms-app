import { Alert, AlertColor, Snackbar } from "@mui/material";
import { memo } from "react";
import { proxy, useSnapshot } from "valtio";

export const appToast = proxy(
  {} as {
    open?: boolean;
    severity?: AlertColor;
    children?: string;
  }
);

export const AppToast = memo(() => {
  const { open, severity = "success", children } = useSnapshot(appToast);

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
          bgcolor: (theme) => `${theme.palette[severity].main}33`,
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

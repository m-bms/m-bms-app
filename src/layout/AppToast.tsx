import { Alert, AlertColor, Snackbar } from "@mui/material";
import { atom, useAtom } from "jotai";

type AppToastAtom = {
  visible?: boolean;
  severity?: AlertColor;
  message?: string;
};

export const appToastAtom = atom<AppToastAtom>({});

export const AppToast = () => {
  const [toast, setToast] = useAtom(appToastAtom);
  const severity = toast.severity ?? "success";

  const closeToast = () => {
    setToast((value) => ({ ...value, visible: false }));
  };

  return (
    <Snackbar
      open={toast.visible}
      onClose={closeToast}
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
    >
      <Alert
        severity={severity}
        onClose={closeToast}
        children={toast.message}
      />
    </Snackbar>
  );
};

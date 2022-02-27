import { Box, Dialog, Grow, useTheme } from "@mui/material";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

type AppDialogAtom = {
  open?: boolean;
  children?: JSX.Element;
};

export const appDialogAtom = atom<AppDialogAtom>({});

export const AppDialog = () => {
  const theme = useTheme();
  const [dialog, setDialog] = useAtom(appDialogAtom);

  const [background, setBackground] = useState<HTMLElement | null>(null);
  const [children, setChildren] = useState<HTMLElement | null>(null);

  const transitionDuration = theme.transitions.duration.short;

  useEffect(() => {
    if (!dialog.open || !children || !background) return;

    const observer = new ResizeObserver(() => {
      background.style.height = `${children.offsetHeight}px`;
    });
    observer.observe(children);

    return () => observer.disconnect();
  }, [dialog.open, children, background]);

  return (
    <Dialog
      open={!!dialog.open}
      onClose={() => setDialog((props) => ({ ...props, open: false }))}
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{
        ref: setBackground,
        sx: {
          position: "relative",
          overflow: "hidden",
          transition: `height ${transitionDuration}ms ${theme.transitions.easing.easeOut}`,
        },
      }}
      TransitionComponent={Grow}
      TransitionProps={{ timeout: transitionDuration }}
    >
      <Box
        ref={setChildren}
        sx={{
          position: "absolute",
          width: "100%",
        }}
        children={dialog.children}
      />
    </Dialog>
  );
};

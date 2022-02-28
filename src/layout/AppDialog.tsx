import { Box, Dialog, Grow, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";

export const appDialog = proxy(
  {} as {
    open?: boolean;
    children?: JSX.Element;
  }
);

export const AppDialog = () => {
  const theme = useTheme();
  const { open, children } = useSnapshot(appDialog);

  const [background, setBackground] = useState<HTMLElement | null>(null);
  const [childrenRoot, setChildrenRoot] = useState<HTMLElement | null>(null);

  const transitionDuration = theme.transitions.duration.standard;

  useEffect(() => {
    if (!open || !childrenRoot || !background) return;

    const observer = new ResizeObserver(() => {
      background.style.height = `${childrenRoot.offsetHeight}px`;
    });
    observer.observe(childrenRoot);

    return () => observer.disconnect();
  }, [open, childrenRoot, background]);

  return (
    <Dialog
      open={!!open}
      onClose={() => (appDialog.open = false)}
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
        ref={setChildrenRoot}
        sx={{
          position: "absolute",
          width: "100%",
        }}
        children={children}
      />
    </Dialog>
  );
};

import { Box, Dialog, Grow } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";

export const appDialog = proxy(
  {} as {
    open?: boolean;
    onClose?: () => unknown;
    children?: JSX.Element;
  }
);

export const AppDialog = memo(() => {
  const { open, onClose, children } = useSnapshot(appDialog);

  const [background, setBackground] = useState<HTMLElement | null>(null);
  const [childrenRoot, setChildrenRoot] = useState<HTMLElement | null>(null);

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
      onClose={() => {
        appDialog.open = false;
        onClose?.();
      }}
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{
        ref: setBackground,
        sx: {
          position: "relative",
          overflow: "hidden",
          transition: `height 200ms`,
        },
      }}
      TransitionComponent={Grow}
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
});

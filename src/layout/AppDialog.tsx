import { Box, Dialog, DialogProps, Grow, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export const AppDialog = (props: DialogProps) => {
  const theme = useTheme();
  const [dialog, setDialog] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!content || !dialog) return;

    const observer = new ResizeObserver(() => {
      dialog.style.height = `${content.offsetHeight}px`;
    });
    observer.observe(content);

    return () => observer.disconnect();
  }, [content, dialog]);

  return (
    <Dialog
      {...props}
      fullWidth={true}
      maxWidth="xs"
      PaperProps={{
        ref: setDialog,
        sx: {
          position: "relative",
          transition: "height 0.2s",
          overflow: "hidden",
        },
      }}
      TransitionComponent={Grow}
      TransitionProps={{ timeout: theme.transitions.duration.enteringScreen }}
    >
      <Box
        ref={setContent}
        sx={{
          position: "absolute",
          width: "100%",
        }}
        children={props.children}
      />
    </Dialog>
  );
};

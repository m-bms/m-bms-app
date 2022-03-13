import { Dialog, Slide, SlideProps } from "@mui/material";
import { ReactNode } from "react";
import { proxy, useSnapshot } from "valtio";

export const bottomDialog = proxy({
  open: false,
  closed: true,
  transition: 0,
});

export const setBottomDialog = (open: boolean, async = false) => {
  bottomDialog.open = open;

  if (open) {
    bottomDialog.closed = false;
    bottomDialog.transition = 0;
  } else if (async) {
    bottomDialog.closed = true;
  } else {
    const transition = setTimeout(() => {
      if (bottomDialog.transition !== transition) return;
      bottomDialog.closed = true;
    }, 1000);

    bottomDialog.transition = transition;
  }
};

export const BottomDialog = (props: { children?: ReactNode }) => {
  const { open } = useSnapshot(bottomDialog);

  return (
    <Dialog
      open={open}
      onClose={() => setBottomDialog(false)}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={
        {
          direction: "up",
        } as SlideProps
      }
      PaperProps={{
        sx: {
          width: 1,
          m: 0,
          position: "fixed",
          bottom: 0,
          borderRadius: 3,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
      children={props.children}
    />
  );
};

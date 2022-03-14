import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactNode, useState } from "react";

export type BaseDialogProps = {
  title: string;
  onClose?: () => unknown;
  actionButton?: {
    text: string;
    onClick?: (closeDialog: () => unknown) => unknown;
  };
  trigger: (openDialog: () => unknown) => JSX.Element;
  children?: ReactNode;
};

export const BaseDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
    props.onClose?.();
  };
  const openDialog = () => setOpen(true);

  return (
    <>
      <Dialog open={open} onClose={closeDialog} fullWidth={true} maxWidth="xs">
        <DialogTitle children={props.title} />

        <DialogContent children={props.children} />

        <DialogActions>
          <Button
            onClick={closeDialog}
            children={props.actionButton ? "Cancel" : "OK"}
          />

          {props.actionButton && (
            <Button
              onClick={() => props.actionButton!.onClick?.(closeDialog)}
              children={props.actionButton.text}
            />
          )}
        </DialogActions>
      </Dialog>

      {props.trigger(openDialog)}
    </>
  );
};

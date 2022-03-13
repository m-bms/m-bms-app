import { ListItemText, Menu, MenuItem } from "@mui/material";
import { ReactNode, useState } from "react";

export type ActionMenuProps = {
  actions?: Array<{
    text: string;
    onClick?(): unknown;
  }>;
  trigger(setAnchor: (anchor: HTMLElement) => void): ReactNode;
};

export const ActionMenu = (props: ActionMenuProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const closeMenu = () => setAnchor(null);

  return (
    <>
      {props.trigger(setAnchor)}

      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={!!anchor}
        onClose={closeMenu}
        BackdropProps={{ invisible: false }}
        PaperProps={{
          sx: { minWidth: 200 },
        }}
      >
        {(props.actions ?? []).map((action, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                action.onClick?.();
                closeMenu();
              }}
            >
              <ListItemText primary={action.text} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

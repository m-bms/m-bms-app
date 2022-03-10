import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { ReactNode, useState } from "react";
import IconCheckmark from "~icons/fluent/checkmark-24-regular?raw";
import { UnpluginIcon } from "./UnpluginIcon";

export const SelectMenu = <T extends string>(props: {
  value: T;
  options?: Array<{
    value: T;
    text: string;
  }>;
  onChange?(value: T): unknown;
  trigger(setAnchor: (anchor: HTMLElement) => void): ReactNode;
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const closeMenu = () => setAnchor(null);

  return (
    <>
      {props.trigger(setAnchor)}

      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={closeMenu}
        BackdropProps={{ invisible: false }}
      >
        {(props.options ?? []).map(({ value, text }) => {
          const selected = value === props.value;

          return (
            <MenuItem
              key={value}
              selected={selected}
              onClick={() => {
                props.onChange?.(value);
                closeMenu();
              }}
            >
              <ListItemText primary={text} />
              <ListItemIcon sx={{ justifyContent: "end" }}>
                {selected && (
                  <UnpluginIcon color="primary" raw={IconCheckmark} />
                )}
              </ListItemIcon>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

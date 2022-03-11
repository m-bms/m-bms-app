import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  PopoverOrigin,
} from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import IconCheckmark from "~icons/fluent/checkmark-24-regular?raw";
import { UnpluginIcon } from "./UnpluginIcon";

export type SelectMenuProps<T extends string> = {
  value: T;
  options?: Array<{
    value: T;
    text: string;
  }>;
  rightOrigin?: boolean;
  onChange?(value: T): unknown;
  trigger(setAnchor: (anchor: HTMLElement) => void, text?: string): ReactNode;
};

export const SelectMenu = <T extends string>(props: SelectMenuProps<T>) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const text = useMemo(
    () => props.options?.find((option) => option.value === props.value)?.text,
    [props.value]
  );

  const closeMenu = () => setAnchor(null);

  const origin: PopoverOrigin = {
    vertical: "top",
    horizontal: "center",
  };

  return (
    <>
      {props.trigger(setAnchor, text)}

      <Menu
        anchorEl={anchor}
        anchorOrigin={origin}
        transformOrigin={origin}
        open={!!anchor}
        onClose={closeMenu}
        BackdropProps={{ invisible: false }}
        PaperProps={{
          sx: { minWidth: 200 },
        }}
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

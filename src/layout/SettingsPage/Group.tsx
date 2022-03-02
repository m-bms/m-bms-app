import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { ComponentProps } from "react";
import { DialogRadioGroup } from "/src/components/DialogRadioGroup";
import { IconArrowDropDown } from "/src/components/IconArrowDropDown";
import { SwitchAndroid12 } from "/src/components/SwitchAndroid12";

export enum ItemType {
  TEXT = "text",
  BUTTON = "button",
  SWITCH = "switch",
  RADIO = "radio",
}

export const Group = (props: {
  header: string;
  items: Array<
    {
      label: string;
      disabled?: boolean;
    } & (
      | {
          type: ItemType.TEXT;
          text: string;
        }
      | {
          type: ItemType.BUTTON;
          text: string;
          onClick?: () => unknown;
        }
      | {
          type: ItemType.SWITCH;
          checked: boolean;
          onClick?: () => unknown;
        }
      | ({
          type: ItemType.RADIO;
          value: string;
        } & Pick<
          ComponentProps<typeof DialogRadioGroup>,
          "title" | "options" | "value" | "onChange"
        >)
    )
  >;
}) => {
  return (
    <>
      <ListSubheader disableSticky children={props.header} />

      {props.items.map((item) => (
        <ListItem key={item.label} sx={{ alignItems: "baseline" }}>
          <ListItemText children={item.label} />

          {item.type === ItemType.TEXT && (
            <Typography variant="caption" children={item.text} />
          )}

          {item.type === ItemType.BUTTON && (
            <ListItemSecondaryAction>
              <Button
                size="small"
                variant="outlined"
                disabled={item.disabled}
                onClick={item.onClick}
                children={item.text}
              />
            </ListItemSecondaryAction>
          )}

          {item.type === ItemType.SWITCH && (
            <ListItemSecondaryAction>
              <SwitchAndroid12
                disabled={item.disabled}
                checked={item.checked}
                onClick={item.onClick}
              />
            </ListItemSecondaryAction>
          )}

          {item.type === ItemType.RADIO && (
            <ListItemSecondaryAction>
              <DialogRadioGroup
                title={item.title}
                options={item.options}
                value={item.value}
                onChange={item.onChange}
                trigger={(openDialog) => (
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={item.disabled}
                    endIcon={<IconArrowDropDown />}
                    onClick={openDialog}
                    children={item.value}
                  />
                )}
              />
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </>
  );
};

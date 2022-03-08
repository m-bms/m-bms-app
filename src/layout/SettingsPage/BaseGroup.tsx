import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { ComponentProps } from "react";
import { IconArrowDropDown } from "../../components/IconArrowDropDown";
import { RadioDialog } from "../../components/RadioDialog";
import { SwitchAndroid12 } from "../../components/SwitchAndroid12";

export enum ItemType {
  TEXT = "text",
  BUTTON = "button",
  SWITCH = "switch",
  RADIO = "radio",
}

export type BaseGroupProps = {
  title?: string;
  disableTitle?: boolean;
  disableGutters?: boolean;
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
          ComponentProps<typeof RadioDialog>,
          "title" | "options" | "value" | "onChange"
        >)
    )
  >;
};

export const BaseGroup = (props: BaseGroupProps) => {
  return (
    <>
      {!props.disableTitle && (
        <ListSubheader disableSticky children={props.title} />
      )}

      {props.items.map((item) => (
        <ListItem
          key={item.label}
          disableGutters={props.disableGutters}
          sx={{ alignItems: "baseline" }}
        >
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
              <RadioDialog
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

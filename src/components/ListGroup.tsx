import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { ComponentProps } from "react";
import { ref } from "valtio";
import { appDialog } from "../layout/AppDialog";
import { DialogRadioGroup } from "./DialogRadioGroup";
import { IconArrowDropDown } from "./IconArrowDropDown";
import { SwitchAndroid12 } from "./SwitchAndroid12";

export enum ListItemType {
  TEXT = "text",
  BUTTON = "button",
  SWITCH = "switch",
  RADIO = "radio",
}

export const ListGroup = (props: {
  header: string;
  items: Array<
    {
      label: string;
      disabled?: boolean;
    } & (
      | {
          type: ListItemType.TEXT;
          text: string;
        }
      | {
          type: ListItemType.BUTTON;
          text: string;
          onClick?: () => unknown;
        }
      | {
          type: ListItemType.SWITCH;
          checked: boolean;
          onClick?: () => unknown;
        }
      | ({
          type: ListItemType.RADIO;
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

          {item.type === ListItemType.TEXT && (
            <Typography variant="caption" children={item.text} />
          )}

          {item.type === ListItemType.BUTTON && (
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

          {item.type === ListItemType.SWITCH && (
            <ListItemSecondaryAction>
              <SwitchAndroid12
                disabled={item.disabled}
                checked={item.checked}
                onClick={item.onClick}
              />
            </ListItemSecondaryAction>
          )}

          {item.type === ListItemType.RADIO && (
            <ListItemSecondaryAction>
              <Button
                size="small"
                variant="outlined"
                disabled={item.disabled}
                onClick={() => {
                  appDialog.open = true;
                  appDialog.children = ref(
                    <DialogRadioGroup
                      title={item.title}
                      options={item.options}
                      value={item.value}
                      onClose={() => (appDialog.open = false)}
                      onChange={item.onChange}
                    />
                  );
                }}
                endIcon={<IconArrowDropDown />}
                children={item.value}
              />
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </>
  );
};

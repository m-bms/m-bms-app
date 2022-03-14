import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { IconArrowDropDown } from "/src/components/IconArrowDropDown";
import { SelectMenu, SelectMenuProps } from "/src/components/SelectMenu";
import { SwitchAndroid12 } from "/src/components/SwitchAndroid12";

export enum SettingType {
  TEXT = "text",
  BUTTON = "button",
  SWITCH = "switch",
  SELECT = "select",
}

export type SettingGroupProps = {
  title?: string;
  settings: Array<
    {
      label: string;
      disabled?: boolean;
    } & (
      | {
          type: SettingType.TEXT;
          text: string;
        }
      | {
          type: SettingType.BUTTON;
          text: string;
          onClick?: () => unknown;
        }
      | {
          type: SettingType.SWITCH;
          checked: boolean;
          onClick?: () => unknown;
        }
      | ({
          type: SettingType.SELECT;
        } & Omit<SelectMenuProps<string>, "trigger">)
    )
  >;
};

export const SettingGroup = (props: SettingGroupProps) => {
  return (
    <>
      <ListSubheader disableSticky children={props.title} />

      {props.settings.map((item) => (
        <ListItem key={item.label} sx={{ alignItems: "baseline" }}>
          <ListItemText children={item.label} />

          {item.type === SettingType.TEXT && (
            <Typography variant="caption" children={item.text} />
          )}

          {item.type === SettingType.BUTTON && (
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

          {item.type === SettingType.SWITCH && (
            <ListItemSecondaryAction>
              <SwitchAndroid12
                disabled={item.disabled}
                checked={item.checked}
                onClick={item.onClick}
              />
            </ListItemSecondaryAction>
          )}

          {item.type === SettingType.SELECT && (
            <SelectMenu
              value={item.value}
              options={item.options}
              onChange={item.onChange}
              trigger={(setAnchor, text) => (
                <Button
                  size="small"
                  variant="outlined"
                  disabled={item.disabled}
                  endIcon={<IconArrowDropDown />}
                  onClick={(event) => setAnchor(event.currentTarget)}
                  children={text}
                />
              )}
            />
          )}
        </ListItem>
      ))}
    </>
  );
};

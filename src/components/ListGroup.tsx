import {
  Button,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { SwitchAndroid12 } from "./SwitchAndroid12";

export enum ListItemType {
  TEXT = "text",
  BUTTON = "button",
  SWITCH = "switch",
}

export const ListGroup = (props: {
  header: string;
  items: Array<{
    type: ListItemType;
    label: string;
    value: string | boolean;
    disabled?: boolean;
    endIcon?: JSX.Element;
    onClick?: () => unknown;
  }>;
}) => {
  return (
    <>
      <ListSubheader disableSticky children={props.header} />

      {props.items.map((item) => (
        <ListItem key={item.label} sx={{ alignItems: "baseline" }}>
          <ListItemText children={item.label} />

          {item.type === ListItemType.TEXT && (
            <Typography variant="caption" children={item.value} />
          )}

          {item.type === ListItemType.BUTTON && (
            <Button
              size="small"
              variant="outlined"
              disabled={item.disabled}
              endIcon={item.endIcon}
              onClick={item.onClick}
              children={item.value}
            />
          )}

          {item.type === ListItemType.SWITCH && (
            <SwitchAndroid12
              disabled={item.disabled}
              checked={!!item.value}
              onClick={item.onClick}
            />
          )}
        </ListItem>
      ))}
    </>
  );
};

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { memo, useMemo } from "react";
import { useSnapshot } from "valtio";
import IconBluetooth from "~icons/fluent/bluetooth-24-regular";
import { Sort, tabFindDevice } from ".";
import { bluetooth } from "/src/utils/bluetooth";
import { compareStrings } from "/src/utils/common";

export const ScanResults = memo(() => {
  const { sort } = useSnapshot(tabFindDevice);
  const { scanResults } = useSnapshot(bluetooth);

  const sortedResults = useMemo(() => {
    const results = [...scanResults];
    if (sort === Sort.OLDEST) return results;
    else if (sort === Sort.NEWEST) return results.reverse();

    return results.sort((a, b) => {
      return compareStrings(
        a.device.name ?? "",
        b.device.name ?? "",
        sort === Sort.DESCENDING
      );
    });
  }, [sort, scanResults]);

  return (
    <List>
      {sortedResults.map(({ device }) => (
        <Box key={device.deviceId}>
          <ListItem sx={{ pr: "120px" }}>
            <ListItemIcon>
              <IconBluetooth height="30px" width="30px" />
            </ListItemIcon>

            <ListItemText
              primary={device.name}
              secondary={device.deviceId}
              primaryTypographyProps={{ noWrap: true }}
              secondaryTypographyProps={{ noWrap: true }}
            />

            <ListItemSecondaryAction>
              <Button variant="outlined" size="small" children="Set up" />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" />
        </Box>
      ))}
    </List>
  );
});

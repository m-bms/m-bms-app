import { Box, Container } from "@mui/material";
import { memo } from "react";
import { useSnapshot } from "valtio";
import { appFooter, AppTab } from "./AppFooter";
import { TabDeviceList } from "./TabDeviceList";
import { TabFindDevice } from "./TabFindDevice";
import { TabSettings } from "./TabSettings";

export const AppBody = memo(() => {
  const { tab } = useSnapshot(appFooter);

  return (
    <Box position="relative" flex={1} overflow="auto" component="main">
      <Container maxWidth="sm" disableGutters>
        {tab === AppTab.DEVICE_LIST && <TabDeviceList />}
        {tab === AppTab.FIND_DEVICE && <TabFindDevice />}
        {tab === AppTab.SETTINGS && <TabSettings />}
      </Container>
    </Box>
  );
});

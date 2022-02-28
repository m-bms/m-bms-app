import { Box, Container, Grow, useTheme } from "@mui/material";
import { proxy, ref, useSnapshot } from "valtio";
import { appFooter, AppTab } from "./AppFooter";
import { TabDeviceList } from "./TabDeviceList";
import { TabFindDevice } from "./TabFindDevice";
import { TabSettings } from "./TabSettings";

export const appBody = proxy({
  el: null as HTMLElement | null,
});

export const AppBody = () => {
  const { tab } = useSnapshot(appFooter);
  const theme = useTheme();

  return (
    <Grow key={tab} in timeout={theme.transitions.duration.standard}>
      <Box
        ref={(value) => (appBody.el = value ? ref(value as HTMLElement) : null)}
        component="main"
        flex={1}
        overflow="auto"
      >
        <Container maxWidth="sm" disableGutters>
          {tab === AppTab.DEVICE_LIST && <TabDeviceList />}
          {tab === AppTab.FIND_DEVICE && <TabFindDevice />}
          {tab === AppTab.SETTINGS && <TabSettings />}
        </Container>
      </Box>
    </Grow>
  );
};

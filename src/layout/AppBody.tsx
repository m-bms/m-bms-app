import { Box, Container, Grow, useTheme } from "@mui/material";
import { atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { AppTab, appTabAtom } from "./AppFooter";
import { TabDeviceList } from "./TabDeviceList";
import { TabFindDevice } from "./TabFindDevice";
import { TabSettings } from "./TabSettings";

export const appBodyAtom = atom<HTMLElement | null>(null);

export const AppBody = () => {
  const [appTab] = useAtom(appTabAtom);
  const setAppBody = useUpdateAtom(appBodyAtom);
  const theme = useTheme();

  return (
    <Grow
      key={appTab}
      in={true}
      timeout={theme.transitions.duration.enteringScreen}
    >
      <Box ref={setAppBody} component="main" flex={1} overflow="auto">
        <Container maxWidth="sm" disableGutters={true}>
          {appTab === AppTab.DEVICE_LIST && <TabDeviceList />}
          {appTab === AppTab.FIND_DEVICE && <TabFindDevice />}
          {appTab === AppTab.SETTINGS && <TabSettings />}
        </Container>
      </Box>
    </Grow>
  );
};

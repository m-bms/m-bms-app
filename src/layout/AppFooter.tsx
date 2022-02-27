import { AppBar, Container, Tab, Tabs } from "@mui/material";
import { atom, useAtom } from "jotai";
import IconBattery from "~icons/fluent/battery-0-24-regular";
import IconSearch from "~icons/fluent/search-24-regular";
import IconSettings from "~icons/fluent/settings-24-regular";

export enum AppTab {
  DEVICE_LIST,
  FIND_DEVICE,
  SETTINGS,
}

export const appTabAtom = atom(AppTab.SETTINGS);

export const AppFooter = () => {
  const [appTab, setAppTab] = useAtom(appTabAtom);

  return (
    <AppBar position="static" color="grey200">
      <Container maxWidth="xs" disableGutters>
        <Tabs
          variant="fullWidth"
          sx={{
            ".MuiTab-root": { fontSize: 20 },
            ".MuiTabs-indicator": { top: 0 },
          }}
          value={appTab}
          onChange={(_, value) => setAppTab(value)}
        >
          <Tab icon={<IconBattery />} />
          <Tab icon={<IconSearch />} />
          <Tab icon={<IconSettings />} />
        </Tabs>
      </Container>
    </AppBar>
  );
};

import { AppBar, Container, Tab, Tabs } from "@mui/material";
import { memo } from "react";
import { proxy, useSnapshot } from "valtio";
import IconBattery from "~icons/fluent/battery-0-24-regular";
import IconSearch from "~icons/fluent/search-24-regular";
import IconSettings from "~icons/fluent/settings-24-regular";

export enum AppTab {
  DEVICE_LIST,
  FIND_DEVICE,
  SETTINGS,
}

export const appFooter = proxy({
  tab: AppTab.DEVICE_LIST,
});

export const AppFooter = memo(() => {
  const { tab } = useSnapshot(appFooter);

  return (
    <AppBar
      position="static"
      color="grey200"
      sx={{
        boxShadow: 0,
        ".MuiTab-root": { fontSize: 20 },
        ".MuiTabs-indicator": { top: 0 },
      }}
    >
      <Container maxWidth="xs" disableGutters>
        <Tabs
          variant="fullWidth"
          value={tab}
          onChange={(_, value) => (appFooter.tab = value as AppTab)}
        >
          <Tab icon={<IconBattery />} />
          <Tab icon={<IconSearch />} />
          <Tab icon={<IconSettings />} />
        </Tabs>
      </Container>
    </AppBar>
  );
});

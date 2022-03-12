import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSnapshot } from "valtio";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import IconWifi1 from "~icons/fluent/wifi-1-24-regular?raw";
import { app, AppPage } from "../App";
import { WifiDebugButton } from "../DebugButton";
import { scanNetworks } from "../ScanNetworksPage";
import { settings } from "../SettingsPage";
import { StepPage } from "/src/components/StepPage";
import { UnpluginIcon } from "/src/components/UnpluginIcon";
import { bluetooth } from "/src/utils/bluetooth";
import { wifi } from "/src/utils/wifi";

export const SelectNetworkPage = () => {
  const { wifiStatus } = useSnapshot(settings);
  const { networks } = useSnapshot(wifi);

  return (
    <StepPage
      headerText="Select network"
      headerDivider
      header={{
        startButtons: {
          iconRaw: IconDismiss,
          onClick() {
            bluetooth.clean();
            wifi.clean();
            app.page = AppPage.HOME;
          },
        },
        endButtons: WifiDebugButton(wifiStatus),
      }}
      footer={{
        startButton: {
          text: "Rescan",
          onClick() {
            wifi.clean();
            scanNetworks.transition = false;
            app.page = AppPage.SCAN_NETWORKS;
          },
        },
        endButton: {
          text: "Custom",
          onClick: () => alert("WIP"),
        },
      }}
    >
      <List>
        {networks.map((network, index) => (
          <ListItem key={index} dense disablePadding divider>
            <ListItemButton sx={{ overflow: "hidden" }}>
              <ListItemAvatar>
                <Avatar>
                  <UnpluginIcon raw={IconWifi1} />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={network.ssid}
                secondary={network.mac}
                primaryTypographyProps={{ noWrap: true }}
              />

              {network.current && (
                <Typography
                  variant="body2"
                  color="primary"
                  children="Current"
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StepPage>
  );
};

import {
  Avatar,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { proxy, useSnapshot } from "valtio";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import IconEye from "~icons/fluent/eye-24-regular?raw";
import IconEyeOff from "~icons/fluent/eye-off-24-regular?raw";
import IconWifi1 from "~icons/fluent/wifi-1-24-regular?raw";
import { BottomDialog, setBottomDialog } from "../../components/BottomDialog";
import { app, AppPage } from "../App";
import { WifiDebugButton } from "../DebugButton";
import { joinDevices } from "../JoinDevicesPage";
import { scanNetworks } from "../ScanNetworksPage";
import { settings } from "../SettingsPage";
import { StepPage } from "/src/components/StepPage";
import { UnpluginIcon } from "/src/components/UnpluginIcon";
import { WifiNetwork, WIFI_NETWORK_PASSWORD } from "/src/utils/wifi";

export const selectNetwork = proxy({
  networks: [] as WifiNetwork[],
  selected: undefined as WifiNetwork | undefined,
  passwordDialog: false,
  passwordShow: false,
  password: "",
});

export const SelectNetworkPage = () => {
  const { wifiStatus } = useSnapshot(settings);
  const { networks, selected, passwordDialog, passwordShow, password } =
    useSnapshot(selectNetwork);

  useEffect(() => {
    setBottomDialog(passwordDialog);
  }, []);

  return (
    <StepPage
      headerText="Select network"
      headerDivider
      header={{
        startButtons: {
          iconRaw: IconDismiss,
          onClick: () => (app.page = AppPage.HOME),
        },
        endButtons: WifiDebugButton(wifiStatus),
      }}
      footer={{
        startButton: {
          text: "Rescan",
          onClick() {
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
      <>
        <List>
          {networks.map((network, index) => (
            <ListItem
              key={index}
              dense
              disablePadding
              divider
              onClick={() => {
                selectNetwork.selected = network;
                setBottomDialog(true);
              }}
            >
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

        <BottomDialog>
          <DialogTitle sx={{ textAlign: "center" }} children={selected?.ssid} />

          <DialogContent>
            <TextField
              type={passwordShow ? "text" : "password"}
              value={password}
              placeholder={`Password [${WIFI_NETWORK_PASSWORD}]`}
              autoFocus
              size="small"
              fullWidth
              onChange={(event) => {
                selectNetwork.password = event.target.value;
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={(event) => {
                      event.stopPropagation();
                      selectNetwork.passwordShow = !passwordShow;
                    }}
                  >
                    <UnpluginIcon raw={passwordShow ? IconEyeOff : IconEye} />
                  </IconButton>
                ),
              }}
            />

            <Box display="flex" mt={4}>
              <Button
                children="Cancel"
                onClick={() => setBottomDialog(false)}
              />

              <Box flex={1} />

              <Button
                variant="contained"
                disabled={password.length < 6}
                disableElevation
                onClick={() => {
                  joinDevices.joineds = [];
                  app.page = AppPage.JOIN_DEVICES;
                  setBottomDialog(false, true);
                }}
                children="Join Devices"
              />
            </Box>
          </DialogContent>
        </BottomDialog>
      </>
    </StepPage>
  );
};

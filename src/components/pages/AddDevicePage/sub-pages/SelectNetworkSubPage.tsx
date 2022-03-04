import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import IconEye from "~icons/fluent/eye-24-regular?raw";
import IconEyeOff from "~icons/fluent/eye-off-24-regular?raw";
import { addDevicePage, SubPage } from "..";
import { BaseSubPage } from "../BaseSubPage";
import { WifiDebugButton } from "../DebugButton";
import { app, AppPage } from "/src/components/App";
import { BaseSvgIcon } from "/src/components/BaseSvgIcon";
import { WifiNetwork } from "/src/utils/wifi";

export const selectNetworkSubPage = proxy({
  networks: [] as WifiNetwork[],
});

export const SelectNetworkSubPage = () => {
  const { networks } = useSnapshot(selectNetworkSubPage);
  const [selected, setSelected] = useState<WifiNetwork>();

  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState("");

  return (
    <BaseSubPage
      header={{
        headButtons: {
          iconRaw: IconDismiss,
          onClick: () => (app.page = AppPage.HOME),
        },
        tailButtons: WifiDebugButton,
      }}
      title="Select network"
      titleUnderline
      scrollable
      footerButtonLeft={{
        text: "Rescan",
        onClick: () => (addDevicePage.subPage = SubPage.SCAN_NETWORK),
      }}
      footerButtonRight={{
        text: "Select",
        disabled: !selected,
        dialog: {
          title: selected?.ssid ?? "",
          onClose() {
            setPassword("");
            setPasswordAlert("");
          },
          actionButton: {
            text: "Join Device",
            onClick() {
              if (!password) {
                setPasswordAlert("Required");
                return;
              }

              addDevicePage.subPage = SubPage.JOIN_DEVICE;
            },
          },
          children: (
            <FormControl component="form" fullWidth>
              <TextField
                type={passwordShow ? "text" : "password"}
                variant="standard"
                placeholder="Network's password"
                helperText={passwordAlert}
                autoComplete="on"
                error={!!passwordAlert}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordShow(!passwordShow)}
                        children={
                          <BaseSvgIcon
                            raw={passwordShow ? IconEye : IconEyeOff}
                          />
                        }
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          ),
        },
      }}
    >
      <List sx={{ width: 1 }}>
        {networks.map((network) => (
          <ListItem
            key={network.mac}
            selected={network === selected}
            dense
            disablePadding
            divider
            onClick={() => setSelected(network)}
            secondaryAction={network === selected && <Checkbox checked />}
          >
            <ListItemButton>
              <ListItemText primary={network.ssid} secondary={network.mac} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </BaseSubPage>
  );
};

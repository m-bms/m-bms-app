import { BleDevice } from "@capacitor-community/bluetooth-le";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import { addDevicePage, SubPage } from "..";
import { BaseSubPage } from "../BaseSubPage";
import { HardwareDebugButton } from "../DebugButton";
import { connectDeviceSubPage } from "./ConnectDeviceSubPage";
import { app, AppPage } from "/src/components/App";

export const selectDeviceSubPage = proxy({
  devices: [] as BleDevice[],
});

export const SelectDeviceSubPage = () => {
  const { devices } = useSnapshot(selectDeviceSubPage);
  const [selected, setSelected] = useState<BleDevice>();

  return (
    <BaseSubPage
      title="Select device"
      titleUnderline
      header={{
        headButtons: {
          iconRaw: IconDismiss,
          onClick: () => (app.page = AppPage.HOME),
        },
        tailButtons: HardwareDebugButton,
      }}
      footerButtonLeft={{
        text: "Rescan",
        onClick: () => (addDevicePage.subPage = SubPage.SCAN_DEVICE),
      }}
      footerButtonRight={{
        text: "Connect",
        disabled: !selected,
        onClick: () => {
          connectDeviceSubPage.device = selected!;
          addDevicePage.subPage = SubPage.CONNECT_DEVICE;
        },
      }}
      scrollable
    >
      <List sx={{ width: 1 }}>
        {devices.map((device) => (
          <ListItem
            key={device.deviceId}
            selected={device === selected}
            dense
            disablePadding
            divider
            onClick={() => setSelected(device)}
            secondaryAction={device === selected && <Checkbox checked />}
          >
            <ListItemButton>
              <ListItemText primary={device.name} secondary={device.deviceId} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </BaseSubPage>
  );
};

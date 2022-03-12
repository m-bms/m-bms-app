import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useSnapshot } from "valtio";
import IconBattery10 from "~icons/fluent/battery-10-24-regular?raw";
import IconBluetooth from "~icons/fluent/bluetooth-24-regular?raw";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import IconFilter from "~icons/fluent/filter-24-regular?raw";
import { app, AppPage } from "../App";
import { BluetoothDebugButton } from "../DebugButton";
import { scanDevices } from "../ScanDevicesPage";
import { settings } from "../SettingsPage";
import { SelectMenu } from "/src/components/SelectMenu";
import { StepPage } from "/src/components/StepPage";
import { UnpluginIcon } from "/src/components/UnpluginIcon";
import { bluetooth } from "/src/utils/bluetooth";
import { proxyWithStorage } from "/src/utils/valtio";

enum DeviceFilter {
  BMS = "bms",
  ALL = "all",
}

export const selectDevices = proxyWithStorage("select-devices", {
  filter: DeviceFilter.BMS,
});

export const SelectDevicesPage = () => {
  const { bluetoothStatus } = useSnapshot(settings);
  const { filter } = useSnapshot(selectDevices);
  const { devices } = useSnapshot(bluetooth);

  const filtereds = useMemo(
    () => devices.filter((device) => filter === DeviceFilter.ALL || device.bms),
    [filter, devices]
  );

  const selecteds = useMemo(
    () => filtereds.filter((device) => device.selected),
    [filtereds]
  );

  return (
    <StepPage
      headerText="Select devices"
      headerDivider
      headerEnd={
        <Checkbox
          checked={!!selecteds.length}
          sx={{
            position: "absolute",
            right: 16,
            bottom: -6,
          }}
          onClick={() => bluetooth.setSelectedAll(!selecteds.length)}
        />
      }
      header={{
        startButtons: {
          iconRaw: IconDismiss,
          onClick() {
            bluetooth.clean();
            app.page = AppPage.HOME;
          },
        },
        endButtons: [
          BluetoothDebugButton(bluetoothStatus),
          {
            iconRaw: IconFilter,
            component: (key, render) => (
              <SelectMenu
                key={key}
                value={filter}
                options={[
                  { value: DeviceFilter.BMS, text: "Show only BMS" },
                  { value: DeviceFilter.ALL, text: "Show all devices" },
                ]}
                onChange={(value) => {
                  selectDevices.filter = value;
                  bluetooth.setSelectedAll(false);
                }}
                trigger={(setAnchor) =>
                  render((event) => setAnchor(event.currentTarget))
                }
              />
            ),
          },
        ],
      }}
      footer={{
        startButton: {
          text: "Rescan",
          onClick() {
            bluetooth.clean();
            scanDevices.transition = false;
            app.page = AppPage.SCAN_DEVICES;
          },
        },
        endButton: {
          text: "Connect",
          disabled: !selecteds.length,
          onClick: () => (app.page = AppPage.CONNECT_DEVICES),
        },
      }}
    >
      <List>
        {filtereds.map((device, index) => (
          <ListItem
            key={index}
            selected={device.selected}
            dense
            disablePadding
            divider
            onClick={device.toggleSelected}
          >
            <ListItemButton sx={{ overflow: "hidden" }}>
              <ListItemAvatar>
                <Avatar>
                  <UnpluginIcon
                    raw={device.bms ? IconBattery10 : IconBluetooth}
                  />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={device.name}
                secondary={device.id}
                primaryTypographyProps={{ noWrap: true }}
              />

              <Checkbox
                checked
                sx={{
                  visibility: device.selected ? "visible" : "hidden",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StepPage>
  );
};

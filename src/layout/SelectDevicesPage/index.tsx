import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useMemo, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import IconBattery10 from "~icons/fluent/battery-10-24-regular?raw";
import IconBluetooth from "~icons/fluent/bluetooth-24-regular?raw";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import IconFilter from "~icons/fluent/filter-24-regular?raw";
import { app, AppPage } from "../App";
import { connectDevices } from "../ConnectDevicesPage";
import { BluetoothDebugButton } from "../DebugButton";
import { scanDevices } from "../ScanDevicesPage";
import { settings } from "../SettingsPage";
import { SelectMenu } from "/src/components/SelectMenu";
import { StepPage } from "/src/components/StepPage";
import { UnpluginIcon } from "/src/components/UnpluginIcon";
import { BlueToothDevice } from "/src/utils/bluetooth";

enum DeviceFilter {
  BMS = "bms",
  ALL = "all",
}

export const selectDevices = proxy({
  devices: [] as BlueToothDevice[],
  selecteds: [] as BlueToothDevice[],
});

export const SelectDevicesPage = () => {
  const { bluetoothStatus } = useSnapshot(settings);
  const { devices, selecteds } = useSnapshot(selectDevices);
  const [filter, setFilter] = useState(DeviceFilter.BMS);

  const filtereds = useMemo(
    () => devices.filter((device) => filter === DeviceFilter.ALL || device.bms),
    [filter, devices]
  );

  const setSelectedAll = (value: boolean) => {
    selectDevices.selecteds = value ? [...filtereds] : [];
  };

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
          onClick={() => setSelectedAll(!selecteds.length)}
        />
      }
      header={{
        startButtons: {
          iconRaw: IconDismiss,
          onClick: () => (app.page = AppPage.HOME),
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
                  setFilter(value);
                  setSelectedAll(false);
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
            scanDevices.transition = false;
            app.page = AppPage.SCAN_DEVICES;
          },
        },
        endButton: {
          text: "Connect",
          disabled: !selecteds.length,
          onClick() {
            connectDevices.connecteds = [];
            app.page = AppPage.CONNECT_DEVICES;
          },
        },
      }}
    >
      <List>
        {filtereds.map((device) => {
          const index = selecteds.findIndex(({ id }) => id === device.id);
          const selected = index >= 0;

          return (
            <ListItem
              key={device.id}
              selected={selected}
              dense
              disablePadding
              divider
              onClick={() => {
                if (selected) selectDevices.selecteds.splice(index, 1);
                else selectDevices.selecteds.push(device);
              }}
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
                  sx={{ visibility: selected ? "visible" : "hidden" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </StepPage>
  );
};

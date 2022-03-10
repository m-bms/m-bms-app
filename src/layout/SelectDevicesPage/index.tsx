import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import IconBluetooth from "~icons/fluent/bluetooth-24-regular?raw";
import IconBug from "~icons/fluent/bug-24-regular?raw";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import IconFilter from "~icons/fluent/filter-24-regular?raw";
import { app, AppPage } from "../App";
import { scanDevices } from "../ScanDevicesPage";
import { SelectMenu } from "/src/components/SelectMenu";
import { StepPage } from "/src/components/StepPage";
import { UnpluginIcon } from "/src/components/UnpluginIcon";
import { BlueToothDevice } from "/src/utils/bluetooth";
import { proxyWithStorage } from "/src/utils/valtio";

enum DeviceFilter {
  BMS = "bms",
  ALL = "all",
}

export const selectDevices = proxyWithStorage(
  "select-devices",
  {
    filter: DeviceFilter.BMS,
    devices: [] as BlueToothDevice[],
  },
  ["filter"]
);

export const SelectDevicesPage = () => {
  const { filter, devices } = useSnapshot(selectDevices);

  const [bmses, setBmses] = useState<
    (BlueToothDevice & { selected?: boolean })[]
  >([]);

  const selecteds = useMemo(
    () => bmses.filter((device) => device.selected),
    [bmses]
  );

  useEffect(
    () =>
      setBmses(
        devices
          .filter((device) => filter === DeviceFilter.ALL || device.bms)
          .map((device) => ({ ...device }))
      ),
    [filter]
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
          onClick={() => {
            const toggled = !selecteds.length;
            bmses.forEach((device) => (device.selected = toggled));
            setBmses([...bmses]);
          }}
        />
      }
      header={{
        startButtons: {
          iconRaw: IconDismiss,
          onClick: () => (app.page = AppPage.HOME),
        },
        endButtons: [
          {
            iconRaw: IconBug,
          },
          {
            iconRaw: IconFilter,
            component: (key, render) => (
              <SelectMenu
                key={key}
                value={filter}
                options={[
                  {
                    value: DeviceFilter.BMS,
                    text: "Show only BMS",
                  },
                  {
                    value: DeviceFilter.ALL,
                    text: "Show all devices",
                  },
                ]}
                onChange={(value) => (selectDevices.filter = value)}
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
        },
      }}
    >
      <List>
        {bmses.map((device, index) => (
          <ListItem
            key={index}
            selected={device.selected}
            dense
            disablePadding
            divider
            onClick={() => {
              device.selected = !device.selected;
              setBmses([...bmses]);
            }}
          >
            <ListItemButton sx={{ overflow: "hidden" }}>
              <ListItemAvatar>
                <Avatar>
                  <UnpluginIcon raw={IconBluetooth} />
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

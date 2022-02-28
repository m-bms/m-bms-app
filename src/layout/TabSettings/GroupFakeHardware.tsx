import { memo } from "react";
import { useSnapshot } from "valtio";
import { tabSettings } from "./state";
import { ListGroup, ListItemType } from "/src/components/ListGroup";

export const GroupFakeHardware = memo(() => {
  const { bluetoothEnabled, devicesEnabled } = useSnapshot(tabSettings);

  return (
    <ListGroup
      header="Fake Hardware"
      items={[
        {
          type: ListItemType.SWITCH,
          label: "Use fake hardware",
          checked: true,
          disabled: true,
        },
        {
          type: ListItemType.SWITCH,
          label: "Enable Bluetooth",
          checked: bluetoothEnabled,
          onClick() {
            tabSettings.bluetoothEnabled = !bluetoothEnabled;
          },
        },
        {
          type: ListItemType.SWITCH,
          label: "Enable BMS devices",
          checked: devicesEnabled,
          onClick() {
            tabSettings.devicesEnabled = !devicesEnabled;
          },
        },
      ]}
    />
  );
});

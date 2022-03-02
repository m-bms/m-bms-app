import { memo } from "react";
import { useSnapshot } from "valtio";
import { Group, ItemType } from "../Group";
import { settingsPage } from "../state";

export const SimulationGroup = memo(() => {
  const { bluetoothEnabled, devicesEnabled } = useSnapshot(settingsPage);

  return (
    <Group
      header="Simulation"
      items={[
        {
          type: ItemType.SWITCH,
          label: "Hardware simulation",
          checked: true,
          disabled: true,
        },
        {
          type: ItemType.SWITCH,
          label: "Bluetooth",
          checked: bluetoothEnabled,
          onClick() {
            settingsPage.bluetoothEnabled = !bluetoothEnabled;
          },
        },
        {
          type: ItemType.SWITCH,
          label: "BMS devices",
          checked: devicesEnabled,
          onClick() {
            settingsPage.devicesEnabled = !devicesEnabled;
          },
        },
      ]}
    />
  );
});

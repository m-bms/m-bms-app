import { memo } from "react";
import { useSnapshot } from "valtio";
import { settingsPage } from "..";
import { Group, ItemType } from "../Group";

export const BluetoothGroup = memo(() => {
  const {
    bluetoothInvalid,
    bluetoothDisabled,
    bluetoothNoScan,
    bluetoothNoClient,
  } = useSnapshot(settingsPage);

  return (
    <Group
      header="Bluetooth"
      items={[
        {
          type: ItemType.SWITCH,
          label: "Invalid",
          checked: bluetoothInvalid,
          onClick() {
            settingsPage.bluetoothInvalid = !bluetoothInvalid;
          },
        },
        {
          type: ItemType.SWITCH,
          label: "Disabled",
          checked: bluetoothDisabled,
          onClick() {
            settingsPage.bluetoothDisabled = !bluetoothDisabled;
          },
        },
        {
          type: ItemType.SWITCH,
          label: "No scan",
          checked: bluetoothNoScan,
          onClick() {
            settingsPage.bluetoothNoScan = !bluetoothNoScan;
          },
        },
        {
          type: ItemType.SWITCH,
          label: "No clients",
          checked: bluetoothNoClient,
          onClick() {
            settingsPage.bluetoothNoClient = !bluetoothNoClient;
          },
        },
      ]}
    />
  );
});

import { memo } from "react";
import { useSnapshot } from "valtio";
import { settings } from "..";
import { SettingGroup, SettingType } from "../SettingGroup";
import { Status } from "/src/utils/status";

export const DebugGroup = memo(() => {
  const { bluetoothStatus, wifiStatus } = useSnapshot(settings);

  return (
    <SettingGroup
      title="Debug"
      settings={[
        {
          type: SettingType.BUTTON,
          label: "Hide debug options",
          text: "Hide",
          onClick() {
            alert("TODO: hide debug options");
          },
        },
        {
          type: SettingType.SWITCH,
          label: "Simulate hardware",
          checked: true,
          disabled: true,
        },
        {
          type: SettingType.SELECT,
          label: "Bluetooth",
          value: bluetoothStatus,
          options: [
            { value: Status.SUCCESSFUL, text: "No errors" },
            { value: Status.NO_HARDWARE, text: "No hardware" },
            { value: Status.NO_DEVICES, text: "No devices" },
            { value: Status.FAILED, text: "Scan failed" },
          ],
          onChange(value: Status) {
            settings.bluetoothStatus = value;
          },
        },
        {
          type: SettingType.SELECT,
          label: "WiFi",
          value: wifiStatus,
          options: [
            { value: Status.SUCCESSFUL, text: "No errors" },
            { value: Status.NO_HARDWARE, text: "No hardware" },
            { value: Status.NO_NETWORKS, text: "No networks" },
            { value: Status.FAILED, text: "Scan failed" },
          ],
          onChange(value: Status) {
            settings.wifiStatus = value;
          },
        },
      ]}
    />
  );
});

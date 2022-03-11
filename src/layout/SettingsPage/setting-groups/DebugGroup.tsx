import { memo } from "react";
import { useSnapshot } from "valtio";
import { settings } from "..";
import { SettingGroup, SettingType } from "../SettingGroup";
import { BluetoothError } from "/src/utils/bluetooth";
import { WifiError } from "/src/utils/wifi";

export const DebugGroup = memo(() => {
  const { bluetoothError, wifiError } = useSnapshot(settings);

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
          value: bluetoothError,
          options: [
            { value: BluetoothError.NO_ERRORS, text: "No errors" },
            { value: BluetoothError.NO_HARDWARE, text: "No hardware" },
            { value: BluetoothError.NO_DEVICES, text: "No devices" },
            { value: BluetoothError.SCAN_FAILED, text: "Scan failed" },
          ],
          onChange(value: BluetoothError) {
            settings.bluetoothError = value;
          },
        },
        {
          type: SettingType.SELECT,
          label: "WiFi",
          value: wifiError,
          options: [
            { value: WifiError.NO_ERRORS, text: "No errors" },
            { value: WifiError.NO_HARDWARE, text: "No hardware" },
            { value: WifiError.NO_NETWORKS, text: "No networks" },
            { value: WifiError.SCAN_FAILED, text: "Scan failed" },
          ],
          onChange(value: WifiError) {
            settings.wifiError = value;
          },
        },
      ]}
    />
  );
});

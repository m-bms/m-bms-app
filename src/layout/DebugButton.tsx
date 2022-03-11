import IconBug from "~icons/fluent/bug-24-regular?raw";
import { PageHeaderButton } from "../components/Page";
import { SelectMenu } from "../components/SelectMenu";
import { BluetoothError } from "../utils/bluetooth";
import { settings } from "./SettingsPage";

export const BluetoothDebugButton = (
  error: BluetoothError
): PageHeaderButton => ({
  iconRaw: IconBug,
  component: (key, render) => (
    <SelectMenu
      key={key}
      rightOrigin
      value={error}
      options={[
        {
          value: BluetoothError.NO_ERRORS,
          text: "No Bluetooth errors",
        },
        {
          value: BluetoothError.NO_HARDWARE,
          text: "No Bluetooth hardware",
        },
        {
          value: BluetoothError.NO_DEVICES,
          text: "No Bluetooth devices",
        },
        {
          value: BluetoothError.SCAN_FAILED,
          text: "Scan Bluetooth failed",
        },
      ]}
      onChange={(value) => (settings.bluetoothError = value)}
      trigger={(setAnchor) => render((event) => setAnchor(event.currentTarget))}
    />
  ),
});

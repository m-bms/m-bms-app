import IconBug from "~icons/fluent/bug-24-regular?raw";
import { PageHeaderButton } from "../components/Page";
import { SelectMenu } from "../components/SelectMenu";
import { Status } from "../utils/status";
import { settings } from "./SettingsPage";

export const BluetoothDebugButton = (status: Status): PageHeaderButton => ({
  iconRaw: IconBug,
  component: (key, render) => (
    <SelectMenu
      key={key}
      value={status}
      options={[
        {
          value: Status.SUCCESSFUL,
          text: "No Bluetooth errors",
        },
        {
          value: Status.NO_HARDWARE,
          text: "No Bluetooth hardware",
        },
        {
          value: Status.NO_DEVICES,
          text: "No Bluetooth devices",
        },
        {
          value: Status.FAILED,
          text: "Scan Bluetooth failed",
        },
      ]}
      onChange={(value) => (settings.bluetoothStatus = value)}
      trigger={(setAnchor) => render((event) => setAnchor(event.currentTarget))}
    />
  ),
});

export const WifiDebugButton = (status: Status): PageHeaderButton => ({
  iconRaw: IconBug,
  component: (key, render) => (
    <SelectMenu
      key={key}
      value={status}
      options={[
        {
          value: Status.SUCCESSFUL,
          text: "No WiFi errors",
        },
        {
          value: Status.NO_HARDWARE,
          text: "No WiFi hardware",
        },
        {
          value: Status.NO_NETWORKS,
          text: "No WiFi networks",
        },
        {
          value: Status.FAILED,
          text: "Scan WiFi failed",
        },
      ]}
      onChange={(value) => (settings.wifiStatus = value)}
      trigger={(setAnchor) => render((event) => setAnchor(event.currentTarget))}
    />
  ),
});

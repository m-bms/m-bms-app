import IconBug from "~icons/fluent/bug-24-regular?raw";
import { ActionMenu } from "../components/ActionMenu";
import { PageHeaderButton } from "../components/Page";
import { SelectMenu } from "../components/SelectMenu";
import { createBmsDevice } from "../utils/bms";
import { Status } from "../utils/status";
import { home } from "./HomePage/state";
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

export const HomePageDebugButton = (): PageHeaderButton => ({
  iconRaw: IconBug,
  component: (key, render) => (
    <ActionMenu
      key={key}
      actions={[
        {
          text: "Add 5 devices",
          onClick() {
            for (let i = 0; i < 5; ++i) {
              home.devices.push(createBmsDevice());
            }
          },
        },
      ]}
      trigger={(setAnchor) => render((event) => setAnchor(event.currentTarget))}
    />
  ),
});

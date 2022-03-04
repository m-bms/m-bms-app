import { IconButton, List } from "@mui/material";
import IconBug from "~icons/fluent/bug-24-regular?raw";
import { BaseDialog } from "../../BaseDialog";
import { BasePageHeaderButton } from "../../BasePage";
import { BaseSvgIcon } from "../../BaseSvgIcon";
import { BluetoothGroup, WifiGroup } from "../SettingsPage";

export const BluetoothDebugButton: BasePageHeaderButton = {
  component: (
    <BaseDialog
      key="debug"
      title="[Debug] Bluetooth"
      trigger={(openDialog) => (
        <IconButton
          edge="end"
          size="small"
          onClick={openDialog}
          children={<BaseSvgIcon raw={IconBug} />}
        />
      )}
    >
      <List children={<BluetoothGroup disableTitle />} />
    </BaseDialog>
  ),
};

export const WifiDebugButton: BasePageHeaderButton = {
  component: (
    <BaseDialog
      key="debug"
      title="[Debug] WiFi"
      trigger={(openDialog) => (
        <IconButton
          edge="end"
          size="small"
          onClick={openDialog}
          children={<BaseSvgIcon raw={IconBug} />}
        />
      )}
    >
      <List children={<WifiGroup disableTitle />} />
    </BaseDialog>
  ),
};

export const HardwareDebugButton: BasePageHeaderButton = {
  component: (
    <BaseDialog
      key="debug"
      title="[Debug] Hardware"
      trigger={(openDialog) => (
        <IconButton
          edge="end"
          size="small"
          onClick={openDialog}
          children={<BaseSvgIcon raw={IconBug} />}
        />
      )}
    >
      <List>
        <BluetoothGroup />
        <WifiGroup />
      </List>
    </BaseDialog>
  ),
};

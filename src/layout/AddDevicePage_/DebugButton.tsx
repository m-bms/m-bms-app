import { IconButton, List } from "@mui/material";
import IconBug from "~icons/fluent/bug-24-regular?raw";
import { BaseDialog } from "../../components/BaseDialog";
import { PageHeaderButton } from "../../components/Page";
import { UnpluginIcon } from "../../components/UnpluginIcon";
import { BluetoothGroup, WifiGroup } from "../SettingsPage";

export const BluetoothDebugButton: PageHeaderButton = {
  component: (
    <BaseDialog
      key="debug"
      title="[Debug] Bluetooth"
      trigger={(openDialog) => (
        <IconButton
          edge="end"
          size="small"
          onClick={openDialog}
          children={<UnpluginIcon raw={IconBug} />}
        />
      )}
    >
      <List children={<BluetoothGroup disableTitle disableGutters />} />
    </BaseDialog>
  ),
};

export const WifiDebugButton: PageHeaderButton = {
  component: (
    <BaseDialog
      key="debug"
      title="[Debug] WiFi"
      trigger={(openDialog) => (
        <IconButton
          edge="end"
          size="small"
          onClick={openDialog}
          children={<UnpluginIcon raw={IconBug} />}
        />
      )}
    >
      <List children={<WifiGroup disableTitle disableGutters />} />
    </BaseDialog>
  ),
};

export const HardwareDebugButton: PageHeaderButton = {
  component: (
    <BaseDialog
      key="debug"
      title="[Debug] Hardware"
      trigger={(openDialog) => (
        <IconButton
          edge="end"
          size="small"
          onClick={openDialog}
          children={<UnpluginIcon raw={IconBug} />}
        />
      )}
    >
      <List>
        <BluetoothGroup disableGutters />
        <WifiGroup disableGutters />
      </List>
    </BaseDialog>
  ),
};

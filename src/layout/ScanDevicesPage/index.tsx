import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import IconBluetooth from "~icons/fluent/bluetooth-20-regular?raw";
import IconBluetoothDisabled from "~icons/fluent/bluetooth-disabled-20-regular?raw";
import IconInfo from "~icons/fluent/info-20-regular?raw";
import IconWarning from "~icons/fluent/warning-20-regular?raw";
import { app, AppPage } from "../App";
import { BluetoothDebugButton } from "../DebugButton";
import { settings } from "../SettingsPage";
import { PageFooterButton, PageProps } from "/src/components/Page";
import { ProgressPageContent } from "/src/components/ProgressPageContent";
import { StepPage } from "/src/components/StepPage";
import { bluetooth } from "/src/utils/bluetooth";
import { useAsyncEffect } from "/src/utils/react";
import { Status } from "/src/utils/status";

export const scanDevices = proxy({
  transition: true,
});

export const ScanDevicesPage = () => {
  const { bluetoothStatus } = useSnapshot(settings);
  const { scanning } = useSnapshot(bluetooth);
  const { transition } = useSnapshot(scanDevices);
  const [attempt, setAttempt] = useState(0);

  useAsyncEffect((active) => bluetooth.scanDevices(active), [attempt]);

  useEffect(() => {
    if (scanning === Status.SUCCESSFUL) app.page = AppPage.SELECT_DEVICES;
  }, [scanning]);

  const cancelButton: PageFooterButton = {
    text: "Cancel",
    onClick() {
      bluetooth.clean();
      app.page = AppPage.HOME;
    },
  };

  const errorPageProps: PageProps = {
    header: {
      endButtons: BluetoothDebugButton(bluetoothStatus),
    },
    footer: {
      startButton: cancelButton,
      endButton: {
        text: "Retry",
        onClick: () => setAttempt((value) => ++value),
      },
    },
  };

  return scanning === Status.ACTIVE ? (
    <StepPage
      transition={transition}
      headerText="Scanning devices"
      footer={{ startButton: cancelButton }}
    >
      <ProgressPageContent
        text="The app will connect to BMS devices via Bluetooth,
          then instructs them to join the desired WiFi network."
        iconRaw={IconBluetooth}
        progress
      />
    </StepPage>
  ) : scanning === Status.NO_HARDWARE ? (
    <StepPage headerText="No Bluetooth" {...errorPageProps}>
      <ProgressPageContent
        text="Hardware not found. Make sure Bluetooth is enabled."
        iconRaw={IconBluetoothDisabled}
      />
    </StepPage>
  ) : scanning === Status.NO_DEVICES ? (
    <StepPage headerText="No devices" {...errorPageProps}>
      <ProgressPageContent
        text="No availble devices found via Bluetooth."
        iconRaw={IconInfo}
      />
    </StepPage>
  ) : scanning === Status.FAILED ? (
    <StepPage headerText="Scan failed" {...errorPageProps}>
      <ProgressPageContent
        text="Unexpected error while scanning devices via Bluetooth."
        iconRaw={IconWarning}
      />
    </StepPage>
  ) : null;
};

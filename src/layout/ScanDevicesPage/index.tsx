import { useState } from "react";
import { proxy, useSnapshot } from "valtio";
import IconBluetooth from "~icons/fluent/bluetooth-20-regular?raw";
import IconBluetoothDisabled from "~icons/fluent/bluetooth-disabled-20-regular?raw";
import IconInfo from "~icons/fluent/info-20-regular?raw";
import IconWarning from "~icons/fluent/warning-20-regular?raw";
import { app, AppPage } from "../App";
import { BluetoothDebugButton } from "../DebugButton";
import { selectDevices } from "../SelectDevicesPage";
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
  const { transition } = useSnapshot(scanDevices);
  const [scanning, setScanning] = useState(Status.ACTIVE);

  useAsyncEffect(
    async (unmounted) => {
      if (scanning !== Status.ACTIVE) return;

      try {
        const devices = await bluetooth.scanDevices(unmounted);
        if (unmounted()) return;

        selectDevices.devices = devices;
        selectDevices.selecteds = [];
        app.page = AppPage.SELECT_DEVICES;
      } catch (error) {
        if (unmounted()) return;

        setScanning(error as Status);
      }
    },
    [scanning]
  );

  const cancelButton: PageFooterButton = {
    text: "Cancel",
    onClick: () => (app.page = AppPage.HOME),
  };

  const errorPageProps: PageProps = {
    header: {
      endButtons: BluetoothDebugButton(bluetoothStatus),
    },
    footer: {
      startButton: cancelButton,
      endButton: {
        text: "Retry",
        onClick: () => setScanning(Status.ACTIVE),
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
  ) : (
    <StepPage headerText="Scan failed" {...errorPageProps}>
      <ProgressPageContent
        text="Unexpected error while scanning devices via Bluetooth."
        iconRaw={IconWarning}
      />
    </StepPage>
  );
};

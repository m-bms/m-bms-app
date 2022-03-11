import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
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
import { bluetooth, BluetoothError } from "/src/utils/bluetooth";

export const scanDevices = proxy({
  transition: true,
});

export const ScanDevicesPage = () => {
  const { bluetoothError } = useSnapshot(settings);
  const { transition } = useSnapshot(scanDevices);
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<unknown>();

  useAsyncEffect(
    async (active) => {
      if (!scanning) return;

      try {
        selectDevices.devices = await bluetooth.scanDevices(active);
        app.page = AppPage.SELECT_DEVICES;
      } catch (err) {
        if (err === BluetoothError.INTERRUPTED) return;

        setError(err);
        setScanning(false);
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
      endButtons: BluetoothDebugButton(bluetoothError),
    },
    footer: {
      startButton: cancelButton,
      endButton: {
        text: "Retry",
        onClick: () => setScanning(true),
      },
    },
  };

  return scanning ? (
    <StepPage
      transition={transition}
      headerText="Scan devices"
      footer={{ startButton: cancelButton }}
    >
      <ProgressPageContent
        text="The app will connect to BMS devices via Bluetooth,
          then instructs them to join the desired WiFi network."
        iconRaw={IconBluetooth}
        progress
      />
    </StepPage>
  ) : error === BluetoothError.NO_HARDWARE ? (
    <StepPage headerText="No Bluetooth" {...errorPageProps}>
      <ProgressPageContent
        text="Hardware not found. Make sure Bluetooth is enabled."
        iconRaw={IconBluetoothDisabled}
      />
    </StepPage>
  ) : error === BluetoothError.NO_DEVICES ? (
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

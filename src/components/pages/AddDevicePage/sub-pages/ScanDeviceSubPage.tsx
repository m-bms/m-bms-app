import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import IconBluetooth from "~icons/fluent/bluetooth-20-regular?raw";
import IconBluetoothDisabled from "~icons/fluent/bluetooth-disabled-20-regular?raw";
import IconErrorCircle from "~icons/fluent/error-circle-20-regular?raw";
import IconWarning from "~icons/fluent/warning-20-regular?raw";
import { addDevicePage, SubPage } from "..";
import { app, AppPage } from "../../../App";
import { BaseBannerSubPage } from "../BaseBannerSubPage";
import { BluetoothDebugButton } from "../DebugButton";
import { selectDeviceSubPage } from "./SelectDeviceSubPage";
import { bluetooth, BluetoothError } from "/src/utils/bluetooth";

export const ScanDeviceSubPage = () => {
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<BluetoothError>();

  useAsyncEffect(
    async (running) => {
      if (!running() || !scanning) return;

      try {
        const devices = await bluetooth.scanDevices(running);
        if (!running()) return;

        selectDeviceSubPage.devices = devices;
        addDevicePage.subPage = SubPage.SELECT_DEVICE;
      } catch (error) {
        if (!running()) return;

        setError(error as BluetoothError);
        setScanning(false);
      }
    },
    [scanning]
  );

  const baseOptions = {
    header: {
      tailButtons: scanning ? undefined : BluetoothDebugButton,
    },
    footerButtonLeft: {
      text: "Cancel",
      onClick: () => (app.page = AppPage.HOME),
    },
  };

  const errorOptions = {
    ...baseOptions,
    footerButtonRight: {
      text: "Retry",
      onClick: () => setScanning(true),
    },
  };

  return scanning ? (
    <BaseBannerSubPage
      {...baseOptions}
      title="Scanning devices"
      iconRaw={IconBluetooth}
      progress
    />
  ) : error === BluetoothError.FAILED_TO_INITIALIZE ? (
    <BaseBannerSubPage
      title="Bluetooth failed"
      text="Unable to detect Bluetooth hardware.
        Make sure your device supports Bluetooth."
      iconRaw={IconBluetoothDisabled}
      {...errorOptions}
    />
  ) : error === BluetoothError.BLUETOOTH_DISABLED ? (
    <BaseBannerSubPage
      {...errorOptions}
      title="Bluetooth disabled"
      text="Make sure to have your Bluetooth on."
      iconRaw={IconBluetoothDisabled}
    />
  ) : error === BluetoothError.FAILED_TO_SCAN ? (
    <BaseBannerSubPage
      {...errorOptions}
      title="Scan failed"
      text="Unable to scan devices via Bluetooth."
      iconRaw={IconErrorCircle}
    />
  ) : error === BluetoothError.NO_DEVICES ? (
    <BaseBannerSubPage
      {...errorOptions}
      title="No devices"
      text="There are no available BMS devices."
      iconRaw={IconWarning}
    />
  ) : null;
};

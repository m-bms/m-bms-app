import { BleDevice } from "@capacitor-community/bluetooth-le";
import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import { proxy, useSnapshot } from "valtio";
import IconBluetooth from "~icons/fluent/bluetooth-20-regular?raw";
import IconErrorCircle from "~icons/fluent/error-circle-20-regular?raw";
import { addDevicePage, SubPage } from "..";
import { app, AppPage } from "../../../App";
import { BaseBannerSubPage } from "../BaseBannerSubPage";
import { bluetooth, BluetoothError } from "/src/utils/bluetooth";

export const connectDeviceSubPage = proxy({
  device: { deviceId: "" } as BleDevice,
});

export const ConnectDeviceSubPage = () => {
  const { device } = useSnapshot(connectDeviceSubPage);
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState<BluetoothError>();

  useAsyncEffect(
    async (running) => {
      if (!running() || !connecting) return;

      try {
        await bluetooth.connectDevice(device, running);
        if (!running()) return;

        addDevicePage.subPage = SubPage.SCAN_NETWORK;
      } catch (error) {
        if (!running()) return;

        setError(error as BluetoothError);
        setConnecting(false);
      }
    },
    [connecting]
  );

  const baseOptions = {
    footerButtonLeft: {
      text: "Cancel",
      onClick: () => (app.page = AppPage.HOME),
    },
  };

  const errorOptions = {
    ...baseOptions,
    footerButtonRight: {
      text: "Retry",
      onClick: () => (addDevicePage.subPage = SubPage.SELECT_DEVICE),
    },
  };

  return connecting ? (
    <BaseBannerSubPage
      {...baseOptions}
      title="Connecting device"
      iconRaw={IconBluetooth}
      progress
    />
  ) : error === BluetoothError.FAILED_TO_CONNECT ? (
    <BaseBannerSubPage
      title="Connection failed"
      text="Unable to connect device via Bluetooth."
      iconRaw={IconErrorCircle}
      {...errorOptions}
    />
  ) : null;
};

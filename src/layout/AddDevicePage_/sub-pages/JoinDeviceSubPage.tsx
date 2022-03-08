import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import { useSnapshot } from "valtio";
import IconBluetooth from "~icons/fluent/bluetooth-20-regular?raw";
import IconCheckmarkCircle from "~icons/fluent/checkmark-circle-20-regular?raw";
import { app, AppPage } from "../../App";
import { BaseBannerSubPage } from "../BaseBannerSubPage";
import { connectDeviceSubPage } from "./ConnectDeviceSubPage";
import { bluetooth, BluetoothError } from "/src/utils/bluetooth";

export const JoinDeviceSubPage = () => {
  const { device } = useSnapshot(connectDeviceSubPage);
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(true);
  const [error, setError] = useState<BluetoothError>();

  useAsyncEffect(
    async (running) => {
      if (!running() || !joining) return;

      try {
        await bluetooth.joinDevice(device, running);
        if (!running()) return;

        setJoining(false);
        setJoined(true);
      } catch (error) {
        if (!running()) return;

        setError(error as BluetoothError);
        setJoining(false);
      }
    },
    [joining]
  );

  return joining ? (
    <BaseBannerSubPage
      title="Connecting device"
      iconRaw={IconBluetooth}
      progress
      footerButtonLeft={{
        text: "Cancel",
        onClick: () => (app.page = AppPage.HOME),
      }}
    />
  ) : joined ? (
    <BaseBannerSubPage
      title="Success"
      text="Device added to WiFi network."
      iconRaw={IconCheckmarkCircle}
      footerButtonRight={{
        text: "Done",
        onClick: () => (app.page = AppPage.HOME),
      }}
    />
  ) : null;
};

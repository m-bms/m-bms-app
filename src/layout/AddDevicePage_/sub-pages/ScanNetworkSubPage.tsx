import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import IconErrorCircle from "~icons/fluent/error-circle-20-regular?raw";
import IconWarning from "~icons/fluent/warning-20-regular?raw";
import IconWifi from "~icons/fluent/wifi-1-20-regular?raw";
import IconWifiOff from "~icons/fluent/wifi-off-20-regular?raw";
import { addDevicePage, SubPage } from "../../AddDevicePage";
import { app, AppPage } from "../../App";
import { BaseBannerSubPage } from "../BaseBannerSubPage";
import { WifiDebugButton } from "../DebugButton";
import { selectNetworkSubPage } from "./SelectNetworkSubPage";
import { wifi, WifiError } from "/src/utils/wifi";

export const ScanNetworkSubPage = () => {
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<WifiError>();

  useAsyncEffect(
    async (running) => {
      if (!running() || !scanning) return;

      try {
        const networks = await wifi.scanNetworks(running);
        if (!running()) return;

        selectNetworkSubPage.networks = networks;
        addDevicePage.subPage = SubPage.SELECT_NETWORK;
      } catch (error) {
        if (!running()) return;

        setError(error as WifiError);
        setScanning(false);
      }
    },
    [scanning]
  );

  const baseOptions = {
    header: {
      tailButtons: scanning ? undefined : WifiDebugButton,
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
      title="Scanning networks"
      iconRaw={IconWifi}
      progress
    />
  ) : error === WifiError.FAILED_TO_INITIALIZE ? (
    <BaseBannerSubPage
      title="WiFi failed"
      text="Unable to detect hardware.
        Make sure your device supports WiFi."
      iconRaw={IconWifiOff}
      {...errorOptions}
    />
  ) : error === WifiError.HARDWARE_DISABLED ? (
    <BaseBannerSubPage
      {...errorOptions}
      title="WiFi disabled"
      text="Make sure to have your WiFi on."
      iconRaw={IconWifiOff}
    />
  ) : error === WifiError.FAILED_TO_SCAN_NETWORKS ? (
    <BaseBannerSubPage
      {...errorOptions}
      title="Scan failed"
      text="Unable to scan WiFi networks."
      iconRaw={IconErrorCircle}
    />
  ) : error === WifiError.NO_NETWORKS ? (
    <BaseBannerSubPage
      {...errorOptions}
      title="No networks"
      text="There are no available WiFi networks."
      iconRaw={IconWarning}
    />
  ) : null;
};

import { useState } from "react";
import { proxy, useSnapshot } from "valtio";
import IconInfo from "~icons/fluent/info-20-regular?raw";
import IconWarning from "~icons/fluent/warning-20-regular?raw";
import IconWifi1 from "~icons/fluent/wifi-1-20-regular?raw";
import IconWifiOff from "~icons/fluent/wifi-off-20-regular?raw";
import { app, AppPage } from "../App";
import { WifiDebugButton } from "../DebugButton";
import { selectNetwork } from "../SelectNetworkPage";
import { settings } from "../SettingsPage";
import { PageFooterButton, PageProps } from "/src/components/Page";
import { ProgressPageContent } from "/src/components/ProgressPageContent";
import { StepPage } from "/src/components/StepPage";
import { useAsyncEffect } from "/src/utils/react";
import { Status } from "/src/utils/status";
import { wifi } from "/src/utils/wifi";

export const scanNetworks = proxy({
  transition: true,
});

export const ScanNetworksPage = () => {
  const { wifiStatus } = useSnapshot(settings);
  const { transition } = useSnapshot(scanNetworks);
  const [scanning, setScanning] = useState(Status.ACTIVE);

  useAsyncEffect(
    async (unmounted) => {
      if (scanning !== Status.ACTIVE) return;

      try {
        const networks = await wifi.scanNetworks(unmounted);
        if (unmounted()) return;

        selectNetwork.networks = networks;
        selectNetwork.selected = undefined;
        selectNetwork.passwordDialog = false;
        selectNetwork.passwordShow = false;
        selectNetwork.password = "";

        app.page = AppPage.SELECT_NETWORK;
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
      endButtons: WifiDebugButton(wifiStatus),
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
      headerText="Scanning networks"
      footer={{ startButton: cancelButton }}
    >
      <ProgressPageContent
        text="The app will connect to BMS devices via Bluetooth,
          then instructs them to join the desired WiFi network."
        iconRaw={IconWifi1}
        progress
      />
    </StepPage>
  ) : scanning === Status.NO_HARDWARE ? (
    <StepPage headerText="No WiFi" {...errorPageProps}>
      <ProgressPageContent
        text="Hardware not found. Make sure WiFi is enabled."
        iconRaw={IconWifiOff}
      />
    </StepPage>
  ) : scanning === Status.NO_NETWORKS ? (
    <StepPage headerText="No devices" {...errorPageProps}>
      <ProgressPageContent
        text="No availble WiFi networks found."
        iconRaw={IconInfo}
      />
    </StepPage>
  ) : (
    <StepPage headerText="Scan failed" {...errorPageProps}>
      <ProgressPageContent
        text="Unexpected error while scanning WiFi networks."
        iconRaw={IconWarning}
      />
    </StepPage>
  );
};

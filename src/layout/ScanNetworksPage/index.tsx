import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import IconInfo from "~icons/fluent/info-20-regular?raw";
import IconWarning from "~icons/fluent/warning-20-regular?raw";
import IconWifi1 from "~icons/fluent/wifi-1-20-regular?raw";
import IconWifiOff from "~icons/fluent/wifi-off-20-regular?raw";
import { app, AppPage } from "../App";
import { WifiDebugButton } from "../DebugButton";
import { settings } from "../SettingsPage";
import { PageFooterButton, PageProps } from "/src/components/Page";
import { ProgressPageContent } from "/src/components/ProgressPageContent";
import { StepPage } from "/src/components/StepPage";
import { bluetooth } from "/src/utils/bluetooth";
import { useAsyncEffect } from "/src/utils/react";
import { Status } from "/src/utils/status";
import { wifi } from "/src/utils/wifi";

export const scanNetworks = proxy({
  transition: true,
});

export const ScanNetworksPage = () => {
  const { wifiStatus } = useSnapshot(settings);
  const { scanning } = useSnapshot(wifi);
  const { transition } = useSnapshot(scanNetworks);
  const [attempt, setAttempt] = useState(0);

  useAsyncEffect((unmounted) => wifi.scanNetworks(unmounted), [attempt]);

  useEffect(() => {
    if (scanning === Status.SUCCESSFUL) app.page = AppPage.SELECT_NETWORK;
  }, [scanning]);

  const cancelButton: PageFooterButton = {
    text: "Cancel",
    onClick() {
      bluetooth.clean();
      wifi.clean();
      app.page = AppPage.HOME;
    },
  };

  const errorPageProps: PageProps = {
    header: {
      endButtons: WifiDebugButton(wifiStatus),
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
    <StepPage headerText="No Bluetooth" {...errorPageProps}>
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
  ) : scanning === Status.FAILED ? (
    <StepPage headerText="Scan failed" {...errorPageProps}>
      <ProgressPageContent
        text="Unexpected error while scanning WiFi networks."
        iconRaw={IconWarning}
      />
    </StepPage>
  ) : null;
};

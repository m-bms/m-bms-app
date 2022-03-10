import { useAsyncEffect } from "use-async-effect";
import { proxy, useSnapshot } from "valtio";
import IconBluetooth from "~icons/fluent/bluetooth-20-regular?raw";
import { app, AppPage } from "../App";
import { selectDevices } from "../SelectDevicesPage";
import { ProgressPageContent } from "/src/components/ProgressPageContent";
import { StepPage } from "/src/components/StepPage";
import { bluetooth, BluetoothError } from "/src/utils/bluetooth";

export const scanDevices = proxy({
  transition: true,
});

export const ScanDevicesPage = () => {
  const { transition } = useSnapshot(scanDevices);

  useAsyncEffect(async (active) => {
    const response = await bluetooth.scanDevices(active);
    if (response === BluetoothError.INTERRUPTED) return;

    selectDevices.devices = response;
    app.page = AppPage.SELECT_DEVICES;
  }, []);

  return (
    <StepPage
      transition={transition}
      headerText="Scan devices"
      footer={{
        startButton: {
          text: "Cancel",
          onClick() {
            app.page = AppPage.HOME;
          },
        },
      }}
    >
      <ProgressPageContent
        text="The app will connect to BMS devices via Bluetooth,
          then instructs them to join the desired WiFi network."
        iconRaw={IconBluetooth}
        progress
      />
    </StepPage>
  );
};

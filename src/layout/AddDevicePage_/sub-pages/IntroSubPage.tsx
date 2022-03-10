import { addDevicePage, SubPage } from "../../AddDevicePage";
import { app, AppPage } from "../../App";
import { BaseBannerSubPage } from "../BaseBannerSubPage";
import { BluetoothDebugButton } from "../DebugButton";

export const IntroSubPage = () => {
  return (
    <BaseBannerSubPage
      title="Add device"
      text="The app will connect to BMS device via Bluetooth,
        then instructs it to join the desired WiFi network."
      header={{
        endButtons: BluetoothDebugButton,
      }}
      footerButtonLeft={{
        text: "Cancel",
        onClick: () => (app.page = AppPage.HOME),
      }}
      footerButtonRight={{
        text: "Start",
        onClick: () => (addDevicePage.subPage = SubPage.SCAN_DEVICE),
      }}
    />
  );
};

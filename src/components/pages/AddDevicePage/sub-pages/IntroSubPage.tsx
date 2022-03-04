import { addDevicePage, SubPage } from "..";
import { BaseBannerSubPage } from "../BaseBannerSubPage";
import { BluetoothDebugButton } from "../DebugButton";
import { app, AppPage } from "/src/components/App";

export const IntroSubPage = () => {
  return (
    <BaseBannerSubPage
      title="Add device"
      text="The app will connect to BMS device via Bluetooth,
        then instructs it to join the desired WiFi network."
      header={{
        tailButtons: BluetoothDebugButton,
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

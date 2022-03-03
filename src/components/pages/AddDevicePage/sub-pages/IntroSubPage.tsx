import { addDevicePage, SubPage } from "..";
import { app, AppPage } from "../../../App";
import { BaseSubPage, SubPageType } from "../BaseSubPage";

export const IntroSubPage = () => {
  return (
    <BaseSubPage
      type={SubPageType.BANNER}
      title="Add device"
      text="The app will connect to BMS device via Bluetooth,
        then instructs it to join the desired WiFi network."
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

import { BleDevice } from "@capacitor-community/bluetooth-le";
import { proxy } from "valtio";
import { BaseSubPage, SubPageType } from "../BaseSubPage";
import { bluetooth } from "/src/utils/bluetooth";

export const selectDeviceSubPage = proxy({
  devices: [] as BleDevice[],
});

bluetooth
  .scanDevices(() => true)
  .then((devices) => (selectDeviceSubPage.devices = devices))
  .catch(() => {});

export const SelectDeviceSubPage = () => {
  return (
    <BaseSubPage
      type={SubPageType.BANNER}
      title="Select device"
      dismissButton
      footerButtonLeft={{
        text: "Rescan",
        // onClick: () => (app.page = AppPage.HOME),
      }}
      footerButtonRight={{
        text: "Next",
        // onClick: () => (addDevicePage.subPage = SubPage.SCAN_DEVICE),
      }}
    />
  );
};

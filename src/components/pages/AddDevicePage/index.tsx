import { useLayoutEffect } from "react";
import { proxy, useSnapshot } from "valtio";
import { IntroSubPage } from "./sub-pages/IntroSubPage";
import { ScanDeviceSubPage } from "./sub-pages/ScanDeviceSubPage";
import { SelectDeviceSubPage } from "./sub-pages/SelectDeviceSubPage";

export enum SubPage {
  INTRO,
  SCAN_DEVICE,
  SELECT_DEVICE,
  SCAN_WIFI,
  SELECT_WIFI,
}

export const addDevicePage = proxy({
  subPage: SubPage.INTRO,
});

export const AddDevicePage = () => {
  const { subPage } = useSnapshot(addDevicePage);

  useLayoutEffect(() => {
    addDevicePage.subPage = SubPage.INTRO;
  }, []);

  return (
    <>
      {subPage === SubPage.INTRO && <IntroSubPage />}
      {subPage === SubPage.SCAN_DEVICE && <ScanDeviceSubPage />}
      {subPage === SubPage.SELECT_DEVICE && <SelectDeviceSubPage />}
    </>
  );
};

import { useLayoutEffect } from "react";
import { proxy, useSnapshot } from "valtio";
import { ConnectDeviceSubPage } from "./sub-pages/ConnectDeviceSubPage";
import { IntroSubPage } from "./sub-pages/IntroSubPage";
import { JoinDeviceSubPage } from "./sub-pages/JoinDeviceSubPage";
import { ScanDeviceSubPage } from "./sub-pages/ScanDeviceSubPage";
import { ScanNetworkSubPage } from "./sub-pages/ScanNetworkSubPage";
import { SelectDeviceSubPage } from "./sub-pages/SelectDeviceSubPage";
import { SelectNetworkSubPage } from "./sub-pages/SelectNetworkSubPage";

export enum SubPage {
  INTRO,
  SCAN_DEVICE,
  SELECT_DEVICE,
  CONNECT_DEVICE,
  SCAN_NETWORK,
  SELECT_NETWORK,
  JOIN_DEVICE,
}

export const addDevicePage = proxy({
  subPage: SubPage.INTRO,
});

export const subPageMap = {
  [SubPage.INTRO]: <IntroSubPage />,
  [SubPage.SCAN_DEVICE]: <ScanDeviceSubPage />,
  [SubPage.SELECT_DEVICE]: <SelectDeviceSubPage />,
  [SubPage.CONNECT_DEVICE]: <ConnectDeviceSubPage />,
  [SubPage.SCAN_NETWORK]: <ScanNetworkSubPage />,
  [SubPage.SELECT_NETWORK]: <SelectNetworkSubPage />,
  [SubPage.JOIN_DEVICE]: <JoinDeviceSubPage />,
} as const;

export const AddDevicePage = () => {
  const { subPage } = useSnapshot(addDevicePage);

  useLayoutEffect(() => {
    addDevicePage.subPage = SubPage.INTRO;
  }, []);

  return subPageMap[subPage];
};

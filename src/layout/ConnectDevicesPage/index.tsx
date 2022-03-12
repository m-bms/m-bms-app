import { useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { app, AppPage } from "../App";
import { scanNetworks } from "../ScanNetworksPage";
import { selectDevices } from "../SelectDevicesPage";
import { PageProps } from "/src/components/Page";
import { StepPage } from "/src/components/StepPage";
import {
  ProgressList,
  ProgressListProps,
} from "/src/components/StepPageContent";
import { bluetooth, BlueToothDevice } from "/src/utils/bluetooth";
import { useAsyncEffect } from "/src/utils/react";
import { Status } from "/src/utils/status";

export const connectDevices = proxy({
  connecteds: [] as BlueToothDevice[],
});

export const ConnectDevicesPage = () => {
  const { selecteds } = useSnapshot(selectDevices);
  const [results, setResults] = useState(selecteds.map(() => Status.ACTIVE));
  const [dones, setDones] = useState(0);

  const { connecteds } = connectDevices;

  useAsyncEffect((unmounted) => {
    selecteds.forEach(async (device, index) => {
      let result = Status.SUCCESSFUL;

      try {
        await bluetooth.connectDevice(unmounted, device);
      } catch {
        result = Status.FAILED;
      }
      if (unmounted()) return;

      setResults((results) => ((results[index] = result), [...results]));
      setDones((value) => ++value);

      if (result === Status.SUCCESSFUL) connecteds.push(device);
      if (connecteds.length === selecteds.length) continueNext();
    });
  }, []);

  const continueNext = () => {
    scanNetworks.transition = true;
    app.page = AppPage.SCAN_NETWORKS;
  };

  const listProps: ProgressListProps = {
    length: selecteds.length,
    getText: (index) => selecteds[index].name,
    getStatus: (index) => results[index],
  };

  const pageFooter: PageProps["footer"] = {
    startButton: {
      text: "Cancel",
      onClick: () => (app.page = AppPage.HOME),
    },
  };

  return dones < selecteds.length ? (
    <StepPage headerText="Connecting devices" footer={pageFooter}>
      <ProgressList {...listProps} />
    </StepPage>
  ) : connecteds.length ? (
    <StepPage
      headerText="Uncompleted"
      footer={{
        ...pageFooter,
        endButton: {
          text: "Continue",
          onClick: continueNext,
        },
      }}
    >
      <ProgressList
        {...listProps}
        text="Some of the devices failed to connect."
      />
    </StepPage>
  ) : (
    <StepPage headerText="Connect failed" footer={pageFooter}>
      <ProgressList
        {...listProps}
        text="All devices failed to connect via Bluetooth."
      />
    </StepPage>
  );
};

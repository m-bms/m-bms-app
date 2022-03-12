import { useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { app, AppPage } from "../App";
import { connectDevices } from "../ConnectDevicesPage";
import { selectNetwork } from "../SelectNetworkPage";
import { PageProps } from "/src/components/Page";
import { StepPage } from "/src/components/StepPage";
import {
  ProgressList,
  ProgressListProps,
} from "/src/components/StepPageContent";
import { bluetooth, BlueToothDevice } from "/src/utils/bluetooth";
import { useAsyncEffect } from "/src/utils/react";
import { Status } from "/src/utils/status";

export const joinDevices = proxy({
  joineds: [] as BlueToothDevice[],
});

export const JoinDevicesPage = () => {
  const { connecteds } = useSnapshot(connectDevices);
  const { joineds } = useSnapshot(joinDevices);
  const [results, setResults] = useState(connecteds.map(() => Status.ACTIVE));
  const [dones, setDones] = useState(0);

  useAsyncEffect((unmounted) => {
    connecteds.forEach(async (device, index) => {
      let result = Status.SUCCESSFUL;

      try {
        await bluetooth.joinDevice(unmounted, device, selectNetwork.password);
      } catch {
        result = Status.FAILED;
      }
      if (unmounted()) return;

      setResults((results) => ((results[index] = result), [...results]));
      setDones((value) => ++value);
      if (result === Status.SUCCESSFUL) joinDevices.joineds.push(device);
    });
  }, []);

  const listProps: ProgressListProps = {
    length: connecteds.length,
    getText: (index) => connecteds[index].name,
    getStatus: (index) => results[index],
  };

  const pageFooter: PageProps["footer"] = {
    endButton: {
      text: "Finish",
      onClick: () => (app.page = AppPage.HOME),
    },
  };

  return dones < connecteds.length ? (
    <StepPage
      headerText="Connecting devices"
      footer={{
        startButton: {
          text: "Cancel",
          onClick: () => (app.page = AppPage.HOME),
        },
      }}
    >
      <ProgressList {...listProps} />
    </StepPage>
  ) : !joineds.length ? (
    <StepPage headerText="Join failed" footer={pageFooter}>
      <ProgressList
        {...listProps}
        text="All devices failed to join WiFi network."
      />
    </StepPage>
  ) : joineds.length < connecteds.length ? (
    <StepPage headerText="Uncompleted" footer={pageFooter}>
      <ProgressList
        {...listProps}
        text="Some of the devices failed to join WiFi network."
      />
    </StepPage>
  ) : (
    <StepPage headerText="Successful" footer={pageFooter}>
      <ProgressList
        {...listProps}
        text="Some of the devices failed to join WiFi network."
      />
    </StepPage>
  );
};

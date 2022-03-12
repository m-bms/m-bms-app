import { useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import { app, AppPage } from "../App";
import { scanNetworks } from "../ScanNetworksPage";
import { PageProps } from "/src/components/Page";
import { StepPage } from "/src/components/StepPage";
import {
  ProgressList,
  ProgressListProps,
} from "/src/components/StepPageContent";
import { bluetooth } from "/src/utils/bluetooth";
import { useAsyncEffect } from "/src/utils/react";
import { Status } from "/src/utils/status";

export const ConnectDevicesPage = () => {
  const { devices } = useSnapshot(bluetooth);

  const selecteds = useMemo(
    () => devices.filter((device) => device.selected),
    [devices]
  );

  const successfuls = useMemo(
    () => selecteds.filter((device) => device.connecting === Status.SUCCESSFUL),
    [selecteds]
  );

  const actives = useMemo(
    () => selecteds.filter((device) => device.connecting === Status.ACTIVE),
    [selecteds]
  );

  useAsyncEffect(
    (unmounted) => selecteds.forEach((device) => device.connect(unmounted)),
    []
  );

  useEffect(() => {
    if (
      selecteds.length &&
      !actives.length &&
      successfuls.length === selecteds.length
    )
      continueNext();
  }, [selecteds, actives, successfuls]);

  const continueNext = () => {
    scanNetworks.transition = true;
    app.page = AppPage.SCAN_NETWORKS;
  };

  const listProps: ProgressListProps = {
    length: selecteds.length,
    getText: (index) => selecteds[index].name,
    getStatus: (index) => selecteds[index].connecting,
  };

  const pageFooter: PageProps["footer"] = {
    startButton: {
      text: "Cancel",
      onClick() {
        bluetooth.clean();
        app.page = AppPage.HOME;
      },
    },
  };

  return actives.length ? (
    <StepPage headerText="Connecting devices" footer={pageFooter}>
      <ProgressList {...listProps} />
    </StepPage>
  ) : successfuls.length ? (
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

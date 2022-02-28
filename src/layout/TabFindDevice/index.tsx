export { Sort, tabFindDevice } from "./state";

import { Button } from "@mui/material";
import { memo, useEffect } from "react";
import { useSnapshot } from "valtio";
import IconBluetoothSearching from "~icons/fluent/bluetooth-searching-20-regular";
import { BackgroundArt } from "../../components/BackgroundArt";
import { Header } from "./Header";
import { ScanResults } from "./ScanResults";
import { bluetooth } from "/src/utils/bluetooth";

export const TabFindDevice = memo(() => {
  const { scanning, scanResults } = useSnapshot(bluetooth);

  useEffect(() => {
    return () => {
      bluetooth.reset();
    };
  }, []);

  return (
    <>
      <Header />
      {scanResults.length ? (
        <ScanResults />
      ) : (
        <BackgroundArt
          Icon={IconBluetoothSearching}
          iconX={-6}
          message={
            scanning
              ? "Finding device\nvia Bluetooth..."
              : "No device found\nvia Bluetooth"
          }
          action={
            scanning ? undefined : (
              <Button variant="outlined" children="Retry" />
            )
          }
        />
      )}
    </>
  );
});

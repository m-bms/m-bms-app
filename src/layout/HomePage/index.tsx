import { BleDevice } from "@capacitor-community/bluetooth-le";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import IconAdd from "~icons/fluent/add-24-regular?raw";
import IconSettings from "~icons/fluent/settings-24-regular?raw";
import { LightButton } from "../../components/LightButton";
import { Page } from "../../components/Page";
import { app, AppPage } from "../App";
import { sleep } from "/src/utils/common";
import { wifi } from "/src/utils/wifi";

export const SCAN_INTERVAL = 10000;

export const HomePage = () => {
  const [devices, setDevices] = useState<BleDevice[]>([]);
  const [scanning, setScanning] = useState(true);

  useAsyncEffect((running) => {
    const scan = async () => {
      if (!running()) return;
      setScanning(true);

      const scanneds = await wifi.scanDevices(running);
      if (!running()) return;

      setDevices(scanneds);
      setScanning(false);

      await sleep(SCAN_INTERVAL);
      scan();
    };

    scan();
  }, []);

  return (
    <Page
      transition
      header={{
        startButtons: {
          iconRaw: IconSettings,
          onClick: () => (app.page = AppPage.SETTINGS),
        },
        endButtons: {
          iconRaw: IconAdd,
          onClick: () => (app.page = AppPage.SCAN_DEVICES),
        },
      }}
    >
      {!devices.length ? (
        <Stack
          height={1}
          position="relative"
          top={-24}
          justifyContent="center"
          alignItems="center"
        >
          {scanning ? (
            <CircularProgress />
          ) : (
            <Stack alignItems="center">
              <Typography variant="h5" children="No devices" />
              <Typography
                variant="body1"
                mt={1}
                mx={8}
                mb={4}
                align="center"
                color="text.secondary"
                children="There is no connected devices on WIFI network"
              />
              <LightButton
                children="Add device"
                onClick={() => {
                  app.page = AppPage.SCAN_DEVICES;
                }}
              />
            </Stack>
          )}
        </Stack>
      ) : (
        <List>
          {devices.map((device) => (
            <ListItem key={device.deviceId}>
              <ListItemText primary={device.name} secondary="WIP" />
            </ListItem>
          ))}
        </List>
      )}
    </Page>
  );
};

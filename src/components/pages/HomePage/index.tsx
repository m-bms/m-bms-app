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
import { app, AppPage } from "/src/components/App";
import { BasePage } from "/src/components/BasePage";
import { LightButton } from "/src/components/LightButton";
import { sleep } from "/src/utils/common";
import { ConnectedDevice, wifi } from "/src/utils/wifi";

export const SCAN_INTERVAL = 10000;

export const HomePage = () => {
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);
  const [scanning, setScanning] = useState(true);

  useAsyncEffect((running) => {
    const scan = async () => {
      if (!running()) return;
      setScanning(true);

      const scanneds = await wifi.scanDevices();
      if (!running()) return;

      setDevices(scanneds);
      setScanning(false);

      await sleep(SCAN_INTERVAL);
      scan();
    };

    scan();
  }, []);

  return (
    <BasePage
      header={{
        headButtons: [
          {
            iconRaw: IconSettings,
            onClick: () => (app.page = AppPage.SETTINGS),
          },
        ],
        tailButtons: [
          {
            iconRaw: IconAdd,
            onClick: () => (app.page = AppPage.ADD_DEVICE),
          },
        ],
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
                  app.page = AppPage.ADD_DEVICE;
                }}
              />
            </Stack>
          )}
        </Stack>
      ) : (
        <List>
          {devices.map((device) => (
            <ListItem key={device.id}>
              <ListItemText>{device.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </BasePage>
  );
};

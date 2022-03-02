import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FixedBanner } from "../../components/FixedBanner";
import { app, AppPage } from "../App";
import { PageContent } from "/src/components/PageContent";
import {
  ThemeMode,
  ThemeModeProvider,
} from "/src/components/ThemeModeProvider";
import { sleep } from "/src/utils/common";
import { ConnectedDevice, wifi } from "/src/utils/wifi";

export const SCAN_INTERVAL = 10000;

export const Content = () => {
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let unmounted = false;

    const scan = async () => {
      if (unmounted) return;
      setScanning(true);

      const scanneds = await wifi.scanDevices();
      if (unmounted) return;
      setDevices(scanneds);
      setScanning(false);

      await sleep(SCAN_INTERVAL);
      scan();
    };
    scan();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <PageContent>
      {!!devices.length && (
        <List>
          {devices.map((device) => (
            <ListItem key={device.id}>
              <ListItemText>{device.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}
      {!devices.length && (
        <FixedBanner>
          {scanning && <CircularProgress />}

          {!scanning && (
            <Stack alignItems="center">
              <Typography variant="h5" children="No devices" />
              <Typography
                variant="body1"
                mt={1}
                mx={6}
                mb={4}
                align="center"
                color="text.secondary"
                children="There is no connected devices on WIFI network"
              />
              <ThemeModeProvider mode={ThemeMode.LIGHT}>
                <Button
                  variant="contained"
                  disableElevation
                  children="Add device"
                  onClick={() => (app.page = AppPage.ADD_DEVICE)}
                />
              </ThemeModeProvider>
            </Stack>
          )}
        </FixedBanner>
      )}
    </PageContent>
  );
};

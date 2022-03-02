import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import IconBluetooth from "~icons/fluent/bluetooth-searching-20-regular?raw";
import { FixedBanner } from "/src/components/FixedBanner";
import { Page } from "/src/components/Page";
import { SvgIcon } from "/src/components/SvgIcon";

export const ScanDeviceSubPage = () => {
  return (
    <Page in>
      <FixedBanner>
        <Box flex={1} />

        <Typography variant="h5" align="center" children="Scanning devices" />

        <Stack width={1} flex={5} alignItems="center">
          <Box flex={3} />

          <SvgIcon
            sx={{
              width: 100,
              height: 100,
              mb: 4,
              color: (theme) => theme.palette.text.secondary,
            }}
            raw={IconBluetooth}
          />

          <LinearProgress
            sx={{
              width: 200,
              maxWidth: 1,
            }}
          />

          <Box flex={2} />
        </Stack>
      </FixedBanner>
    </Page>
  );
};

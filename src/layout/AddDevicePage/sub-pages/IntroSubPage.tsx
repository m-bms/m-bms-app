import { Box, Button, Typography } from "@mui/material";
import { addDevicePage, SubPage } from "..";
import { FixedBanner } from "/src/components/FixedBanner";
import { Page } from "/src/components/Page";
import { PageBar } from "/src/components/PageBar";
import { app, AppPage } from "/src/layout/App";

export const IntroSubPage = () => {
  return (
    <Page in>
      <FixedBanner>
        <Box flex={1} />

        <Typography variant="h5" align="center" children="Add device" />

        <Typography
          variant="body1"
          mt={1}
          mx={2}
          flex={5}
          align="center"
          color="text.secondary"
        >
          The app will first connect to the BMS device via Bluetooth, then
          instruct it to join the desire WIFI network.
        </Typography>
      </FixedBanner>

      <Box flex={1} />

      <PageBar bottom>
        <Button
          children="Cancel"
          onClick={() => {
            app.page = AppPage.HOME;
          }}
        />

        <Box flex={1} />

        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            addDevicePage.subPage = SubPage.SCAN_DEVICE;
          }}
          children="Start"
        />
      </PageBar>
    </Page>
  );
};

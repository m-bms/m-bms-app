import { Stack, Typography } from "@mui/material";
import { useSnapshot } from "valtio";
import IconAdd from "~icons/fluent/add-24-regular?raw";
import IconContactCard from "~icons/fluent/contact-card-24-regular?raw";
import IconSettings from "~icons/fluent/settings-24-regular?raw";
import IconTableSimple from "~icons/fluent/table-simple-24-regular?raw";
import { Page } from "../../components/Page";
import { app, AppPage } from "../App";
import { HomePageDebugButton } from "../DebugButton";
import { scanDevices } from "../ScanDevicesPage";
import { BmsCardView } from "./BmsCardView";
import { BmsTableView } from "./BmsTableView";
import { BmsViewType, home } from "./state";
import { LightButton } from "/src/components/LightButton";
import { SelectMenu } from "/src/components/SelectMenu";

export const SCAN_INTERVAL = 10000;

export const HomePage = () => {
  const { devices, viewType } = useSnapshot(home);

  const addDevice = () => {
    scanDevices.transition = true;
    app.page = AppPage.SCAN_DEVICES;
  };

  return (
    <Page
      transition
      header={{
        startButtons: [
          {
            iconRaw: IconSettings,
            onClick: () => (app.page = AppPage.SETTINGS),
          },
          {
            iconRaw:
              viewType === BmsViewType.CARD ? IconContactCard : IconTableSimple,
            component: (key, render) => (
              <SelectMenu
                key={key}
                value={viewType}
                options={[
                  {
                    value: BmsViewType.CARD,
                    text: "Card view",
                  },
                  {
                    value: BmsViewType.TABLE,
                    text: "Table View",
                  },
                ]}
                onChange={(value) => (home.viewType = value)}
                trigger={(setAnchor) =>
                  render((event) => setAnchor(event.currentTarget))
                }
              />
            ),
          },
        ],
        endButtons: [
          HomePageDebugButton(),
          {
            iconRaw: IconAdd,
            onClick: addDevice,
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
              onClick={() => (app.page = AppPage.SCAN_DEVICES)}
            />
          </Stack>
        </Stack>
      ) : viewType === BmsViewType.CARD ? (
        <BmsCardView />
      ) : (
        <BmsTableView />
      )}
    </Page>
  );
};

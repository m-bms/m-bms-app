import { Box, IconButton } from "@mui/material";
import IconAdd from "~icons/fluent/add-24-regular?raw";
import IconSettings from "~icons/fluent/settings-24-regular?raw";
import { PageBar } from "../../components/PageBar";
import { app, AppPage } from "../App";
import { SvgIcon } from "/src/components/SvgIcon";

export const Header = () => {
  return (
    <PageBar>
      <IconButton
        edge="start"
        size="small"
        onClick={() => {
          app.page = AppPage.SETTINGS;
        }}
      >
        <SvgIcon raw={IconSettings} />
      </IconButton>

      <Box flex={1} />

      <IconButton
        edge="end"
        size="small"
        onClick={() => (app.page = AppPage.ADD_DEVICE)}
      >
        <SvgIcon raw={IconAdd} />
      </IconButton>
    </PageBar>
  );
};

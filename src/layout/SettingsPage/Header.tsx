import { IconButton } from "@mui/material";
import IconArrowLeft from "~icons/fluent/arrow-left-24-regular?raw";
import { PageBar } from "../../components/PageBar";
import { app, AppPage } from "../App";
import { PageBarTitle } from "/src/components/PageBarTitle";
import { SvgIcon } from "/src/components/SvgIcon";

export const Header = () => {
  return (
    <PageBar>
      <IconButton
        edge="start"
        size="small"
        onClick={() => {
          app.page = AppPage.HOME;
        }}
      >
        <SvgIcon raw={IconArrowLeft} />
      </IconButton>

      <PageBarTitle children="Settings" />
    </PageBar>
  );
};

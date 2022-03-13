import { BoxProps, styled } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { ComponentType } from "react";

export const Scrollable: ComponentType<BoxProps> = styled((props) => (
  <OverlayScrollbarsComponent
    {...props}
    options={{
      scrollbars: {
        autoHide: "scroll",
        autoHideDelay: 300,
      },
    }}
  />
))(({ theme }) => ({
  height: "100%",
  ".os-scrollbar-vertical": {
    width: theme.spacing(0.5),
    padding: 0,
  },
  ".os-scrollbar-horizontal": {
    height: theme.spacing(0.5),
    padding: 0,
  },
  ".os-scrollbar-handle": {
    borderRadius: "0 !important",
    background: `${theme.palette.text.disabled} !important`,
  },
}));

import { styled } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { ReactNode } from "react";

const StyledScrollable = styled(OverlayScrollbarsComponent)(({ theme }) => ({
  height: "100%",
  ".os-scrollbar": {
    width: "4px",
    padding: 0,
  },
  ".os-scrollbar-handle": {
    borderRadius: "0 !important",
    background: `${theme.palette.text.disabled} !important`,
  },
}));

export const Scrollable = (props: { children?: ReactNode }) => {
  return (
    <StyledScrollable
      options={{
        scrollbars: {
          autoHide: "scroll",
        },
      }}
      children={props.children}
    />
  );
};

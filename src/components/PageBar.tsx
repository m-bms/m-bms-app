import { AppBar, Container, Toolbar } from "@mui/material";
import { ReactNode } from "react";

export const PageBar = (props: { bottom?: boolean; children?: ReactNode }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ pb: props.bottom ? 2 : 0 }}
    >
      <Container>
        <Toolbar variant="dense" disableGutters children={props.children} />
      </Container>
    </AppBar>
  );
};

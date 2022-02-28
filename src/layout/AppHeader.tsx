import { AppBar, Container, Toolbar } from "@mui/material";
import { memo } from "react";
import { proxy, useSnapshot } from "valtio";
import { appFooter } from "./AppFooter";

export const appHeader = proxy({
  children: null as JSX.Element | null,
});

export const AppHeader = memo(() => {
  const { tab } = useSnapshot(appFooter);
  const { children } = useSnapshot(appHeader);

  return (
    <AppBar
      position="static"
      color="grey200"
      sx={{
        boxShadow: 0,
        ".MuiIconButton-root": { fontSize: "1.4rem" },
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Toolbar
          variant="dense"
          sx={{ "@media (min-width: 600px)": { px: 2 } }}
          children={children}
        />
      </Container>
    </AppBar>
  );
});

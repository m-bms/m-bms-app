import { AppBar, Container, Fade, Toolbar, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { appBody } from "./AppBody";
import { appFooter } from "./AppFooter";

export const appHeader = proxy({
  children: null as JSX.Element | null,
});

export const AppHeader = memo(() => {
  const theme = useTheme();
  const { tab } = useSnapshot(appFooter);
  const { children } = useSnapshot(appHeader);
  const { el: appBodyEl } = useSnapshot(appBody);
  const [appBodyScrolled, setAppBodyScrolled] = useState(false);

  // For elevated on scroll
  useEffect(() => {
    if (!appBodyEl) return;

    const updateScrolled = () => setAppBodyScrolled(appBodyEl.scrollTop > 10);
    appBodyEl.addEventListener("scroll", updateScrolled);

    return () => appBodyEl.removeEventListener("scroll", updateScrolled);
  }, [appBodyEl]);

  return (
    <AppBar
      position="static"
      color="grey200"
      sx={{
        boxShadow: appBodyScrolled ? 4 : 0,
        ".MuiIconButton-root": { fontSize: "1.2rem" },
      }}
    >
      <Fade key={tab} in timeout={theme.transitions.duration.standard}>
        <Container maxWidth="sm" disableGutters>
          <Toolbar
            variant="dense"
            sx={{ "@media (min-width: 600px)": { px: 2 } }}
            children={children}
          />
        </Container>
      </Fade>
    </AppBar>
  );
});

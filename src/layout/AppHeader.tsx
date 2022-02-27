import { AppBar, Container, Fade, Toolbar, useTheme } from "@mui/material";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { appBodyAtom } from "./AppBody";
import { appTabAtom } from "./AppFooter";

export const appHeaderAtom = atom<JSX.Element | null>(null);

export const AppHeader = () => {
  const theme = useTheme();
  const [appTab] = useAtom(appTabAtom);
  const [appBody] = useAtom(appBodyAtom);
  const [children] = useAtom(appHeaderAtom);

  const [appBodyScrolled, setAppBodyScrolled] = useState(false);

  useEffect(() => {
    if (!appBody) return;

    const updateScrolled = () => setAppBodyScrolled(appBody.scrollTop > 10);
    appBody.addEventListener("scroll", updateScrolled);

    return () => appBody.removeEventListener("scroll", updateScrolled);
  }, [appBody]);

  return (
    <AppBar
      position="static"
      color="grey200"
      sx={{
        boxShadow: appBodyScrolled ? 4 : 0,
        ".MuiIconButton-root": { fontSize: "1.2rem" },
      }}
    >
      <Fade key={appTab} in timeout={theme.transitions.duration.short}>
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
};

import {
  AppBar,
  Box,
  Container,
  Grow,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { visualView } from "../utils/visual-view";
import { Scrollable } from "./Scrollable";
import { UnpluginIcon } from "./UnpluginIcon";
import { ArrayLike, toArray } from "/src/utils/common";

export type BasePageHeaderButton = {
  component?: ReactNode;
  iconRaw?: string;
  onClick?: () => unknown;
};

export type BasePageProps = {
  header?: {
    title?: string;
    large?: boolean;
    divider?: boolean;
    headButtons?: ArrayLike<BasePageHeaderButton>;
    tailButtons?: ArrayLike<BasePageHeaderButton>;
  };
  footer?: ReactNode;
  children?: ReactNode;
};

export const BasePage = ({ header = {}, footer, children }: BasePageProps) => {
  const { height } = useSnapshot(visualView);

  return (
    <Grow in>
      <Stack width="100vw" height={`${height}px`}>
        <AppBar
          position="static"
          elevation={0}
          color="transparent"
          sx={{
            flex: header.large ? 1 : 0,
            borderBottom: (theme) =>
              header.divider
                ? `1px solid ${theme.palette.primary.main}`
                : "none",
          }}
        >
          <Container maxWidth="md" disableGutters>
            <Toolbar
              variant="dense"
              sx={{
                height: 1,
                py: 1,
                alignItems: "start",
              }}
            >
              <Stack flex={1} direction="row">
                {toArray(header.headButtons).map((button) => (
                  <IconButton
                    key={button.iconRaw}
                    edge="start"
                    size="small"
                    onClick={button.onClick}
                    children={<UnpluginIcon raw={button.iconRaw} />}
                  />
                ))}
              </Stack>

              <Typography
                variant={header.large ? "h5" : "h6"}
                alignSelf={header.large ? "end" : "center"}
                children={header.title}
              />

              <Stack flex={1} direction="row-reverse">
                {toArray(header.tailButtons).map(
                  (button) =>
                    button.component ?? (
                      <IconButton
                        key={button.iconRaw}
                        edge="end"
                        size="small"
                        onClick={button.onClick}
                        children={<UnpluginIcon raw={button.iconRaw} />}
                      />
                    )
                )}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        <Box component="main" flex={5}>
          <Scrollable>
            <Container
              maxWidth="sm"
              disableGutters
              sx={{
                height: 2,
                minHeight: 1,
              }}
              children={children}
            />
          </Scrollable>
        </Box>

        {footer && (
          <AppBar
            component="footer"
            position="static"
            elevation={0}
            color="transparent"
            sx={{ pb: 2 }}
          >
            <Container maxWidth="md" disableGutters>
              <Container>
                <Toolbar variant="dense" disableGutters children={footer} />
              </Container>
            </Container>
          </AppBar>
        )}
      </Stack>
    </Grow>
  );
};

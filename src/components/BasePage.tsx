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
import { BaseSvgIcon } from "/src/components/BaseSvgIcon";

export type BasePageProps = {
  header?: {
    title?: string;
    headButtons?: Array<{
      iconRaw: string;
      onClick?: () => unknown;
    }>;
    tailButtons?: Array<{
      iconRaw: string;
      onClick?: () => unknown;
    }>;
    headAction?: ReactNode;
    tailAction?: ReactNode;
  };
  footer?: ReactNode;
  children?: ReactNode;
};

export const BasePage = (props: BasePageProps) => {
  return (
    <Grow in>
      <Box width="100vw" height="100vh">
        <AppBar elevation={0} color="transparent">
          <Toolbar variant="dense">
            <Stack flex={1} direction="row">
              {(props.header?.headButtons ?? []).map((button) => (
                <IconButton
                  key={button.iconRaw}
                  edge="start"
                  size="small"
                  onClick={button.onClick}
                  children={<BaseSvgIcon raw={button.iconRaw} />}
                />
              ))}
            </Stack>

            <Typography variant="h6" children={props.header?.title} />

            <Stack flex={1} direction="row-reverse">
              {(props.header?.tailButtons ?? []).map((button) => (
                <IconButton
                  key={button.iconRaw}
                  edge="end"
                  size="small"
                  onClick={button.onClick}
                  children={<BaseSvgIcon raw={button.iconRaw} />}
                />
              ))}
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            width: 1,
            position: "fixed",
            top: 48,
            bottom: props.footer ? 64 : 0,
            overflow: "auto",
          }}
        >
          <Container
            maxWidth="xs"
            disableGutters
            sx={{
              height: 2,
              minHeight: 1,
            }}
            children={props.children}
          />
        </Box>

        {props.footer && (
          <AppBar
            component="footer"
            elevation={0}
            color="transparent"
            sx={{
              top: "auto",
              bottom: 16,
            }}
          >
            <Container>
              <Toolbar variant="dense" disableGutters children={props.footer} />
            </Container>
          </AppBar>
        )}
      </Box>
    </Grow>
  );
};

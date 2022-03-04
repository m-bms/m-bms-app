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
import { BaseSvgIcon } from "/src/components/BaseSvgIcon";
import { ArrayLike, flatDefined } from "/src/utils/common";

export type BasePageHeaderButton = {
  component?: ReactNode;
  iconRaw?: string;
  onClick?: () => unknown;
};

export type BasePageProps = {
  header?: {
    title?: string;
    headButtons?: ArrayLike<BasePageHeaderButton>;
    tailButtons?: ArrayLike<BasePageHeaderButton>;
  };
  footer?: ReactNode;
  children?: ReactNode;
};

export const BasePage = (props: BasePageProps) => {
  const { height } = useSnapshot(visualView);

  return (
    <Grow in>
      <Stack width="100vw" height={`${height}px`}>
        <AppBar position="static" elevation={0} color="transparent">
          <Toolbar variant="dense">
            <Stack flex={1} direction="row">
              {flatDefined(props.header?.headButtons).map((button) => (
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
              {flatDefined(props.header?.tailButtons).map(
                (button) =>
                  button.component ?? (
                    <IconButton
                      key={button.iconRaw}
                      edge="end"
                      size="small"
                      onClick={button.onClick}
                      children={<BaseSvgIcon raw={button.iconRaw} />}
                    />
                  )
              )}
            </Stack>
          </Toolbar>
        </AppBar>

        <Box component="main" flex={1} overflow="auto">
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
            position="static"
            elevation={0}
            color="transparent"
            sx={{ pb: 2 }}
          >
            <Container>
              <Toolbar variant="dense" disableGutters children={props.footer} />
            </Container>
          </AppBar>
        )}
      </Stack>
    </Grow>
  );
};

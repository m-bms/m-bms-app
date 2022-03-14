import {
  AppBar,
  Box,
  Button,
  Container,
  Grow,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { bottomDialog } from "./BottomDialog";
import { LightButton } from "./LightButton";
import { UnpluginIcon } from "./UnpluginIcon";
import { ArrayLike } from "/src/utils/common";

export type PageHeaderButton = {
  iconRaw?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  component?: (
    key: number,
    render: (onClick: MouseEventHandler<HTMLButtonElement>) => ReactNode
  ) => ReactNode;
};

export type PageFooterButton = {
  text?: string;
  disabled?: boolean;
  onClick?: () => unknown;
};

export type PageProps = {
  transition?: boolean;
  header?: {
    text?: string;
    startButtons?: ArrayLike<PageHeaderButton>;
    endButtons?: ArrayLike<PageHeaderButton>;
  };
  footer?: {
    startButton?: PageFooterButton;
    endButton?: PageFooterButton;
  };
  children?: ReactNode;
};

const page = proxy({
  height: innerHeight,
});

visualViewport.addEventListener("resize", () => {
  page.height = visualViewport.height;
});

export const Page = ({
  transition = false,
  header = {},
  footer,
  children,
}: PageProps) => {
  const { closed } = useSnapshot(bottomDialog);
  const { height: pageHeight } = useSnapshot(page);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (closed) setHeight(pageHeight);
  }, [closed, pageHeight]);

  return (
    <Grow in appear={transition} timeout={300}>
      <Stack
        width="100vw"
        height={`${height}px`}
        position="fixed"
        overflow="hidden"
      >
        <AppBar position="static" elevation={0} color="transparent">
          <Container maxWidth="md" disableGutters>
            <Toolbar variant="dense">
              <Stack flex={1} direction="row">
                <PageHeaderButtons buttons={header.startButtons} />
              </Stack>

              {header.text && (
                <Typography
                  variant="h6"
                  align="center"
                  children={header.text}
                />
              )}

              <Stack flex={1} flexDirection="row" justifyContent="end">
                <PageHeaderButtons buttons={header.endButtons} end />
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        <Box component="main" flex={1} overflow="hidden" children={children} />

        {footer && (
          <AppBar
            component="footer"
            position="static"
            elevation={0}
            color="transparent"
            sx={{ pb: 2 }}
          >
            <Container maxWidth="md" disableGutters>
              <Toolbar variant="dense">
                {footer.startButton && (
                  <Button
                    onClick={footer.startButton.onClick}
                    children={footer.startButton.text}
                  />
                )}

                <Box flex={1} />

                {footer.endButton && (
                  <LightButton
                    disabled={footer.endButton.disabled}
                    onClick={footer.endButton.onClick}
                    children={footer.endButton.text}
                  />
                )}
              </Toolbar>
            </Container>
          </AppBar>
        )}
      </Stack>
    </Grow>
  );
};

const PageHeaderButtons = (props: {
  buttons?: ArrayLike<PageHeaderButton>;
  end?: boolean;
}) => {
  return (
    <>
      {[props.buttons ?? []].flat().map((button, index) => {
        const render = (onClick = button.onClick) => (
          <IconButton
            key={index}
            edge={props.end ? "end" : "start"}
            size="small"
            onClick={onClick}
            children={<UnpluginIcon raw={button.iconRaw} />}
          />
        );

        return button.component?.(index, render) ?? render();
      })}
    </>
  );
};

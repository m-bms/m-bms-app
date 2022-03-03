import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import { app, AppPage } from "../../App";
import { BasePage } from "../../BasePage";
import { BaseSvgIcon } from "../../BaseSvgIcon";
import { LightButton } from "../../LightButton";

export enum SubPageType {
  BANNER,
}

export const BaseSubPage = (
  props: {
    title: string;
    dismissButton?: boolean;
    footerButtonLeft?: {
      text: string;
      onClick?: () => unknown;
    };
    footerButtonRight?: {
      text: string;
      disabled?: boolean;
      onClick?: () => unknown;
    };
    children?: ReactNode;
  } & {
    type: SubPageType.BANNER;
    text?: string;
    iconRaw?: string;
    progress?: boolean;
  }
) => {
  return (
    <BasePage
      header={
        !props.dismissButton
          ? undefined
          : {
              headButtons: [
                {
                  iconRaw: IconDismiss,
                  onClick: () => (app.page = AppPage.HOME),
                },
              ],
            }
      }
      footer={
        <>
          {props.footerButtonLeft && (
            <Button
              onClick={props.footerButtonLeft.onClick}
              children={props.footerButtonLeft.text}
            />
          )}

          <Box flex={1} />

          {props.footerButtonRight && (
            <LightButton
              disabled={props.footerButtonRight.disabled}
              onClick={props.footerButtonRight.onClick}
              children={props.footerButtonRight.text}
            />
          )}
        </>
      }
    >
      <Stack height={1} overflow="hidden">
        <Stack justifyContent="flex-end" flex={1}>
          <Typography
            variant="h5"
            align="center"
            mb={1}
            children={props.title}
          />
        </Stack>

        <Stack flex={6} alignItems="center">
          {props.type === SubPageType.BANNER && (
            <>
              <Box mx={3} flex={3}>
                {!!props.text && (
                  <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    children={props.text}
                  />
                )}
              </Box>

              <Box width={100} height={100} my={4}>
                {!!props.iconRaw && (
                  <BaseSvgIcon
                    sx={{
                      width: 1,
                      height: 1,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                    raw={props.iconRaw}
                  />
                )}
              </Box>

              <Box maxWidth={1} flex={2}>
                {props.progress && (
                  <LinearProgress
                    sx={{
                      width: 200,
                      maxWidth: 1,
                    }}
                  />
                )}
              </Box>
            </>
          )}
        </Stack>
      </Stack>
    </BasePage>
  );
};

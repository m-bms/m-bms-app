import { Box, Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { BaseDialog, BaseDialogProps } from "../../components/BaseDialog";
import { BasePage, BasePageProps } from "../../components/BasePage";
import { LightButton } from "../../components/LightButton";

export type BaseSubPageProps = {
  header?: BasePageProps["header"];
  title: string;
  titleUnderline?: boolean;
  scrollable?: boolean;
  footerButtonLeft?: {
    text: string;
    onClick?: () => unknown;
  };
  footerButtonRight?: {
    text: string;
    disabled?: boolean;
    onClick?: () => unknown;
    dialog?: Omit<BaseDialogProps, "trigger">;
  };
  children?: ReactNode;
};

export const BaseSubPage = (props: BaseSubPageProps) => {
  return (
    <BasePage
      header={props.header}
      footer={
        <>
          {props.footerButtonLeft && (
            <Button
              onClick={props.footerButtonLeft.onClick}
              children={props.footerButtonLeft.text}
            />
          )}

          <Box flex={1} />

          {props.footerButtonRight &&
            (props.footerButtonRight.dialog ? (
              <BaseDialog
                {...props.footerButtonRight.dialog}
                trigger={(openDialog) => (
                  <LightButton
                    disabled={props.footerButtonRight!.disabled}
                    onClick={openDialog}
                    children={props.footerButtonRight!.text}
                  />
                )}
              />
            ) : (
              <LightButton
                disabled={props.footerButtonRight.disabled}
                onClick={props.footerButtonRight.onClick}
                children={props.footerButtonRight.text}
              />
            ))}
        </>
      }
    >
      <Stack height={1} overflow="hidden">
        <Stack
          flex={2}
          justifyContent="flex-end"
          borderBottom={
            props.titleUnderline
              ? (theme) => `1px solid ${theme.palette.primary.main}`
              : "none"
          }
        >
          <Typography
            variant="h5"
            align="center"
            mb={1}
            children={props.title}
          />
        </Stack>

        <Stack
          flex={8}
          alignItems="center"
          overflow={props.scrollable ? "auto" : "hidden"}
          children={props.children}
        />

        <Box flex={1} />
      </Stack>
    </BasePage>
  );
};

import { Box, LinearProgress, Typography } from "@mui/material";
import { UnpluginIcon } from "../../components/UnpluginIcon";
import { BaseSubPage, BaseSubPageProps } from "./BaseSubPage";

export const BaseBannerSubPage = (
  props: BaseSubPageProps & {
    text?: string;
    iconRaw?: string;
    progress?: boolean;
  }
) => {
  const { text, iconRaw, progress, ...rest } = props;

  return (
    <BaseSubPage {...rest}>
      <Box flex={3} mx={3}>
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
          <UnpluginIcon
            sx={{
              width: 1,
              height: 1,
              color: (theme) => theme.palette.text.disabled,
            }}
            raw={props.iconRaw}
          />
        )}
      </Box>

      <Box flex={1} maxWidth={1}>
        {props.progress && (
          <LinearProgress
            sx={{
              width: 200,
              maxWidth: 1,
            }}
          />
        )}
      </Box>
    </BaseSubPage>
  );
};

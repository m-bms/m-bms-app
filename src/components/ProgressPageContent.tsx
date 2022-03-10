import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { UnpluginIcon } from "./UnpluginIcon";

export const ProgressPageContent = (props: {
  text?: string;
  iconRaw?: string;
  progress?: boolean;
  children?: ReactNode;
}) => {
  return (
    <Stack height={1} maxHeight={1} px={2} overflow="hidden">
      <Box flex={2} py={1}>
        {props.text && (
          <Typography
            variant="body1"
            align="center"
            color="text.disabled"
            children={props.text}
          />
        )}
      </Box>
      <Stack flex={6} py={1} justifyContent="center">
        {props.iconRaw && (
          <UnpluginIcon
            raw={props.iconRaw}
            sx={{
              flex: "auto",
              width: 1,
              maxHeight: 150,
              color: (theme) => theme.palette.text.disabled,
            }}
          />
        )}
      </Stack>
      <Box flex={1} py={1}>
        {props.progress && (
          <LinearProgress
            sx={{
              width: 0.6,
              m: "auto",
            }}
          />
        )}
      </Box>
    </Stack>
  );
};

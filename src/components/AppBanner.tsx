import { Box, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { memo, SVGProps } from "react";
import { proxy, useSnapshot } from "valtio";

type AppBannerState = {
  open?: boolean;
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  iconX?: number;
  message?: string;
  action?: JSX.Element;
  reset(): void;
};

export const appBanner = proxy<AppBannerState>({
  reset() {
    appBanner.open = false;
    appBanner.Icon = undefined;
    appBanner.iconX = undefined;
    appBanner.message = undefined;
    appBanner.action = undefined;
  },
});

export const AppBanner = memo(() => {
  const theme = useTheme();
  const { open, Icon, iconX = 0, message, action } = useSnapshot(appBanner);

  const color = grey[theme.palette.mode === "dark" ? 600 : 500];

  return !open ? null : (
    <Stack position="fixed" alignItems="center" top="50%" left="50%">
      {Icon && (
        <Icon
          width="100px"
          height="100px"
          color={color}
          style={{
            position: "absolute",
            top: "-110px",
            left: `${iconX - 50}px`,
          }}
        />
      )}

      <Typography
        width={`${theme.breakpoints.values.sm}px`}
        position="absolute"
        color={color}
        textAlign="center"
        whiteSpace="pre-wrap"
        children={message}
      />

      <Box position="absolute" top="80px" children={action} />
    </Stack>
  );
});

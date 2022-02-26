import { Box, Grow, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { atom, useAtom } from "jotai";
import { SVGProps } from "react";

type AppBannerAtom = {
  open?: boolean;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  iconX?: number;
  message?: string;
  action?: JSX.Element;
};

export const appBannerAtom = atom<AppBannerAtom>({});

export const AppBanner = () => {
  const [banner] = useAtom(appBannerAtom);

  const theme = useTheme();
  const color = grey[theme.palette.mode === "dark" ? 600 : 500];

  return (
    <Grow in={banner.open} timeout={theme.transitions.duration.enteringScreen}>
      <Stack position="fixed" alignItems="center" top="50%" left="50%">
        {banner.icon && (
          <banner.icon
            color={color}
            style={{
              position: "absolute",
              top: "-110px",
              left: `${(banner.iconX ?? 0) - 50}px`,
            }}
            width="100px"
            height="100px"
          />
        )}

        <Typography
          width="300px"
          position="absolute"
          color={color}
          textAlign="center"
          whiteSpace="pre-wrap"
          children={banner.message}
        />

        <Box position="absolute" top="80px" children={banner.action} />
      </Stack>
    </Grow>
  );
};

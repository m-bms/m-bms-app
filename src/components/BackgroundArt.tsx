import { Box, Container, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SVGProps } from "react";

export const BackgroundArt = (props: {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  iconX?: number;
  message?: string;
  action?: JSX.Element;
}) => {
  const theme = useTheme();
  const color = grey[theme.palette.mode === "dark" ? 600 : 500];

  return (
    <Container
      maxWidth="xs"
      sx={{
        position: "absolute",
        top: "calc(50% - 100px)",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <props.Icon
          width="100px"
          height="100px"
          color={color}
          style={{
            position: "relative",
            left: `${props.iconX ?? 0}px`,
            marginBottom: "10px",
          }}
        />

        <Typography
          mb="30px"
          color={color}
          textAlign="center"
          whiteSpace="pre-wrap"
          children={props.message}
        />
        {props.action}
      </Box>
    </Container>
  );
};

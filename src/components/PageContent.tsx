import { Box, BoxProps } from "@mui/material";

export const PageContent = (props: BoxProps) => {
  return <Box {...props} component="main" flex={1} />;
};

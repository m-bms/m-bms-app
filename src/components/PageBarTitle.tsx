import { Typography } from "@mui/material";

export const PageBarTitle = (props: { children?: string }) => {
  return (
    <Typography
      variant="h6"
      position="absolute"
      left="50%"
      sx={{ transform: "translateX(-50%)" }}
      children={props.children}
    />
  );
};

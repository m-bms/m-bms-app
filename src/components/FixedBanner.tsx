import { Container, Stack } from "@mui/material";
import { ReactNode } from "react";

export const FixedBanner = (props: {
  fullHeight?: boolean;
  children: ReactNode;
}) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        position: "fixed",
        left: "50%",
        top: 48,
        bottom: 48,
        transform: "translateX(-50%)",
      }}
    >
      <Stack
        height="100%"
        justifyContent="center"
        alignItems="center"
        children={props.children}
      />
    </Container>
  );
};

import { Grow, Stack } from "@mui/material";
import { ReactNode } from "react";

export const Page = (props: { in?: boolean; children: ReactNode }) => {
  return (
    <Grow in={props.in}>
      <Stack width="100vw" height="100vh" children={props.children} />
    </Grow>
  );
};

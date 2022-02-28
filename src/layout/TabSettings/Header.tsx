import { Typography } from "@mui/material";
import { memo, useEffect } from "react";
import { ref } from "valtio";
import { appHeader } from "../AppHeader";

export const Headher = memo(() => {
  useEffect(() => {
    appHeader.children = ref(<Typography variant="h6" children="Settings" />);
  }, []);

  return null;
});

import { Typography } from "@mui/material";
import { useEffect } from "react";
import { ref } from "valtio";
import { appHeader } from "../AppHeader";

export const TabDeviceList = () => {
  useEffect(() => {
    appHeader.children = ref(
      <Typography variant="h6" children="Device List" />
    );
  }, []);

  return null;
};

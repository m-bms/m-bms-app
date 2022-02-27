import { Typography } from "@mui/material";
import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";
import { appHeaderAtom } from "../AppHeader";

export const TabDeviceList = () => {
  const setAppHeaderChildren = useUpdateAtom(appHeaderAtom);

  useEffect(() => {
    setAppHeaderChildren(<Typography variant="h6" children="Device List" />);
  });

  return null;
};

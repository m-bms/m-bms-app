import { Typography } from "@mui/material";
import { useUpdateAtom } from "jotai/utils";
import { memo, useEffect } from "react";
import { appHeaderAtom } from "../AppHeader";

export const Headher = memo(() => {
  const setAppHeaderChildren = useUpdateAtom(appHeaderAtom);

  useEffect(() => {
    setAppHeaderChildren(<Typography variant="h6" children="Settings" />);
  }, []);

  return null;
});

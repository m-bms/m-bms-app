import { SvgIcon as MuiSvgIcon, SvgIconProps } from "@mui/material";
import { useMemo } from "react";

export const UnpluginIcon = (props: SvgIconProps & { raw?: string }) => {
  const { raw = "", ...rest } = props;

  const [viewBox, d] = useMemo(() => {
    const viewBox = raw.match(/viewBox="(.+?)"/)?.[1];
    const d = raw.match(/d="(.+?)"/)?.[1];

    return [viewBox, d];
  }, [raw]);

  return (
    <MuiSvgIcon {...rest} viewBox={viewBox}>
      <path d={d} />
    </MuiSvgIcon>
  );
};

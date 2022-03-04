import { SvgIcon as MuiSvgIcon, SvgIconProps } from "@mui/material";
import { useMemo } from "react";

export const BaseSvgIcon = (props: SvgIconProps & { raw?: string }) => {
  const { raw = "", ...rest } = props;

  const [viewBox, d] = useMemo(() => {
    const viewBox = raw.match(/(?<=viewBox=").+?(?=")/)?.[0];
    const d = raw.match(/(?<=d=").+?(?=")/)?.[0];

    return [viewBox, d];
  }, [raw]);

  return (
    <MuiSvgIcon viewBox={viewBox} {...rest}>
      <path d={d} />
    </MuiSvgIcon>
  );
};

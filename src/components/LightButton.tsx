import { Button, ButtonProps, useTheme } from "@mui/material";
import { ThemeMode, ThemeModeProvider } from "./ThemeModeProvider";

export const LightButton = (props: ButtonProps) => {
  const theme = useTheme();
  const mode = theme.palette.mode as ThemeMode;

  return (
    <ThemeModeProvider mode={props.disabled ? mode : ThemeMode.LIGHT}>
      <Button {...props} variant="contained" disableElevation />
    </ThemeModeProvider>
  );
};

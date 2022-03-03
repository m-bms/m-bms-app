import { Button, ButtonProps } from "@mui/material";
import { ThemeMode, ThemeModeProvider } from "./ThemeModeProvider";

export const LightButton = (props: ButtonProps) => {
  return (
    <ThemeModeProvider mode={ThemeMode.LIGHT}>
      <Button {...props} variant="contained" disableElevation />
    </ThemeModeProvider>
  );
};

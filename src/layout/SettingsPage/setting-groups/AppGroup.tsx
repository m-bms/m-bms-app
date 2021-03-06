import { memo } from "react";
import { useSnapshot } from "valtio";
import { settings } from "../index";
import { SettingGroup, SettingType } from "../SettingGroup";
import { ThemeMode } from "/src/components/ThemeModeProvider";

export const AppGroup = memo(() => {
  const { themeMode } = useSnapshot(settings);

  return (
    <SettingGroup
      title="App"
      settings={[
        {
          type: SettingType.SELECT,
          label: "Theme",
          value: themeMode,
          options: [
            { value: ThemeMode.AUTO, text: "Auto" },
            { value: ThemeMode.LIGHT, text: "Light" },
            { value: ThemeMode.DARK, text: "Dark" },
          ],
          onChange(value) {
            settings.themeMode = value as ThemeMode;
          },
        },
        {
          type: SettingType.BUTTON,
          label: "Cache",
          text: "Clear",
          onClick() {
            localStorage.clear();
            location.reload();
          },
        },
      ]}
    />
  );
});

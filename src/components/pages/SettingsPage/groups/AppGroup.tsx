import { memo } from "react";
import { useSnapshot } from "valtio";
import { Group, ItemType } from "../Group";
import { settingsPage } from "../index";
import { ThemeMode } from "/src/utils/theme";

export const AppGroup = memo(() => {
  const { themeMode } = useSnapshot(settingsPage);

  return (
    <Group
      header="App"
      items={[
        {
          type: ItemType.RADIO,
          label: "Theme",
          title: "Select Theme",
          options: [
            { value: ThemeMode.AUTO, label: "Auto" },
            { value: ThemeMode.LIGHT, label: "Light" },
            { value: ThemeMode.DARK, label: "Dark" },
          ],
          value: themeMode,
          onChange(value) {
            settingsPage.themeMode = value as ThemeMode;
          },
        },
        {
          type: ItemType.BUTTON,
          label: "Cache",
          text: "Clear",
          onClick: () => {
            localStorage.clear();
            // tabFindDevice.reset();
            settingsPage.reset();

            // appToast.open = true;
            // appToast.severity = "success";
            // appToast.children = "Cache cleared";
          },
        },
      ]}
    />
  );
});

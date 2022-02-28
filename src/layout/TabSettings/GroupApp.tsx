import { memo } from "react";
import { useSnapshot } from "valtio";
import { appToast } from "../AppToast";
import { tabFindDevice } from "../TabFindDevice";
import { tabSettings } from "./state";
import { ListGroup, ListItemType } from "/src/components/ListGroup";
import { ThemeMode } from "/src/utils/theme";

export const GroupApp = memo(() => {
  const { themeMode } = useSnapshot(tabSettings);

  return (
    <ListGroup
      header="App"
      items={[
        {
          type: ListItemType.RADIO,
          label: "Theme",
          title: "Select Theme",
          options: [
            { value: ThemeMode.AUTO, label: "Auto" },
            { value: ThemeMode.LIGHT, label: "Light" },
            { value: ThemeMode.DARK, label: "Dark" },
          ],
          value: themeMode,
          onChange(value) {
            tabSettings.themeMode = value as ThemeMode;
          },
        },
        {
          type: ListItemType.BUTTON,
          label: "Cache",
          text: "Clear",
          onClick: () => {
            localStorage.clear();
            tabFindDevice.reset();
            tabSettings.reset();

            appToast.open = true;
            appToast.severity = "success";
            appToast.children = "Cache cleared";
          },
        },
      ]}
    />
  );
});

import { memo } from "react";
import { appToast } from "../AppToast";
import { Sort, tabFindDevice } from "../TabFindDevice";
import { tabSettings } from "./state";
import { ListGroup, ListItemType } from "/src/components/ListGroup";
import { ThemeMode } from "/src/utils/theme";

export const GroupDebug = memo(() => {
  return (
    <ListGroup
      header="Debug"
      items={[
        {
          type: ListItemType.SWITCH,
          label: "Use fake devices",
          value: true,
          disabled: true,
        },
        {
          type: ListItemType.BUTTON,
          label: "Cache",
          value: "Clear",
          onClick: () => {
            localStorage.clear();
            tabFindDevice.sort = Sort.ASCENDING;
            tabSettings.themeMode = ThemeMode.DARK;

            appToast.open = true;
            appToast.severity = "success";
            appToast.children = "Cache cleared";
          },
        },
        {
          type: ListItemType.BUTTON,
          label: "Debug options",
          value: "Hide",
          onClick: () => alert("TODO: make debug options hidden by default"),
        },
      ]}
    />
  );
});

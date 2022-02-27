import { RESET, useUpdateAtom } from "jotai/utils";
import { memo } from "react";
import { appToastAtom } from "../AppToast";
import { themeModeAtom } from "./GroupDisplay";
import { ListGroup, ListItemType } from "/src/components/ListGroup";

export const GroupDebug = memo(() => {
  const setThemeMode = useUpdateAtom(themeModeAtom);
  const setAppAlert = useUpdateAtom(appToastAtom);

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
            setThemeMode(RESET);
            setAppAlert({
              visible: true,
              severity: "success",
              message: "Cache cleared",
            });
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

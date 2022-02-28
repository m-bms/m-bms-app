import { memo } from "react";
import { ref, useSnapshot } from "valtio";
import { appDialog } from "../AppDialog";
import { tabSettings } from "./state";
import { DialogRadioGroup } from "/src/components/DialogRadioGroup";
import { IconArrowDropDown } from "/src/components/IconArrowDropDown";
import { ListGroup, ListItemType } from "/src/components/ListGroup";
import { ThemeMode } from "/src/utils/theme";

export const GroupDisplay = memo(() => {
  const { themeMode } = useSnapshot(tabSettings);

  return (
    <ListGroup
      header="Display"
      items={[
        {
          type: ListItemType.BUTTON,
          label: "Theme",
          value: themeMode,
          endIcon: <IconArrowDropDown />,
          onClick: () => {
            appDialog.open = true;
            appDialog.children = ref(
              <DialogRadioGroup
                title="Select Theme"
                options={[
                  { value: ThemeMode.AUTO, label: "Auto" },
                  { value: ThemeMode.LIGHT, label: "Light" },
                  { value: ThemeMode.DARK, label: "Dark" },
                ]}
                value={themeMode}
                onClose={() => (appDialog.open = false)}
                onChange={(value) => (tabSettings.themeMode = value)}
              />
            );
          },
        },
      ]}
    />
  );
});

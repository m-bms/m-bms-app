import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { memo } from "react";
import { appDialogAtom } from "../AppDialog";
import { DialogRadioGroup } from "/src/components/DialogRadioGroup";
import { IconArrowDropDown } from "/src/components/IconArrowDropDown";
import { ListGroup, ListItemType } from "/src/components/ListGroup";
import { ThemeMode } from "/src/utils/theme";

export const themeModeAtom = atomWithStorage("theme-mode", ThemeMode.DARK);

export const GroupDisplay = memo(() => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const [appDialog, setAppDialog] = useAtom(appDialogAtom);

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
            setAppDialog({
              open: true,
              children: (
                <DialogRadioGroup
                  title="Select Theme"
                  options={[
                    { value: ThemeMode.AUTO, label: "Auto" },
                    { value: ThemeMode.LIGHT, label: "Light" },
                    { value: ThemeMode.DARK, label: "Dark" },
                  ]}
                  value={themeMode}
                  onClose={() => setAppDialog({ ...appDialog, open: false })}
                  onChange={setThemeMode}
                />
              ),
            });
          },
        },
      ]}
    />
  );
});

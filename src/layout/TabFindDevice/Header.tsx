import { Box, IconButton, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage, useUpdateAtom } from "jotai/utils";
import { memo, useEffect } from "react";
import IconSort from "~icons/fluent/arrow-sort-down-lines-24-regular";
import IconSync from "~icons/fluent/arrow-sync-24-regular";
import { DialogRadioGroup } from "../../components/DialogRadioGroup";
import { appDialogAtom } from "../AppDialog";
import { appHeaderAtom } from "../AppHeader";

export enum FindDeviceSort {
  ASCENDING = "ascending",
  DESCENDING = "descending",
  OLDEST = "oldest",
  NEWEST = "newest",
}

export const findDeviceSortAtom = atomWithStorage(
  "find-device-sort",
  FindDeviceSort.ASCENDING
);

export const Header = memo(() => {
  const [sort, setSort] = useAtom(findDeviceSortAtom);
  const [appDialog, setAppDialog] = useAtom(appDialogAtom);
  const setAppHeader = useUpdateAtom(appHeaderAtom);

  useEffect(() => {
    setAppHeader(
      <>
        <Typography variant="h6">Find Device</Typography>
        <Box flex={1} />

        <IconButton
          onClick={() => {
            setAppDialog({
              open: true,
              children: (
                <DialogRadioGroup
                  title="Sort by"
                  options={[
                    { value: FindDeviceSort.ASCENDING, label: "Ascending" },
                    { value: FindDeviceSort.DESCENDING, label: "Descending" },
                    { value: FindDeviceSort.OLDEST, label: "Oldest" },
                    { value: FindDeviceSort.NEWEST, label: "Newest" },
                  ]}
                  value={sort}
                  onClose={() => setAppDialog({ ...appDialog, open: false })}
                  onChange={setSort}
                />
              ),
            });
          }}
          children={<IconSort />}
        />

        <IconButton children={<IconSync />} />
      </>
    );
  }, [sort]);

  return null;
});

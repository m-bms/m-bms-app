import { Box, IconButton, Typography } from "@mui/material";
import { memo, useEffect } from "react";
import { ref, useSnapshot } from "valtio";
import IconSort from "~icons/fluent/arrow-sort-down-lines-24-regular";
import IconSync from "~icons/fluent/arrow-sync-24-regular";
import { DialogRadioGroup } from "../../components/DialogRadioGroup";
import { appDialog } from "../AppDialog";
import { appHeader } from "../AppHeader";
import { bluetoothStartScan } from "./helpers";
import { Sort, tabFindDevice } from "./state";
import { bluetooth } from "/src/utils/bluetooth";

export const Header = memo(() => {
  const { sort } = useSnapshot(tabFindDevice);
  const { scanning } = useSnapshot(bluetooth);

  useEffect(() => {
    appHeader.children = ref(
      <>
        <Typography variant="h6">Find Device</Typography>
        <Box flex={1} />

        <IconButton
          onClick={() => {
            appDialog.open = true;
            appDialog.children = ref(
              <DialogRadioGroup
                title="Sort by"
                options={[
                  { value: Sort.OLDEST, label: "Oldest" },
                  { value: Sort.NEWEST, label: "Newest" },
                  { value: Sort.ASCENDING, label: "Ascending" },
                  { value: Sort.DESCENDING, label: "Descending" },
                ]}
                value={sort}
                onClose={() => (appDialog.open = false)}
                onChange={(value) => (tabFindDevice.sort = value)}
              />
            );
          }}
          children={<IconSort />}
        />

        <IconButton
          children={<IconSync />}
          sx={{ animation: scanning ? `rotate-half 600ms infinite` : "none" }}
          onClick={() => {
            if (!scanning) bluetoothStartScan();
            else bluetooth.stopScan();
          }}
        />
      </>
    );
  }, [sort, scanning]);

  return null;
});

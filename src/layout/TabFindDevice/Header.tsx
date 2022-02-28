import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { memo, useEffect } from "react";
import { ref, useSnapshot } from "valtio";
import IconSort from "~icons/fluent/arrow-sort-down-lines-24-regular";
import IconSync from "~icons/fluent/arrow-sync-24-regular";
import { DialogRadioGroup } from "../../components/DialogRadioGroup";
import { appDialog } from "../AppDialog";
import { appHeader } from "../AppHeader";
import { Sort, tabFindDevice } from "./state";

export const Header = memo(() => {
  const theme = useTheme();
  const { sort } = useSnapshot(tabFindDevice);

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
                  { value: Sort.ASCENDING, label: "Ascending" },
                  { value: Sort.DESCENDING, label: "Descending" },
                  { value: Sort.OLDEST, label: "Oldest" },
                  { value: Sort.NEWEST, label: "Newest" },
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
          sx={{
            svg: {
              // animation: findDevice.finding
              //   ? `rotate-half 700ms ${theme.transitions.easing.easeInOut} infinite`
              //   : "none",
            },
          }}
          onClick={() => {
            // setFindDevice((props) => ({ ...props, finding: !props.finding }));
          }}
        />
      </>
    );
  }, [sort]);

  return null;
});

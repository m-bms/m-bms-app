export { tabSettings } from "./state";

import { Divider, List } from "@mui/material";
import { memo } from "react";
import { GroupAppInfo } from "./GroupAppInfo";
import { GroupDebug } from "./GroupDebug";
import { GroupDisplay } from "./GroupDisplay";
import { Headher } from "./Header";

export const TabSettings = memo(() => {
  return (
    <>
      <Headher />
      <List>
        <GroupAppInfo />
        <Divider />
        <GroupDisplay />
        <Divider />
        <GroupDebug />
      </List>
    </>
  );
});

export { tabSettings } from "./state";

import { Divider, List } from "@mui/material";
import { memo } from "react";
import { GroupApp } from "./GroupApp";
import { GroupFakeHardware } from "./GroupFakeHardware";
import { GroupInfo } from "./GroupInfo";
import { Headher } from "./Header";

export const TabSettings = memo(() => {
  return (
    <>
      <Headher />
      <List>
        <GroupInfo />
        <Divider />
        <GroupApp />
        <Divider />
        <GroupFakeHardware />
      </List>
    </>
  );
});

import { memo } from "react";
import { Group, ItemType } from "../Group";

export const DebugGroup = memo(() => {
  return (
    <Group
      header="Debug"
      items={[
        {
          type: ItemType.BUTTON,
          label: "Hide debug options",
          text: "Hide",
          onClick() {
            alert("TODO: hide debug options");
          },
        },
        {
          type: ItemType.SWITCH,
          label: "Hardware simulation",
          checked: true,
          disabled: true,
        },
      ]}
    />
  );
});

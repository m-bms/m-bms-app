import { memo } from "react";
import { BaseGroup, ItemType } from "../BaseGroup";

export const DebugGroup = memo(() => {
  return (
    <BaseGroup
      title="Debug"
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

import { memo } from "react";
import { Group, ItemType } from "../Group";

export const InfoGroup = memo(() => {
  return (
    <Group
      header="Info"
      items={[
        { type: ItemType.TEXT, label: "App Name", text: "Mermaid BMS" },
        { type: ItemType.TEXT, label: "App Version", text: "0.0.0" },
      ]}
    />
  );
});

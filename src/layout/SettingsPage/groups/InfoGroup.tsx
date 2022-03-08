import { memo } from "react";
import { BaseGroup, ItemType } from "../BaseGroup";

export const InfoGroup = memo(() => {
  return (
    <BaseGroup
      title="Info"
      items={[
        { type: ItemType.TEXT, label: "App Name", text: "Mermaid BMS" },
        { type: ItemType.TEXT, label: "App Version", text: "0.0.0" },
      ]}
    />
  );
});

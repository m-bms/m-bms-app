import { memo } from "react";
import { SettingGroup, SettingType } from "../SettingGroup";

export const InfoGroup = memo(() => {
  return (
    <SettingGroup
      title="Info"
      settings={[
        {
          type: SettingType.TEXT,
          label: "App Name",
          text: "Mermaid BMS",
        },
        {
          type: SettingType.TEXT,
          label: "App Version",
          text: "0.0.0",
        },
      ]}
    />
  );
});

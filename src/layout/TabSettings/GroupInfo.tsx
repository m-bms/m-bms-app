import { memo } from "react";
import { ListGroup, ListItemType } from "/src/components/ListGroup";

export const GroupInfo = memo(() => {
  return (
    <ListGroup
      header="Info"
      items={[
        { type: ListItemType.TEXT, label: "App Name", text: "Mermaid BMS" },
        { type: ListItemType.TEXT, label: "App Version", text: "0.0.0" },
      ]}
    />
  );
});

import { memo } from "react";
import { ListGroup, ListItemType } from "/src/components/ListGroup";

export const GroupAppInfo = memo(() => {
  return (
    <ListGroup
      header="App Info"
      items={[
        { type: ListItemType.TEXT, label: "Name", value: "Mermaid BMS" },
        { type: ListItemType.TEXT, label: "Version", value: "0.0.0" },
      ]}
    />
  );
});

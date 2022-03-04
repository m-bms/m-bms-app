import { useSnapshot } from "valtio";
import { settingsPage } from "..";
import { BaseGroup, ItemType } from "../BaseGroup";

export const WifiGroup = (props: { disableTitle?: boolean }) => {
  const { wifiInvalid, wifiDisabled, wifiNoScan, wifiNoNetwork } =
    useSnapshot(settingsPage);

  return (
    <BaseGroup
      title="WiFi"
      disableTitle={props.disableTitle}
      items={[
        {
          type: ItemType.SWITCH,
          label: "Invalid",
          checked: wifiInvalid,
          onClick() {
            settingsPage.wifiInvalid = !wifiInvalid;
          },
        },
        {
          type: ItemType.SWITCH,
          label: "Disabled",
          checked: wifiDisabled,
          onClick() {
            settingsPage.wifiDisabled = !wifiDisabled;
          },
        },
        {
          type: ItemType.SWITCH,
          label: "No scan",
          checked: wifiNoScan,
          onClick() {
            settingsPage.wifiNoScan = !wifiNoScan;
          },
        },
        {
          type: ItemType.SWITCH,
          label: "No networks",
          checked: wifiNoNetwork,
          onClick() {
            settingsPage.wifiNoNetwork = !wifiNoNetwork;
          },
        },
      ]}
    />
  );
};

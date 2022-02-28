export { Sort, tabFindDevice } from "./state";

import { memo, useEffect } from "react";
import { ref } from "valtio";
import IconBluetoothSearching from "~icons/fluent/bluetooth-searching-20-regular";
import { appBanner } from "../AppBanner";
import { Header } from "./Header";

export const TabFindDevice = memo(() => {
  useEffect(() => {
    appBanner.open = true;
    appBanner.Icon = ref(IconBluetoothSearching);
    appBanner.iconX = -6;
    appBanner.message = "Discovering device\nvia Bluetooth...";

    return appBanner.reset;
  }, []);

  return (
    <>
      <Header />
    </>
  );
});

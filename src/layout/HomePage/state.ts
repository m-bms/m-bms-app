import { BmsDevice } from "/src/utils/bms";
import { proxyWithStorage } from "/src/utils/valtio";

export enum BmsViewType {
  CARD = "card",
  TABLE = "table",
}

export const home = proxyWithStorage(
  "home",
  {
    devices: [] as BmsDevice[],
    viewType: BmsViewType.CARD,
  },
  ["viewType"]
);

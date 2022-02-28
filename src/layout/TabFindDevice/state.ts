import { proxyWithStorage } from "/src/utils/valtio";

export enum Sort {
  OLDEST = "oldest",
  NEWEST = "newest",
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

export const tabFindDevice = proxyWithStorage("tab-find-device", {
  sort: Sort.OLDEST,
  reset() {
    tabFindDevice.sort = Sort.OLDEST;
  },
});

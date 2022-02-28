import { proxyWithStorage } from "/src/utils/valtio";

export enum Sort {
  ASCENDING = "ascending",
  DESCENDING = "descending",
  OLDEST = "oldest",
  NEWEST = "newest",
}

export const tabFindDevice = proxyWithStorage(
  "tab-find-device",
  { sort: Sort.ASCENDING },
  "sort"
);

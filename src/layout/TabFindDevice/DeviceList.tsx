import { atomWithStorage } from "jotai/utils";

export enum FindDeviceSort {
  ASCENDING = "ascending",
  DESCENDING = "descending",
  OLDEST = "oldest",
  NEWEST = "newest",
}

export const findDeviceSortAtom = atomWithStorage(
  "find-device-sort",
  FindDeviceSort.ASCENDING
);

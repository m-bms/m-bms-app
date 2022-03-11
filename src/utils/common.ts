import { promise as promiseQueue } from "fastq";

export const sleep = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const compareStrings = (a = "", b = "", reversed?: boolean) => {
  const result = a > b ? -1 : a < b ? 1 : 0;
  return reversed ? result : -result;
};

export const createQueue = () => {
  return promiseQueue(async (task: () => unknown) => task(), 1);
};

export const toArray = <T>(value: ArrayLike<T>) => {
  return [value].flat().filter(Boolean) as Exclude<T, undefined>[];
};

export const clone = <T>(value: T) => {
  return JSON.parse(JSON.stringify(value)) as T;
};

export type ArrayLike<T> = T | T[];

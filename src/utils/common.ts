export const sleep = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const compareStrings = (a: string, b: string, reversed?: boolean) => {
  const result = a > b ? 1 : a < b ? -1 : 0;
  return reversed ? result : -result;
};

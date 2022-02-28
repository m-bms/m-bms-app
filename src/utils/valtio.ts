import { proxy, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";

export const proxyWithStorage = <T extends Record<string, unknown>>(
  name: string,
  data: T,
  ...keys: (keyof T)[]
) => {
  const local = localStorage.getItem(name);
  const state = proxy<T>(local ? JSON.parse(local) : data);

  if (keys.length) {
    const saveLocal = () => {
      const toSave = {} as Partial<T>;
      keys.forEach((key) => (toSave[key] = state[key]));
      localStorage.setItem(name, JSON.stringify(toSave));
    };

    keys.forEach((key) => subscribeKey(state, key, saveLocal));
  } else {
    subscribe(state, () => localStorage.setItem(name, JSON.stringify(state)));
  }

  return state;
};

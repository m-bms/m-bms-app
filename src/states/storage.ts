import { AppMode } from './app-state'

export enum StorageKey {
  APP_MODE = 'app-mode',
  APP_USE_FAKE_DEVICES = 'app-use-fake-devices',
}

type Storage = {
  [StorageKey.APP_MODE]: AppMode
  [StorageKey.APP_USE_FAKE_DEVICES]: boolean
}

export const getStorage = <
  T extends StorageKey,
  F extends Storage[T] | undefined
>(
  key: T,
  fallback?: F
): F extends undefined ? Storage[T] | undefined : Storage[T] => {
  const stringified = localStorage.getItem(key)

  return stringified !== null
    ? JSON.parse(stringified)
    : fallback !== undefined
    ? setStorage(key, fallback as Storage[T])
    : undefined
}

export const setStorage = <T extends StorageKey>(key: T, value: Storage[T]) => {
  const stringified = JSON.stringify(value)
  localStorage.setItem(key, stringified)

  return value
}

import { isHybrid } from '../ionic/platform'
import { isRelease } from '../utils/env'
import { createState } from '../utils/state'
import { deviceManager, DeviceManager } from './manager'
import { deviceManagerFake } from './manager-fake'
import { getStorage, setStorage, StorageKey } from './storage'

export enum AppMode {
  AUTO = 'auto',
  MD = 'md',
  IOS = 'ios',
}

export type AppState = {
  selectedTab: string
  readonly mode: AppMode
  readonly useFakeDevices: boolean
  readonly deviceManager: DeviceManager
  initialize(): void
  setMode(mode: AppMode): void
  setUseFakeDevices(fakeDevices: boolean): void
}

export const app = createState<AppState>({
  selectedTab: '',
  mode: AppMode.AUTO,
  useFakeDevices: false,
  deviceManager: deviceManager,
  initialize() {
    const mode = isRelease()
      ? AppMode.AUTO
      : getStorage(StorageKey.APP_MODE, AppMode.AUTO)
    this.setMode(mode)

    const useFakeDevices = isRelease()
      ? false
      : isHybrid()
      ? true
      : getStorage(StorageKey.APP_USE_FAKE_DEVICES, true)
    this.setUseFakeDevices(useFakeDevices)
  },
  setMode(mode) {
    if (!isRelease()) setStorage(StorageKey.APP_MODE, mode)

    this.mode = mode

    const query = location.search.match(/(?<=ionic:mode=)md|ios/)?.[0]
    if (query === this.mode || (!query && this.mode === AppMode.AUTO)) return

    const path = this.mode === AppMode.AUTO ? '/' : `/?ionic:mode=${this.mode}`
    location.replace(`${path}${location.hash}`)
  },
  setUseFakeDevices(useFakeDevices) {
    if (!isRelease()) {
      setStorage(StorageKey.APP_USE_FAKE_DEVICES, useFakeDevices)
    }

    this.useFakeDevices = useFakeDevices
    this.deviceManager = useFakeDevices ? deviceManagerFake : deviceManager
  },
})

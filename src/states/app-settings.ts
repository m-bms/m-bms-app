import { createState } from '../utils/state'

export enum AppMode {
  AUTO = 'auto',
  IOS = 'ios',
  MD = 'md',
}

export type AppSettings = {
  mode: AppMode
}

export const appSettings = createState<AppSettings>({
  get mode() {
    return (location.search.match(/md|ios/)?.[0] ?? AppMode.AUTO) as AppMode
  },
  set mode(value) {
    const pathname = value === AppMode.AUTO ? '/' : `/?ionic:mode=${value}`
    location.replace(`${pathname}${location.hash}`)
  },
})

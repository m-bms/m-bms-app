import { isPlatform } from '@ionic/core'
import { setupIonicReact } from '@ionic/react'
import { proxy } from 'valtio'
import { subscribeKey, watch } from 'valtio/utils'
import { setupLocal } from '../utils/local-storage'

export enum Mode {
  AUTO = '',
  MATERIAL_DESIGN = 'md',
  IOS = 'ios',
}

export enum Theme {
  AUTO = '',
  DARK = 'dark',
  LIGHT = 'light',
}

export const settings = proxy({
  mode: Mode.AUTO,
  theme: Theme.DARK,
  setup() {
    const media = proxyMedia()
    applyMode()
    applyTheme(settings.theme, media.dark)

    subscribeKey(settings, 'mode', applyMode)
    watch(get => applyTheme(get(settings).theme, get(media).dark))

    setupLocal('settings', settings)
  },
  reset() {
    settings.mode = Mode.AUTO
    settings.theme = Theme.DARK
  },
})

const applyMode = () => {
  document.documentElement.classList.remove(Mode.MATERIAL_DESIGN, Mode.IOS)

  const auto = isPlatform(Mode.IOS) ? Mode.IOS : Mode.MATERIAL_DESIGN
  setupIonicReact({ mode: settings.mode || auto })
}

const applyTheme = (theme: Theme, mediaDark: boolean) => {
  const dark = theme === Theme.AUTO ? mediaDark : theme === Theme.DARK
  const { classList } = document.body

  if (dark) classList.add(Theme.DARK)
  else classList.remove(Theme.DARK)
}

const proxyMedia = () => {
  const dark = window.matchMedia('(prefers-color-scheme: dark)')
  const media = proxy({ dark: dark.matches })

  dark.addEventListener('change', () => (media.dark = dark.matches))
  return media
}

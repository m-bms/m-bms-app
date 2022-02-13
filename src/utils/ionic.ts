import { initialize, JSX as IonicJSX } from '@ionic/core/components'
import '@ionic/core/css/ionic.bundle.css'
import { JSX } from 'solid-js'
import { PascalToKebab } from './common'

let initialized = false

export const initializeIonicElements = () => {
  if (initialized) return
  initialize()

  // https://github.com/ionic-team/ionic-docs/issues/2105
  document.documentElement.classList.add('ion-ce')
}

type IonicElement<T> = {
  [K in keyof T as PascalToKebab<K>]: T[K]
} & {
  class?: string
  children?: JSX.Element
}

type IonicElements = {
  [K in keyof IonicJSX.IntrinsicElements]: IonicElement<
    IonicJSX.IntrinsicElements[K]
  >
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends IonicElements {}
  }
}

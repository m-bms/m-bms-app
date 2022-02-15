import { JSX as IonicJSX } from '@ionic/core'
import { initialize } from '@ionic/core/components'
import '@ionic/core/css/ionic.bundle.css'
import { JSX as IoniconJSX } from 'ionicons'
import { JSX } from 'solid-js'
import { PascalToCamel, PascalToKebab } from '../utils/common'
import { defineElements } from './define-elements'

export const initializeIonicElements = () => {
  initialize()
  defineElements()

  // https://github.com/ionic-team/ionic-docs/issues/2105
  document.documentElement.classList.add('ion-ce')
}

type IonicElementKey<T> = T extends `on${infer U}`
  ? `on:${PascalToCamel<U>}`
  : PascalToKebab<T>

type IonicElement<T> = {
  [K in keyof T as IonicElementKey<K>]: T[K]
} & {
  slot?: string
  class?: string
  children?: JSX.Element
}

type IonicElements<
  T = IonicJSX.IntrinsicElements & IoniconJSX.IntrinsicElements
> = {
  [K in keyof T]: IonicElement<T[K]>
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends IonicElements {}
  }
}

import { JSX as IonicJSX } from '@ionic/core'
import { JSX as IoniconJSX } from 'ionicons'
import { JSX } from 'solid-js'
import { PascalToCamel, PascalToKebab } from '../utils/common'

type IonicElementKey<T> = T extends `on${infer U}`
  ? `on:${PascalToCamel<U>}`
  : T extends `${'before' | 'after'}${string}`
  ? `on:${PascalToCamel<T>}`
  : T extends `${'checked' | 'disabled'}${string}`
  ? `attr:${PascalToCamel<T>}`
  : PascalToKebab<T>

type IonicElementValue<T> = T extends boolean ? T | 'true' | 'false' : T

type IonicElement<T> = {
  [K in keyof T as IonicElementKey<K>]: IonicElementValue<T[K]>
} & {
  slot?: string
  children?: JSX.Element
} & Pick<JSX.HTMLAttributes<HTMLElement>, 'onClick'>

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

import { initialize, JSX as IonicJSX } from '@ionic/core/components'
import { defineCustomElement as defineApp } from '@ionic/core/components/ion-app'
import { defineCustomElement as defineBackButton } from '@ionic/core/components/ion-back-button'
import { defineCustomElement as defineButton } from '@ionic/core/components/ion-button'
import { defineCustomElement as defineButtons } from '@ionic/core/components/ion-buttons'
import { defineCustomElement as defineContent } from '@ionic/core/components/ion-content'
import { defineCustomElement as defineHeader } from '@ionic/core/components/ion-header'
import { defineCustomElement as defineNav } from '@ionic/core/components/ion-nav'
import { defineCustomElement as defineNavLink } from '@ionic/core/components/ion-nav-link'
import { defineCustomElement as defineRouter } from '@ionic/core/components/ion-router'
import { defineCustomElement as defineTitle } from '@ionic/core/components/ion-title'
import { defineCustomElement as defineToolbar } from '@ionic/core/components/ion-toolbar'
import '@ionic/core/css/ionic.bundle.css'
import { JSX } from 'solid-js'
import { PascalToKebab } from './common'

export const defineIonicElements = () => {
  initialize()

  defineApp()
  defineBackButton()
  defineButton()
  defineButtons()
  defineContent()
  defineHeader()
  defineNav()
  defineNavLink()
  defineRouter()
  defineTitle()
  defineToolbar()

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

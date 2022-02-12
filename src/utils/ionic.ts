import { initialize, JSX as IonicJSX } from '@ionic/core/components'
import { defineCustomElement as defineApp } from '@ionic/core/components/ion-app'
import { defineCustomElement as defineContent } from '@ionic/core/components/ion-content'
import { defineCustomElement as defineHeader } from '@ionic/core/components/ion-header'
import { defineCustomElement as defineTitle } from '@ionic/core/components/ion-title'
import { defineCustomElement as defineToolbar } from '@ionic/core/components/ion-toolbar'
import '@ionic/core/css/ionic.bundle.css'
import { JSX } from 'solid-js'

export const defineIonicElements = () => {
  initialize()

  defineApp()
  defineHeader()
  defineToolbar()
  defineTitle()
  defineContent()

  // https://github.com/ionic-team/ionic-docs/issues/2105
  document.documentElement.classList.add('ion-ce')
}

type IonicElements = {
  [K in keyof IonicJSX.IntrinsicElements]: IonicJSX.IntrinsicElements[K] & {
    class?: string
    children?: JSX.Element
  }
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends IonicElements {}
  }
}

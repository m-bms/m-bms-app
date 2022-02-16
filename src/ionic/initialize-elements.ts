import { initialize } from '@ionic/core/components'
import '@ionic/core/css/ionic.bundle.css'
import { defineIonicElements } from './define-elements'

export const initializeIonicElements = () => {
  initialize()
  defineIonicElements()

  // https://github.com/ionic-team/ionic-docs/issues/2105
  document.documentElement.classList.add('ion-ce')
}

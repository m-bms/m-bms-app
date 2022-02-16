import { cubeOutline, searchOutline, settingsOutline } from 'ionicons/icons'
import { app } from '../states/app-state'
import { defineElement } from '../utils/custom-element'
import { AppSettings } from './AppSettings'
import { AvailableDevices } from './AvailableDevices'
import { ConnectedDevices } from './ConnectedDevices'

export const AppLayout = defineElement('app-layout', () => {
  return (
    <ion-tabs
      on:ionTabsDidChange={event => {
        app.selectedTab = event.detail.tab
      }}
    >
      <ion-tab tab={ConnectedDevices} component={ConnectedDevices} />
      <ion-tab tab={AvailableDevices} component={AvailableDevices} />
      <ion-tab tab={AppSettings} component={AppSettings} />

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab={ConnectedDevices}>
          <ion-icon icon={cubeOutline}></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab={AvailableDevices}>
          <ion-icon icon={searchOutline}></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab={AppSettings}>
          <ion-icon icon={settingsOutline}></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  )
})

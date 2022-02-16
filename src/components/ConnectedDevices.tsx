import { For } from 'solid-js'
import { app } from '../states/app-state'
import { defineElement } from '../utils/custom-element'
import { TabContent } from './TabContent'

export const ConnectedDevices = defineElement('connected-devices', () => {
  return (
    <TabContent name={ConnectedDevices}>
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Connected Devices</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <For each={app.deviceManager.connecteds}>
            {device => (
              <ion-item>
                <ion-label>{device.name}</ion-label>
              </ion-item>
            )}
          </For>
          {/* {app.deviceManager.connecteds.map(device => (
            <ion-item>
              <ion-label>{device.name}</ion-label>
            </ion-item>
          ))} */}
        </ion-list>
      </ion-content>
    </TabContent>
  )
})

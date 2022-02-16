import { alertController, toastController } from '@ionic/core'
import { batch, For } from 'solid-js'
import { app } from '../states/app-state'
import { defineElement } from '../utils/custom-element'
import { assumeMutableState } from '../utils/state'
import { TabContent } from './TabContent'

export const AvailableDevices = defineElement('available-devices', () => {
  return (
    <TabContent
      name={AvailableDevices}
      onEnter={() => app.deviceManager.startScanAvailables(5)}
      onLeave={() => app.deviceManager.stopScanAvailables()}
    >
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Available Devices</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <For each={app.deviceManager.availables}>
            {device => (
              <ion-item>
                <ion-label>
                  <h2>{device.name}</h2>
                  <p>UID: {device.uid}</p>
                </ion-label>
                <ion-button
                  fill="outline"
                  onClick={async () => {
                    // TODO: rewrite this whole draft
                    app.deviceManager.stopScanAvailables()

                    let canceled = true
                    await new Promise(async res => {
                      const alert = await alertController.create({
                        header: 'Connecting\nvia Bluetooth...',
                        buttons: [
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: res,
                          },
                        ],
                        backdropDismiss: false,
                      })
                      alert.present()
                      setTimeout(() => {
                        canceled = false
                        alert.dismiss()
                        res(true)
                      }, 1500)
                    })

                    // TODO: handle when unable to connect

                    if (canceled) return
                    canceled = true
                    const alert = await alertController.create({
                      header: 'Enter WIFI password',
                      inputs: [{ type: 'password' }],
                      buttons: [
                        {
                          text: 'Cancel',
                          role: 'cancel',
                        },
                        {
                          text: 'Connect',
                          handler: () => {
                            canceled = false
                            alert.dismiss()
                          },
                        },
                      ],
                      backdropDismiss: false,
                    })
                    await alert.present()
                    await alert.onDidDismiss()

                    if (canceled) return
                    canceled = true
                    await new Promise(async res => {
                      const alert = await alertController.create({
                        header: 'Joining Devices to WIFI...',
                        buttons: [
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: res,
                          },
                        ],
                        backdropDismiss: false,
                      })
                      alert.present()
                      setTimeout(() => {
                        canceled = false
                        alert.dismiss()
                        res(true)
                      }, 1500)
                    })

                    if (canceled) return
                    batch(() => {
                      const { deviceManager } = app
                      assumeMutableState(deviceManager)
                      const index = deviceManager.availables.indexOf(device)
                      deviceManager.availables.splice(index, 1)
                      deviceManager.connecteds.push(device)
                    })

                    const toast = await toastController.create({
                      message: 'Device joined!',
                      duration: 1000,
                      color: 'dark',
                    })
                    toast.present()
                  }}
                >
                  Connect
                </ion-button>
              </ion-item>
            )}
          </For>
        </ion-list>
        {/* <ion-toast /> */}
      </ion-content>
    </TabContent>
  )
})

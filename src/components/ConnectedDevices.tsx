import { defineElement } from '/src/utils/solid-element'

export const ConnectedDevices = defineElement('connected-devices', () => {
  return (
    <>
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Connected Devices</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content></ion-content>
    </>
  )
})

import { defineElement } from '/src/utils/solid-element'

export const AvailableDevices = defineElement('available-devices', () => {
  return (
    <>
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Available Devices</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content></ion-content>
    </>
  )
})

import { AppMode, appSettings } from '../states/app-settings'
import { defineElement } from '/src/utils/solid-element'

export const AppSettings = defineElement('app-settings', () => {
  return (
    <>
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>App Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item-group>
            <ion-item-divider>App Info</ion-item-divider>

            <ion-item lines="none">
              <ion-label>Name</ion-label>
              <ion-note slot="end">m-bms</ion-note>
            </ion-item>

            <ion-item lines="none">
              <ion-label>Version</ion-label>
              <ion-note slot="end">0.0.0</ion-note>
            </ion-item>
          </ion-item-group>

          <ion-item-group>
            <ion-item-divider>Debug</ion-item-divider>

            <ion-item lines="none">
              <ion-label>UI Mode</ion-label>
              <ion-select
                value={appSettings.mode}
                on:ionChange={event => {
                  appSettings.mode = event.detail.value
                }}
              >
                <ion-select-option value={AppMode.AUTO}>Auto</ion-select-option>
                <ion-select-option value={AppMode.MD}>
                  Material Design
                </ion-select-option>
                <ion-select-option value={AppMode.IOS}>iOS</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-item-group>
        </ion-list>
      </ion-content>
    </>
  )
})

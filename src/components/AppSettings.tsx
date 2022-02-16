import { Show } from 'solid-js'
import { isHybrid } from '../ionic/platform'
import { app, AppMode } from '../states/app-state'
import { defineElement } from '../utils/custom-element'
import { isRelease } from '../utils/env'
import { TabContent } from './TabContent'

export const AppSettings = defineElement('app-settings', () => {
  return (
    <TabContent name={AppSettings}>
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item-group>
            <ion-item-divider>App Info</ion-item-divider>

            <ion-item lines="none">
              <ion-label>Name</ion-label>
              <ion-note>m-bms</ion-note>
            </ion-item>

            <ion-item lines="none">
              <ion-label>Version</ion-label>
              <ion-note>0.0.1</ion-note>
            </ion-item>
          </ion-item-group>

          <Show when={!isRelease()}>
            <ion-item-group>
              <ion-item-divider>Debug</ion-item-divider>

              <ion-item lines="none">
                <ion-label>UI Mode</ion-label>
                <ion-select
                  value={app.mode}
                  on:ionChange={event => {
                    app.setMode(event.detail.value)
                  }}
                >
                  <ion-select-option value={AppMode.AUTO}>
                    Auto
                  </ion-select-option>
                  <ion-select-option value={AppMode.MD}>
                    Material Design
                  </ion-select-option>
                  <ion-select-option value={AppMode.IOS}>iOS</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item lines="none">
                <ion-label>Use Fake Devices</ion-label>
                <ion-toggle
                  attr:checked={!isHybrid() || app.useFakeDevices}
                  attr:disabled={!isHybrid()}
                  on:ionChange={event => {
                    app.setUseFakeDevices(event.detail.checked)
                  }}
                />
              </ion-item>

              <ion-item lines="none">
                <ion-label>Cache</ion-label>
                <ion-button
                  fill="outline"
                  color="danger"
                  onClick={() => {
                    localStorage.clear()
                    location.reload()
                  }}
                >
                  Clear
                </ion-button>
              </ion-item>
            </ion-item-group>
          </Show>
        </ion-list>
      </ion-content>
    </TabContent>
  )
})

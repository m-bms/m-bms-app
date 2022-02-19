import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react'
import { useSnapshot } from 'valtio'
import { appVersion } from '../utils/env'
import { resetLocals } from '../utils/local-storage'
import { findDevice } from './FindDevice.state'
import { Mode, settings, Theme } from './Settings.state'

export const Settings = () => {
  const { mode, theme } = useSnapshot(settings)

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemGroup>
            <IonItemDivider>App Info</IonItemDivider>

            <IonItem lines="none">
              <IonLabel>Name</IonLabel>
              <IonNote slot="end">m-bms</IonNote>
            </IonItem>

            <IonItem lines="none">
              <IonLabel>Version</IonLabel>
              <IonNote slot="end">{appVersion}</IonNote>
            </IonItem>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>Display</IonItemDivider>

            <IonItem lines="none">
              <IonLabel>Theme</IonLabel>
              <IonSelect
                value={theme}
                onIonChange={event => {
                  settings.theme = event.detail.value
                }}
              >
                <IonSelectOption value={Theme.AUTO}>Auto</IonSelectOption>
                <IonSelectOption value={Theme.DARK}>Dark</IonSelectOption>
                <IonSelectOption value={Theme.LIGHT}>Light</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem lines="none">
              <IonLabel>UI</IonLabel>
              <IonSelect
                value={mode}
                onIonChange={event => {
                  settings.mode = event.detail.value
                }}
              >
                <IonSelectOption value={Mode.AUTO}>Auto</IonSelectOption>
                <IonSelectOption value={Mode.MATERIAL_DESIGN}>
                  Material Design
                </IonSelectOption>
                <IonSelectOption value={Mode.IOS}>iOS</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>Debug</IonItemDivider>

            <IonItem lines="none">
              <IonLabel>Use fake devices</IonLabel>
              <IonToggle checked={true} disabled={true} />
            </IonItem>

            <IonItem lines="none">
              <IonLabel>Reset app</IonLabel>
              <IonButton
                fill="outline"
                color="danger"
                onClick={() => {
                  findDevice.reset()
                  settings.reset()
                  resetLocals()
                }}
              >
                Reset
              </IonButton>
            </IonItem>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </>
  )
}

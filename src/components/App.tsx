import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { cubeOutline, searchOutline, settingsOutline } from 'ionicons/icons'
import { Redirect, Route } from 'react-router'
import { useSnapshot } from 'valtio'
import { app, AppRoute } from './App.state'
import { DeviceList } from './DeviceList'
import { FindDevice } from './FindDevice'
import { Settings } from './Settings'
import { settings } from './Settings.state'

export const App = () => {
  const { mode } = useSnapshot(settings)

  return (
    <IonApp key={mode}>
      <IonReactRouter>
        <IonTabs
          onIonTabsDidChange={event => {
            app.route = event.detail.tab as AppRoute
          }}
        >
          <IonRouterOutlet>
            <Route path={AppRoute.CONNECTED_DEVICES} component={DeviceList} />
            <Route path={AppRoute.AVAILABLE_DEVICES} component={FindDevice} />
            <Route path={AppRoute.SETTINGS} component={Settings} />
            <Redirect from="/" to={AppRoute.CONNECTED_DEVICES} exact />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton
              tab={AppRoute.CONNECTED_DEVICES}
              href={AppRoute.CONNECTED_DEVICES}
            >
              <IonIcon src={cubeOutline} />
            </IonTabButton>

            <IonTabButton
              tab={AppRoute.AVAILABLE_DEVICES}
              href={AppRoute.AVAILABLE_DEVICES}
            >
              <IonIcon src={searchOutline} />
            </IonTabButton>

            <IonTabButton tab={AppRoute.SETTINGS} href={AppRoute.SETTINGS}>
              <IonIcon src={settingsOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

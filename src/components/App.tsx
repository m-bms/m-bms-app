import { AppLayout } from './AppLayout'
import { AppSettings } from './AppSettings'
import { AvailableDevices } from './AvailableDevices'
import { ConnectedDevices } from './ConnectedDevices'

export const App = () => {
  return (
    <ion-app>
      <ion-router>
        <ion-route component={AppLayout}>
          <ion-route url="/connected-devices" component={ConnectedDevices} />
          <ion-route url="/available-devices" component={AvailableDevices} />
          <ion-route url="/app-settings" component={AppSettings} />
        </ion-route>
        <ion-route-redirect from="/" to="/connected-devices" />
      </ion-router>

      <ion-nav></ion-nav>
      <ion-loading />
    </ion-app>
  )
}

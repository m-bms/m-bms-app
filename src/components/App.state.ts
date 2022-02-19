import { proxy } from 'valtio'

export enum AppRoute {
  CONNECTED_DEVICES = '/connected-devices',
  AVAILABLE_DEVICES = '/available-devices',
  SETTINGS = '/settings',
}

export const app = proxy({
  route: AppRoute.CONNECTED_DEVICES,
})

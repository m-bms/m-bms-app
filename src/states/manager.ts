import { Device } from './device'
import { deviceManagerFake } from './manager-fake'

export type DeviceManager = {
  readonly connecteds: readonly Device[]
  readonly availables: readonly Device[]
  readonly isScanningConnecteds: boolean
  readonly isScanningAvailables: boolean
  startScanConnecteds(interval: number): void
  stopScanConnecteds(): void
  startScanAvailables(interval: number): void
  stopScanAvailables(): void
}

// TODO: implement real device manager for mobile platform
export const deviceManager = deviceManagerFake

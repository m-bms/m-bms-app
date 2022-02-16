import { info } from '../utils/logger'
import { createState } from '../utils/state'
import { Device } from './device'
import { DeviceManager } from './manager'

const fakeDevices: Device[] = [
  { name: 'DEVICE_01', uid: '512997bb-5ad0', connected: false },
  { name: 'DEVICE_02', uid: '203a308c-5c75', connected: false },
  { name: 'DEVICE_03', uid: '0b7f63df-589b', connected: false },
  { name: 'DEVICE_04', uid: '9d03a033-4165', connected: false },
  { name: 'DEVICE_05', uid: 'c9cf8658-7f1a', connected: false },
  { name: 'DEVICE_06', uid: 'e9733400-5490', connected: false },
  { name: 'DEVICE_07', uid: 'ac11e4fd-4e54', connected: false },
  { name: 'DEVICE_08', uid: '6e39554d-b27e', connected: false },
  { name: 'DEVICE_09', uid: '6b6324a9-3cbb', connected: false },
  { name: 'DEVICE_10', uid: '8d590499-d3ef', connected: false },
  { name: 'DEVICE_11', uid: 'f289778f-184e', connected: false },
  { name: 'DEVICE_12', uid: '013f6365-6e59', connected: false },
  { name: 'DEVICE_13', uid: '813fc45a-d03c', connected: false },
  { name: 'DEVICE_14', uid: 'a0f2b4e9-dfb2', connected: false },
  { name: 'DEVICE_15', uid: 'f46c4138-90c0', connected: false },
  { name: 'DEVICE_16', uid: 'e65c1868-831a', connected: false },
]

const createDeviceManagerFake = () => {
  let addingConnecteds: ReturnType<typeof setTimeout>
  let addingAvailables: ReturnType<typeof setTimeout>

  const deviceManagerFake = createState<DeviceManager>({
    connecteds: [],
    availables: [],
    isScanningConnecteds: false,
    isScanningAvailables: false,
    startScanConnecteds() {
      if (this.isScanningConnecteds) this.stopScanConnecteds()
      this.isScanningConnecteds = true
    },
    stopScanConnecteds() {
      if (!this.isScanningConnecteds) return
      this.isScanningConnecteds = false
    },
    startScanAvailables() {
      if (this.isScanningAvailables) this.stopScanAvailables()
      this.isScanningAvailables = true

      const { random, floor, max } = Math
      const interval = 1000
      const toAdds = [...fakeDevices]
      let maxAdds = floor(max(toAdds.length / 2, random() * toAdds.length))

      const addDevice = () => {
        if (!toAdds[0] || !maxAdds) return

        let i = floor(random() * (toAdds.length - 1))
        const [device] = toAdds.splice(i, 1)
        this.availables.push(device)

        --maxAdds
        addingAvailables = setTimeout(addDevice, random() * interval)
      }

      this.availables = []
      addingAvailables = setTimeout(addDevice, 0)
      info(`Scan available devices of [${maxAdds}]`)
    },
    stopScanAvailables() {
      if (!this.isScanningAvailables) return
      this.isScanningAvailables = false

      clearTimeout(addingAvailables)
      info('Stop scan available devices')
    },
  })

  return deviceManagerFake
}

export const deviceManagerFake = createDeviceManagerFake()

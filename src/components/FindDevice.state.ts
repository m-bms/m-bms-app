import { proxy } from 'valtio'
import { setupLocal } from '../utils/local-storage'

export enum Sort {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
  OLDEST = 'oldest',
  NEWEST = 'newest',
}

export const findDevice = proxy({
  sort: Sort.ASCENDING,
  setup() {
    setupLocal('find-device', findDevice, 'sort')
  },
  reset() {
    findDevice.sort = Sort.ASCENDING
  },
})

import { LinearProgress } from '@mui/material'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import IconBluetoothSearching from '~icons/fluent/bluetooth-searching-20-regular'
import { appBannerAtom } from '../AppBanner'
import { Header } from './Header'

export const TabFindDevice = () => {
  const [, setAppBanner] = useAtom(appBannerAtom)

  useEffect(() => {
    setAppBanner({
      open: true,
      icon: IconBluetoothSearching,
      iconX: -6,
      message: 'Discovering device\nvia Bluetooth...',
      action: <LinearProgress sx={{ width: '200px' }} />,
    })
    return () => setAppBanner({ open: false })
  }, [])

  return (
    <>
      <Header />
    </>
  )
}

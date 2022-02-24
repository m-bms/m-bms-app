import { Portal, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { appHeaderAtom } from './AppHeader'

export const TabFindDevice = () => {
  const [header] = useAtom(appHeaderAtom)

  return (
    <>
      <Portal container={header}>
        <Typography variant="h6">Find Device</Typography>
      </Portal>
    </>
  )
}

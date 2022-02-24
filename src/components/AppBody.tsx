import { Box, Container } from '@mui/material'
import { atom, useAtom } from 'jotai'
import { AppTab, appTabAtom } from './AppFooter'
import { TabDeviceList } from './TabDeviceList'
import { TabFindDevice } from './TabFindDevice'
import { TabSettings } from './TabSettings'

export const appBodyAtom = atom<HTMLElement | null>(null)

export const AppBody = () => {
  const [appTab] = useAtom(appTabAtom)
  const [, setAppBody] = useAtom(appBodyAtom)

  return (
    <Box ref={setAppBody} component="main" flex={1} overflow="auto">
      <Container maxWidth="sm" disableGutters>
        {appTab === AppTab.DEVICE_LIST && <TabDeviceList />}
        {appTab === AppTab.FIND_DEVICE && <TabFindDevice />}
        {appTab === AppTab.SETTINGS && <TabSettings />}
      </Container>
    </Box>
  )
}

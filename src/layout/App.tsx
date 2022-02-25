import { CssBaseline, Stack, ThemeProvider, useMediaQuery } from '@mui/material'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect, useMemo, useState } from 'react'
import { createTheme, ThemeMode } from '../utils/theme'
import { AppAlert } from './AppAlert'
import { AppBanner } from './AppBanner'
import { AppBody } from './AppBody'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

export const themeModeAtom = atomWithStorage('theme-mode', ThemeMode.DARK)

export const App = () => {
  const [themeMode] = useAtom(themeModeAtom)
  const preferDark = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () => createTheme(themeMode, preferDark),
    [themeMode, preferDark]
  )

  const [appHeight, setAppHeight] = useState(0)
  useEffect(() => {
    const updateAppHeight = () => setAppHeight(visualViewport.height)
    updateAppHeight()
    visualViewport.addEventListener('resize', updateAppHeight)

    return () => visualViewport.removeEventListener('resize', updateAppHeight)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack height={`${appHeight}px`}>
        <AppHeader />
        <AppBody />
        <AppFooter />
      </Stack>
      <AppAlert />
      <AppBanner />
    </ThemeProvider>
  )
}

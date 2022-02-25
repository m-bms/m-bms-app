import { AppBar, Container, Fade, Toolbar, useTheme } from '@mui/material'
import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { appBodyAtom } from './AppBody'
import { appTabAtom } from './AppFooter'

export const appHeaderChildrenAtom = atom<JSX.Element | null>(null)

export const AppHeader = () => {
  const theme = useTheme()
  const [appTab] = useAtom(appTabAtom)
  const [appBody] = useAtom(appBodyAtom)
  const [children] = useAtom(appHeaderChildrenAtom)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!appBody) return

    const updateScrolled = () => setScrolled(appBody.scrollTop > 10)
    appBody.addEventListener('scroll', updateScrolled)

    return () => appBody.removeEventListener('scroll', updateScrolled)
  }, [appBody])

  return (
    <AppBar
      position="static"
      color="grey200"
      sx={{
        boxShadow: scrolled ? 4 : 0,
        '.MuiIconButton-root': { fontSize: '1.2rem' },
      }}
    >
      <Fade key={appTab} in timeout={theme.transitions.duration.enteringScreen}>
        <Container maxWidth="sm" disableGutters>
          <Toolbar
            variant="dense"
            sx={{ '@media (min-width: 600px)': { px: 2 } }}
            children={children}
          />
        </Container>
      </Fade>
    </AppBar>
  )
}

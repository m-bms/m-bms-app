import { AppBar, Container, Toolbar, useScrollTrigger } from '@mui/material'
import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { appBodyAtom } from './AppBody'

export const appHeaderAtom = atom<HTMLElement | null>(null)

export const AppHeader = () => {
  const [, setAppHeader] = useAtom(appHeaderAtom)
  const [appBody] = useAtom(appBodyAtom)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!appBody) return

    const updateScrollY = () => setScrolled(appBody.scrollTop > 10)
    appBody.addEventListener('scroll', updateScrollY)

    return () => appBody.removeEventListener('scroll', updateScrollY)
  }, [appBody])

  return (
    <AppBar
      position="static"
      color="grey200"
      sx={{ boxShadow: scrolled ? 4 : 0 }}
    >
      <Container maxWidth="sm" disableGutters>
        <Toolbar
          ref={setAppHeader}
          variant="dense"
          sx={{ '@media (min-width: 600px)': { px: 2 } }}
        ></Toolbar>
      </Container>
    </AppBar>
  )
}

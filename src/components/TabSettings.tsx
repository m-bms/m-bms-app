import {
  Alert,
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  MenuItem,
  Portal,
  Select,
  Snackbar,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'
import { useState } from 'react'
import { appAlertAtom } from './AppAlert'
import { appTabAtom } from './AppFooter'
import { appHeaderAtom } from './AppHeader'
import { SwitchAndroid12 } from './SwitchAndroid12'

export enum ThemeMode {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export const themeModeAtom = atomWithStorage('theme-mode', ThemeMode.DARK)

export const TabSettings = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom)
  const [appHeader] = useAtom(appHeaderAtom)
  const [, setAppAlert] = useAtom(appAlertAtom)

  return (
    <>
      <Portal container={appHeader}>
        <Typography variant="h6" children="Settings" />
      </Portal>
      <List
        sx={{
          '.MuiListItem-root': { alignItems: 'baseline' },
        }}
      >
        <ListSubheader disableSticky children="App" />

        <ListItem>
          <ListItemText>Name</ListItemText>
          <Typography variant="caption" children="Mermaid BMS" />
        </ListItem>

        <ListItem>
          <ListItemText>Version</ListItemText>
          <Typography variant="caption" children="0.0.0" />
        </ListItem>

        <Divider />
        <ListSubheader disableSticky>Display</ListSubheader>

        <ListItem>
          <ListItemText>Theme</ListItemText>
          <ListItemSecondaryAction>
            <Select
              size="small"
              sx={{
                fontSize: '0.8125rem',
                fieldset: {
                  borderWidth: '1px !important',
                },
              }}
              value={themeMode}
              onChange={event => setThemeMode(event.target.value as ThemeMode)}
            >
              <MenuItem value={ThemeMode.AUTO} children="Auto" />
              <MenuItem value={ThemeMode.LIGHT} children="Light" />
              <MenuItem value={ThemeMode.DARK} children="Dark" />
            </Select>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />
        <ListSubheader disableSticky children="Debug" />

        <ListItem>
          <ListItemText children="Use fake devices" />
          <ListItemSecondaryAction>
            <SwitchAndroid12 checked disabled />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemText children="Cache" />
          <ListItemSecondaryAction>
            <Button
              size="small"
              variant="outlined"
              children="Clear"
              onClick={() => {
                setThemeMode(RESET)
                setAppAlert({
                  open: true,
                  severity: 'success',
                  message: 'Cache cleared',
                })
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemText children="Debug options" />
          <ListItemSecondaryAction>
            <Button
              size="small"
              variant="outlined"
              onClick={() =>
                alert('TODO: make debug options hidden by default')
              }
              children="Hide"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  )
}

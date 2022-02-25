import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { themeModeAtom } from '../App'
import { appAlertAtom } from '../AppAlert'
import { Header } from './Header'
import { IconArrowDropDown } from '/src/components/IconArrowDropDown'
import { SelectRadio } from '/src/components/SelectRadio'
import { SwitchAndroid12 } from '/src/components/SwitchAndroid12'
import { ThemeMode } from '/src/utils/theme'

export const TabSettings = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom)
  const [, setAppAlert] = useAtom(appAlertAtom)

  return (
    <>
      <Header />

      <List sx={{ '.MuiListItem-root': { alignItems: 'baseline' } }}>
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
            <SelectRadio
              title="Select Theme"
              options={[
                { value: ThemeMode.AUTO, label: 'Auto' },
                { value: ThemeMode.LIGHT, label: 'Light' },
                { value: ThemeMode.DARK, label: 'Dark' },
              ]}
              value={themeMode}
              onChange={setThemeMode}
              trigger={openDialog => (
                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<IconArrowDropDown />}
                  onClick={openDialog}
                  children={themeMode}
                />
              )}
            />
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
                  visible: true,
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

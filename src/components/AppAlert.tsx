import { Alert, Snackbar, AlertColor } from '@mui/material'
import { atom, useAtom } from 'jotai'

export const appAlertAtom = atom({
  open: false,
  severity: 'success' as AlertColor,
  message: '',
})

export const AppAlert = () => {
  const [appAlert, setAppAlert] = useAtom(appAlertAtom)

  const closeAppAlert = () => {
    setAppAlert(value => ({ ...value, open: false }))
  }

  return (
    <Snackbar
      open={appAlert.open}
      onClose={closeAppAlert}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      sx={{
        bottom: '58px',
        '@media (min-width: 600px)': {
          bottom: '58px',
        },
        '.MuiAlert-root': {
          width: 1,
          bgcolor: theme => `${theme.palette[appAlert.severity].main}33`,
        },
      }}
    >
      <Alert
        severity={appAlert.severity}
        onClose={closeAppAlert}
        children={appAlert.message}
      />
    </Snackbar>
  )
}

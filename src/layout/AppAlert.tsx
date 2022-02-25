import { Alert, AlertColor, Snackbar } from '@mui/material'
import { atom, useAtom } from 'jotai'

type AppAlertAtom = {
  visible?: boolean
  severity?: AlertColor
  message?: string
}

export const appAlertAtom = atom<AppAlertAtom>({})

export const AppAlert = () => {
  const [alert, setAppAlert] = useAtom(appAlertAtom)
  const severity = alert.severity ?? 'success'

  const closeAlert = () => {
    setAppAlert(value => ({ ...value, visible: false }))
  }

  return (
    <Snackbar
      open={alert.visible}
      onClose={closeAlert}
      autoHideDuration={3000}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      sx={{
        bottom: '58px',
        '@media (min-width: 600px)': {
          bottom: '58px',
        },
        '.MuiAlert-root': {
          width: '100%',
          bgcolor: theme => `${theme.palette[severity].main}33`,
        },
      }}
    >
      <Alert
        severity={severity}
        onClose={closeAlert}
        children={alert.message}
      />
    </Snackbar>
  )
}

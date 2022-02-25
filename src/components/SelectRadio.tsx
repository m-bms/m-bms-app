import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useState } from 'react'

export const SelectRadio = <T extends string>(props: {
  title: string
  options: Array<{
    value: T
    label: string
  }>
  value: T
  onChange: (value: T) => unknown
  trigger: (openDialog: () => void) => JSX.Element
}) => {
  const [value, setValue] = useState(props.value)
  const [open, setOpen] = useState(false)

  const closeDialog = () => setOpen(false)
  const openDialog = () => {
    setValue(props.value)
    setOpen(true)
  }

  return (
    <>
      {props.trigger(openDialog)}

      <Dialog
        open={open}
        onClose={closeDialog}
        maxWidth="xs"
        transitionDuration={200}
        fullWidth
      >
        <DialogTitle children={props.title} />

        <DialogContent>
          <RadioGroup
            value={value}
            onChange={(_, value) => setValue(value as T)}
          >
            {props.options.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                value={value}
                label={label}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog} children="Cancel" />
          <Button
            onClick={() => {
              closeDialog()
              props.onChange(value)
            }}
            children="OK"
          />
        </DialogActions>
      </Dialog>
    </>
  )
}

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

export const DialogRadioGroup = <T extends string>(props: {
  title: string;
  options: Array<{
    value: T;
    label: string;
  }>;
  value: T;
  onClose: () => unknown;
  onChange: (value: T) => unknown;
}) => {
  const [value, setValue] = useState(props.value);

  return (
    <>
      <DialogTitle children={props.title} />

      <DialogContent>
        <RadioGroup value={value} onChange={(_, value) => setValue(value as T)}>
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
        <Button onClick={props.onClose} children="Cancel" />
        <Button
          onClick={() => {
            props.onClose();
            props.onChange(value);
          }}
          children="OK"
        />
      </DialogActions>
    </>
  );
};

import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';

interface InputTextProps {
  onChange: (newText: string) => void
}
const InputTextComponent: FunctionComponent<InputTextProps> = ({
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <TextField fullWidth multiline onChange={handleChange} />
  )
}

export default InputTextComponent;

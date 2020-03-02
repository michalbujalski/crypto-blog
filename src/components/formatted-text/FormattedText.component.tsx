import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';

interface FormattedTextProps {
  formattedText: string
}

const FormattedTextComponent: FunctionComponent<FormattedTextProps> = ({
  formattedText
}) => {
  return <TextField disabled fullWidth multiline value={formattedText} />
}

export default FormattedTextComponent;

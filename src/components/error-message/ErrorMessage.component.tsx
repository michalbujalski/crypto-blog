import React, { FunctionComponent } from 'react';
import styles from './ErrorMessage.module.css';
import { Box } from '@material-ui/core';

interface ErrorMessageProps {
  errorMessage: string
};

const ErrorMessageComponent: FunctionComponent<ErrorMessageProps> = ({
  errorMessage
}) => {
  return (
    <Box p={2}>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </Box>
  );
}

export default ErrorMessageComponent;
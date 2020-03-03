import React, { FunctionComponent } from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const LoaderComponent: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      data-testid="loader"
    >
      <Box mr={2}><CircularProgress /></Box><span>Parsing</span>
    </Box>
  );
}

export default LoaderComponent;

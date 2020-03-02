import React, { useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import InputTextComponent from './components/input-text/InputText.component';
import FormattedTextComponent from './components/formatted-text/FormattedText.component';
import { parseText } from './text-parser';
import ErrorMessageComponent from './components/error-message/ErrorMessage.component';

function App() {
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<string|null>(null);
  const handleChange = (newText:string) => {
    (async () => {
      try {
      const formattedText = await parseText(newText);
      setError(null);
      setText(formattedText);
      } catch (error) {
        setError(error.message);
      }
    })();
  }
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={6}>
          <Box p={2}>
            <InputTextComponent onChange={handleChange}/>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}>
            <FormattedTextComponent formattedText={text}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {error && <ErrorMessageComponent errorMessage={error}/>}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

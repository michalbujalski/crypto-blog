import React, { useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import InputTextComponent from './components/input-text/InputText.component';
import FormattedTextComponent from './components/formatted-text/FormattedText.component';
import { parseText } from './text-parser';
import ErrorMessageComponent from './components/error-message/ErrorMessage.component';
import LoaderComponent from './components/loader/Loader.component';

interface AppState {
  isLoading: boolean,
  text: string,
  error: string|null
}

const initState: AppState = {
  isLoading: false,
  text: '',
  error: null
}

function App() {
  const [state, setState] = useState<AppState>(initState);
  const handleChange = (newText:string) => {
    (async () => {
      try {
        setState({...state, isLoading: true});
        const formattedText = await parseText(newText);
        setState({...state, isLoading: false, error: null, text: formattedText});
      } catch (error) {
        setState({...state, isLoading: false, error: error.message, text: newText});
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
            <FormattedTextComponent formattedText={state.text}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {state.error && <ErrorMessageComponent errorMessage={state.error}/>}
        </Grid>
        <Grid item xs={12}>
          {state.isLoading && <LoaderComponent />}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

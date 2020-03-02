import React, { useState } from 'react';
import './App.css';
import InputTextComponent from './components/InputText.component';
import FormattedTextComponent from './components/FormattedText.component';
import { Grid, Box } from '@material-ui/core';

function App() {
  const [text, setText] = useState<string>('')
  const handleChange = (newText:string) => {
    setText(newText);
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
      </Grid>
    </div>
  );
}

export default App;

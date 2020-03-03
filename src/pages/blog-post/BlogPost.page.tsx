import React, { FunctionComponent } from 'react';
import { Grid, Box } from '@material-ui/core';

import InputTextComponent from '../../components/input-text/InputText.component';
import FormattedTextComponent from '../../components/formatted-text/FormattedText.component';
import ErrorMessageComponent from '../../components/error-message/ErrorMessage.component';
import LoaderComponent from '../../components/loader/Loader.component';

interface BlogPageProps {
  isLoading: boolean,
  text: string,
  error: string|null,
  handleChange: (newText: string) => void
}

const BlogPostPage: FunctionComponent<BlogPageProps> = ({
  text,
  handleChange,
  error,
  isLoading
}) => {
  return (
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
      <Grid item xs={12}>
        {isLoading && <LoaderComponent />}
      </Grid>
    </Grid>
  );
}

export default BlogPostPage;
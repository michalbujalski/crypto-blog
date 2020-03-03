import React, { FunctionComponent, useState } from 'react';
import BlogPostPage from './BlogPost.page';
import { parseText } from '../../text-parser';

interface BlogPostState {
  isLoading: boolean,
  text: string,
  error: string|null
}

const initState: BlogPostState = {
  isLoading: false,
  text: '',
  error: null
}
const BlogPostContainer: FunctionComponent = () => {
  const [state, setState] = useState<BlogPostState>(initState);
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
    <BlogPostPage
      {...state}
      handleChange={handleChange}
    />
  );
}

export default BlogPostContainer;

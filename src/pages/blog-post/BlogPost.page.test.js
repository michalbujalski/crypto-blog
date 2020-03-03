import React from 'react';
import { render, findByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import BlogPostPage from './BlogPost.page';

describe('App component',() => {
  it('renders error message', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <BlogPostPage
        error="errorMessage"
        isLoading="false"
        text="some text"
        handleChange={handleChange}
      />
    );
    const errorMessage = getByTestId('errorMessage');
    expect(errorMessage).toBeInTheDocument();
  })
  it('does not render loader when not active', async () => {
    const handleChange = jest.fn();
    const { queryByTestId } = render(
      <BlogPostPage
        error="errorMessage"
        isLoading={false}
        text="some text"
        handleChange={handleChange}
      />
    );
    expect(queryByTestId('loader')).toBeNull();
  })
})

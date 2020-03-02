import React from 'react';
import ErrorMessageComponent from './ErrorMessage.component';
import { render } from '@testing-library/react';

describe('Error message component',() => {
  it('renders error message', () => {
    const error = "Some error"
    const { getByText } = render(<ErrorMessageComponent errorMessage={error}/>);
    const errorElement = getByText(error);
    expect(errorElement).toBeInTheDocument();
  })
})
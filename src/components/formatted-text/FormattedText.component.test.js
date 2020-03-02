import React from 'react';
import FormattedTextComponent from './FormattedText.component';
import { render } from '@testing-library/react';

describe('Formatted text component',() => {
  it('renders text', () => {
    const formattedText = "Some error"
    const { getByText } = render(<FormattedTextComponent formattedText={formattedText}/>);
    const inputElement = getByText(formattedText);
    expect(inputElement).toBeInTheDocument();
  })
})
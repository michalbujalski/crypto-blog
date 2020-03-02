import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as helper from './text-parser';
import { act } from 'react-dom/test-utils';

describe('App component',() => {
  it('renders input in the outpu text field', async () => {
    jest.spyOn(helper, 'parseText')
      .mockImplementation(value=>value);
    const { getByTestId } = render(<App/>);
    const input = getByTestId('textInput');
    const output = getByTestId('formattedText');
    await act(async () => {
      await userEvent.type(input, 'some input')
    })
    expect(output).toHaveValue('some input');
  })
  it('renders error message', async () => {
    jest.spyOn(helper, 'parseText')
      .mockImplementation(() => {
        throw new Error('this is an error')
      });
    const { getByTestId } = render(<App/>);
    const input = getByTestId('textInput');
    
    await act(async () => {
      await userEvent.type(input, 'some input')
    })
    const errorMessage = getByTestId('errorMessage');
    expect(errorMessage).toBeInTheDOM();
  })
})

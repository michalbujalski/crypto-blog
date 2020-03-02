import React from 'react';
import InputText from './InputText.component';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Input text component',() => {
  it('fires onChange event on text enter', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<InputText onChange={handleChange}/>);
    const input = getByTestId('textInput');
    await userEvent.type(input, 'a')
    expect(handleChange).toBeCalledWith('a');
  })
})

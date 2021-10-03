import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('The User Interface', () => {
  it('Renders an input field', () => {
    render(<App />);
    const commandInput = screen.getByLabelText(/enter a command/i);
    expect(commandInput).toBeInTheDocument();
  });
  it('Notifies a user of invalid commands', async () => {
    render(<App />);
    const commandInput = screen.getByLabelText(/enter a command/i);

    const submitButton = await screen.findByText(/Go/i);

    fireEvent.change(commandInput, { target: { value: 'invalid()' } });

    fireEvent.click(submitButton);

    const logline = await screen.findByText(/Invalid command provided/i);

    expect(logline).toBeInTheDocument();
  });
  it('Can execute commands and provide visual confirmation', async () => {
    render(<App />);
    const commandInput = screen.getByLabelText(/enter a command/i);

    const submitButton = await screen.findByText(/Go/i);

    fireEvent.change(commandInput, { target: { value: 'place(0, 0, EAST)' } });

    fireEvent.click(submitButton);

    const logline = await screen.findByText(
      /Successfully executed command PLACE()/i,
    );

    expect(logline).toBeInTheDocument();
  });
  it('Can show a visual representation of the table', async () => {
    render(<App />);
    const toggleTableSwitch = screen.getByRole('checkbox');
    fireEvent.click(toggleTableSwitch);

    const commandInput = screen.getByLabelText(/enter a command/i);

    const submitButton = await screen.findByText(/Go/i);

    fireEvent.change(commandInput, { target: { value: 'place(0, 0, EAST)' } });

    fireEvent.click(submitButton);

    const logline = await screen.findByText(
      /Successfully executed command PLACE()/i,
    );

    const robot = screen.getByText('🤖');

    expect(logline).toBeInTheDocument();
    expect(robot).toBeInTheDocument();
  });
});

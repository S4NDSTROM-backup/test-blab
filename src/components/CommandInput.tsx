import { Button, TextField } from '@mui/material';
import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { AppReducerAction } from '../reducers/commandReducer';
import validateCommands from '../utils/validateCommands';

interface Props {
  dispatch: Dispatch<AppReducerAction>;
}

const CommandInput = ({ dispatch }: Props) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    dispatch(validateCommands(input));
  };

  return (
    <>
      <CommandContainer>
        <TextField
          id="command-input"
          label="Enter a command"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button onClick={handleSubmit} variant="outlined">
          Go
        </Button>
      </CommandContainer>
    </>
  );
};

const CommandContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

export default CommandInput;

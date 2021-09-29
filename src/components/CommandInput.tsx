import { Button, TextField } from '@mui/material';
import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { Direction, RobotAction, RobotState } from '../reducers/commandReducer';

interface Props {
  dispatch: Dispatch<RobotAction>;
  state: RobotState;
}

const CommandInput = ({ dispatch, state }: Props) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const place = /(place)\((\d+), (\d+), (NORTH|SOUTH|EAST|WEST)\)/i;

    const move = /(move)\(\)/i;

    const left = /(left)\(\)/i;

    const right = /(right)\(\)/i;

    const report = /(report)\(\)/i;

    const inputCommand = input.match(place);

    if (inputCommand) {
      dispatch({
        type: 'PLACE',
        payload: {
          position: {
            x: parseInt(inputCommand[2], 10),
            y: parseInt(inputCommand[3], 10),
          },
          facing: inputCommand[4] as Direction,
        },
      });
    }
    const leftCommand = input.match(left);

    if (leftCommand) {
      dispatch({
        type: 'LEFT',
      });
    }
    const rightCommand = input.match(right);

    if (rightCommand) {
      dispatch({
        type: 'RIGHT',
      });
    }

    const moveCommand = input.match(move);

    if (moveCommand) {
      dispatch({
        type: 'MOVE',
      });
    }
    const reportCommand = input.match(report);

    if (reportCommand) {
      console.log(state);
    }
  };
  return (
    <>
      <CommandContainer>
        <TextField value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={handleSubmit} variant="outlined">
          Go
        </Button>
      </CommandContainer>
      <p>{input}</p>
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

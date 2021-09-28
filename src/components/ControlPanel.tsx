import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { Direction, RobotAction } from '../reducers/robotReducer';

interface Props {
  dispatch: Dispatch<RobotAction>;
}

const ControlPanel = ({ dispatch }: Props) => {
  return (
    <StyledActionContainer>
      <StyledButtonContainer>
        <Place dispatch={dispatch} />
      </StyledButtonContainer>

      <StyledButtonContainer>
        <Button variant="contained">Move()</Button>
      </StyledButtonContainer>

      <StyledButtonContainer>
        <Button variant="contained">Left()</Button>
      </StyledButtonContainer>

      <StyledButtonContainer>
        <Button variant="contained">Right()</Button>
      </StyledButtonContainer>

      <StyledButtonContainer>
        <Button variant="contained">Report()</Button>
      </StyledButtonContainer>
    </StyledActionContainer>
  );
};

const Place = ({ dispatch }: Props) => {
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [facing, setFacing] = useState('');

  return (
    <div>
      <TextField
        type="number"
        value={yInput}
        onChange={(e) => setYInput(e.target.value)}
        variant="standard"
        label="y"
      />
      <TextField
        type="number"
        value={xInput}
        onChange={(e) => setXInput(e.target.value)}
        variant="standard"
        label="x"
      />
      <TextField
        type="text"
        value={facing}
        onChange={(e) => setFacing(e.target.value)}
        variant="standard"
        label="facing"
      />
      <Button
        variant="contained"
        onClick={() =>
          dispatch({
            type: 'PLACE',
            payload: {
              position: { x: parseInt(xInput, 10), y: parseInt(yInput, 10) },
              facing: facing as unknown as Direction,
            },
          })
        }
      >
        Place()
      </Button>
    </div>
  );
};

const StyledActionContainer = styled.div`
  border: 1px solid;
`;

const StyledButtonContainer = styled.div`
  border: 1px solid;
  padding: 40px;
`;

export default ControlPanel;

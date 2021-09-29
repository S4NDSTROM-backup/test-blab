import React, { useEffect, useReducer } from 'react';
import { Container, CssBaseline, Paper } from '@mui/material';
import styled from 'styled-components';

import robotReducer, { initialRobotState } from './reducers/commandReducer';
import Table from './components/Table';
import CommandInput from './components/CommandInput';

function App() {
  const [robotState, dispatch] = useReducer(robotReducer, initialRobotState);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('robotState', robotState.position);
  }, [robotState]);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper>
          <TableContainer>
            <p>robot stuff</p>
            <Table position={robotState.position} table={robotState.table} />
            <CommandInput state={robotState} dispatch={dispatch} />
            {/* <ControlPanel dispatch={dispatch} /> */}
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

export default App;

import React, { useEffect, useReducer } from 'react';
import { Container, CssBaseline, Paper } from '@mui/material';
import styled from 'styled-components';

import robotReducer, { initialRobotState } from './reducers/robotReducer';
import Table from './components/Table';
import ControlPanel from './components/ControlPanel';

function App() {
  const [robotState, dispatch] = useReducer(robotReducer, initialRobotState);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('robotState', robotState);
  }, [robotState]);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper>
          <TableContainer>
            <p>robot stuff</p>
            <Table position={robotState.position} table={robotState.table} />
            <ControlPanel dispatch={dispatch} />
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

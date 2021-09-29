import React, { useEffect, useReducer } from 'react';
import { Container, CssBaseline, Paper } from '@mui/material';
import styled from 'styled-components';

import robotReducer, { initialAppState } from './reducers/commandReducer';
import Table from './components/Table';
import CommandInput from './components/CommandInput';

function App() {
  const [appState, dispatch] = useReducer(robotReducer, initialAppState);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('appState', appState.position);
  }, [appState]);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper>
          <TableContainer>
            <p>robot stuff</p>
            {appState.position && (
              <Table position={appState.position} table={appState.table} />
            )}
            <CommandInput state={appState} dispatch={dispatch} />
          </TableContainer>
          <div>
            Logs:
            {appState.logs.map((log) => {
              return <p>{log}</p>;
            })}
          </div>
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

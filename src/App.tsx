import React, { useEffect, useReducer, useState, useRef } from 'react';
import {
  Container,
  CssBaseline,
  FormControlLabel,
  Paper,
  Switch,
} from '@mui/material';
import styled from 'styled-components';

import robotReducer, { initialAppState } from './reducers/commandReducer';
import Table from './components/Table';
import CommandInput from './components/CommandInput';
import LogDisplay from './components/LogDisplay';

function App() {
  const [appState, dispatch] = useReducer(robotReducer, initialAppState);

  const [showTable, setShowTable] = useState(false);

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
            <FormControlLabel
              control={<Switch onClick={() => setShowTable(!showTable)} />}
              label="Visual"
            />
            {showTable && (
              <Table position={appState.position} table={appState.table} />
            )}
            <CommandInput dispatch={dispatch} />
            <LogDisplay logs={appState.logs} />
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
  padding: 50px;
`;

export default App;

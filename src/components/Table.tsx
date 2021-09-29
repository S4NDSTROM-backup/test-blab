import React from 'react';
import styled from 'styled-components';
import { Cell, TableData } from '../reducers/commandReducer';
import Row from './Row';

interface Props {
  table: TableData;
  position: Cell;
}

const Table = ({ table, position }: Props) => {
  return (
    <TableContainer>
      {table.map((row) => {
        return (
          <Row key={`row-${row[0].x}`} robotPosition={position} squares={row} />
        );
      })}
    </TableContainer>
  );
};

const TableContainer = styled.div`
  display: flex;
`;

export default Table;

import { TableData } from '../types';

const generateTable = (rowCount: number, columnCount: number): TableData => {
  const table: TableData = [];

  for (let i = 0; i < rowCount; i += 1) {
    const row = [];
    for (let j = 0; j < columnCount; j += 1) {
      row.unshift({ y: j, x: i });
    }
    table.push(row);
  }
  return table;
};

export default generateTable;

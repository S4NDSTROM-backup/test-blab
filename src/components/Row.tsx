import React from 'react';
import styled from 'styled-components';
import { Cell } from '../reducers/robotReducer';
import Square from './Square';

interface Props {
  squares: Cell[];
  robotPosition: Cell;
}

const Row = ({ squares, robotPosition }: Props) => {
  console.log('stuff', squares, robotPosition);
  return (
    <div>
      {squares.map((square) => {
        const cellContent =
          square.x === robotPosition.x && square.y === robotPosition.y
            ? '🤖'
            : `y: ${square.y} x: ${square.x}`;

        return <Square key={`${square.y} ${square.x}`}>{cellContent}</Square>;
      })}
    </div>
  );
};
export default Row;

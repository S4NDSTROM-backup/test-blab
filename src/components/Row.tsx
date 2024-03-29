import React from 'react';
import { Cell } from '../types';
import Square from './Square';

interface Props {
  squares: Cell[];
  robotPosition: Cell | null;
}

const Row = ({ squares, robotPosition }: Props) => {
  return (
    <div>
      {squares.map((square) => {
        const cellContent =
          square.x === robotPosition?.x && square.y === robotPosition.y && '🤖';

        return <Square key={`${square.y} ${square.x}`}>{cellContent}</Square>;
      })}
    </div>
  );
};
export default Row;

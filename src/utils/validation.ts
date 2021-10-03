/* eslint-disable import/prefer-default-export */
import { Cell } from '../types';

export const isValidPosition = (
  position: Cell | null,
  rowCount: number,
  columnCount: number,
) => {
  return !(
    !position ||
    position.y > rowCount - 1 ||
    position.x > columnCount - 1 ||
    position.y < 0 ||
    position.x < 0
  );
};

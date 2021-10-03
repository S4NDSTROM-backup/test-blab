export type TableData = Cell[][];

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export interface Cell {
  x: number;
  y: number;
}

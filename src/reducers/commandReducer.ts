import { rowCount, columnCount } from '../config';

export interface Cell {
  x: number;
  y: number;
}

export type TableData = Cell[][];

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

const directions: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

const generateTable = () => {
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

export const initialRobotState: RobotState = {
  table: generateTable(),
  hasErrors: false,
  pristine: true,
  position: { y: 0, x: 0 },
  facing: 'NORTH',
};

export interface RobotState {
  table: TableData;
  hasErrors: boolean;
  pristine: boolean;
  position: Cell;
  facing: Direction;
}

export type RobotAction =
  | { type: 'PLACE'; payload: { position: Cell; facing: Direction } }
  | { type: 'MOVE' }
  | { type: 'LEFT' }
  | { type: 'RIGHT' }
  | { type: 'REPORT' };

const calculateNewPosition = (
  facing: Direction,
  currentPosition: Cell,
): Cell => {
  const newPosition = { ...currentPosition };
  switch (facing) {
    case 'NORTH':
      newPosition.y = currentPosition.y + 1;
      break;
    case 'EAST':
      newPosition.x = currentPosition.x + 1;
      break;
    case 'SOUTH':
      newPosition.y = currentPosition.y - 1;
      break;
    case 'WEST':
      newPosition.x = currentPosition.x - 1;
      break;

    default:
      throw new Error('Invalid direction provided');
  }
  if (
    newPosition.y > rowCount - 1 ||
    newPosition.x > columnCount - 1 ||
    newPosition.y < 0 ||
    newPosition.x < 0
  )
    return currentPosition;

  return newPosition;
};

const commandReducer = (state: RobotState, action: RobotAction): RobotState => {
  switch (action.type) {
    case 'PLACE': {
      return {
        ...state,
        position: action.payload.position,
        facing: action.payload.facing,
      };
    }
    case 'MOVE': {
      return {
        ...state,
        position: calculateNewPosition(state.facing, state.position),
      };
    }
    case 'LEFT': {
      const arrayIndex = directions.findIndex(
        (element) => element === state.facing,
      );

      return {
        ...state,
        facing:
          directions[arrayIndex === 0 ? directions.length - 1 : arrayIndex - 1],
      };
    }
    case 'RIGHT': {
      return {
        ...state,
        facing:
          directions[
            (directions.findIndex((element) => element === state.facing) + 1) %
              directions.length
          ],
      };
    }
    case 'REPORT': {
      return {
        ...state,
      };
    }

    default:
      throw new Error('Invalid action provided to robotReducer');
  }
};

export default commandReducer;

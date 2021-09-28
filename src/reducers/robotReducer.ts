// import validateCart from '../services/validateCart';
export enum Direction {
  North,
  East,
  South,
  West,
}
export interface Cell {
  x: number;
  y: number;
}

export type TableData = Cell[][];

const rowCount = 5;
const squareCount = 5;

const generateTable = () => {
  const table: TableData = [];

  for (let i = 0; i < rowCount; i += 1) {
    const row = [];
    for (let j = 0; j < squareCount; j += 1) {
      row.unshift({ y: j, x: i });
    }
    table.push(row);
  }
  return table;
};

export const initialRobotState: RobotState = {
  errors: [],
  table: generateTable(),
  hasErrors: false,
  pristine: true,
  position: { y: 0, x: 0 },
  facing: Direction.South,
};

interface RobotState {
  errors: [];
  table: TableData;
  hasErrors: boolean;
  pristine: boolean;
  position: { y: number; x: number };
  facing: Direction;
}

export type RobotAction =
  | { type: 'PLACE'; payload: { position: Cell; facing: Direction } }
  | { type: 'MOVE' }
  | { type: 'LEFT' }
  | { type: 'RIGHT' }
  | { type: 'REPORT' };

const robotReducer = (state: RobotState, action: RobotAction) => {
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
      };
    }
    case 'LEFT': {
      return {
        ...state,
        direction: state.facing - 1,
      };
    }
    case 'RIGHT': {
      return {
        ...state,
        direction: state.facing + 1,
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

export default robotReducer;

// place(x, y, facing): x and y are integers that relate to a location on the grid. Values that are outside the boundary of the grid should not be allowed. facing is a string referencing the direction the robot is facing. Values NORTH, SOUTH, EAST or WEST are allowed.
// move(): Moves the robot 1 grid unit in the direction it is facing unless that movement will cause the robot to fall off the grid.
// left(): Rotate the robot 90° anticlockwise/counterclockwise.
// right(): Rotate the robot 90° clockwise.
// report(): Outputs the robot's current grid location and facing direction.

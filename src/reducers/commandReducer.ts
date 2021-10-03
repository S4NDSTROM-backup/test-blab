import { rowCount, columnCount } from '../config';
import { Cell, Direction, TableData } from '../types';
import generateTable from '../utils/generateTable';
import getTimeStamp from '../utils/getTimeStamp';
import { isValidPosition } from '../utils/validation';

export interface AppState {
  table: TableData;
  isPlaced: boolean;
  position: Cell | null;
  facing: Direction;
  logs: string[];
}

export type AppReducerAction =
  | { type: 'PLACE'; payload: { position: Cell; facing: Direction } }
  | { type: 'MOVE' }
  | { type: 'LEFT' }
  | { type: 'RIGHT' }
  | { type: 'REPORT' }
  | { type: 'ERROR' };

const directions: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export const initialAppState: AppState = {
  table: generateTable(rowCount, columnCount),
  isPlaced: false,
  position: null,
  facing: 'NORTH',
  logs: [],
};

export const calculateNewPosition = (
  facing: Direction,
  currentPosition: Cell | null,
) => {
  if (currentPosition === null) return currentPosition;

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
  return newPosition;
};

const commandReducer = (
  state: AppState,
  action: AppReducerAction,
): AppState => {
  switch (action.type) {
    case 'PLACE': {
      if (!isValidPosition(action.payload.position, rowCount, columnCount)) {
        return {
          ...state,
          logs: [
            ...state.logs,
            `${getTimeStamp()}: Out of range position provided to command PLACE()`,
          ],
        };
      }
      return {
        ...state,
        position: action.payload.position,
        logs: [
          ...state.logs,
          `${getTimeStamp()}: Successfully executed command PLACE()`,
        ],
        isPlaced: true,
        facing: action.payload.facing,
      };
    }
    case 'MOVE': {
      if (!state.isPlaced) {
        return {
          ...state,
          logs: [
            ...state.logs,
            `${getTimeStamp()}: Failed to execute command MOVE()`,
          ],
        };
      }

      const newPosition = calculateNewPosition(state.facing, state.position);

      if (!isValidPosition(newPosition, rowCount, columnCount)) {
        return {
          ...state,
          logs: [
            ...state.logs,
            `${getTimeStamp()}: Out of range position provided to command PLACE()`,
          ],
        };
      }
      return {
        ...state,
        logs: [
          ...state.logs,
          `${getTimeStamp()}: Successfully executed command MOVE()`,
        ],
        position: newPosition,
      };
    }
    case 'LEFT': {
      if (!state.isPlaced) {
        return {
          ...state,
          logs: [
            ...state.logs,
            `${getTimeStamp()}: Failed to execute command LEFT()`,
          ],
        };
      }

      const arrayIndex = directions.findIndex(
        (element) => element === state.facing,
      );

      return {
        ...state,
        logs: [
          ...state.logs,
          `${getTimeStamp()}}: Successfully executed command LEFT()`,
        ],
        facing:
          directions[arrayIndex === 0 ? directions.length - 1 : arrayIndex - 1],
      };
    }
    case 'RIGHT': {
      if (!state.isPlaced) {
        return {
          ...state,
          logs: [
            ...state.logs,
            `${getTimeStamp()}: Failed to execute command RIGHT()`,
          ],
        };
      }
      return {
        ...state,
        logs: [
          ...state.logs,
          `${getTimeStamp()}}: Successfully executed command RIGHT()`,
        ],
        facing:
          directions[
            (directions.findIndex((element) => element === state.facing) + 1) %
              directions.length
          ],
      };
    }
    case 'REPORT': {
      if (!state.isPlaced) {
        return {
          ...state,
          logs: [
            ...state.logs,
            `${getTimeStamp()}: Failed to execute command REPORT()`,
          ],
        };
      }
      return {
        ...state,
        logs: [
          ...state.logs,
          `${getTimeStamp()}}: Successfully executed command REPORT()`,
          `${getTimeStamp()}}: Report: ${state.position?.x}, ${
            state.position?.y
          } ${state.facing}`,
        ],
      };
    }
    case 'ERROR': {
      return {
        ...state,
        logs: [...state.logs, `${getTimeStamp()}: Invalid command provided`],
      };
    }

    default:
      throw new Error('Invalid action');
  }
};

export default commandReducer;

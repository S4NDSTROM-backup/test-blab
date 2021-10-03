import { Direction } from '../types';
import commandReducer, {
  AppReducerAction,
  AppState,
  calculateNewPosition,
} from './commandReducer';

const mockState: AppState = {
  table: [
    [
      { y: 4, x: 0 },
      { y: 3, x: 0 },
      { y: 2, x: 0 },
      { y: 1, x: 0 },
      { y: 0, x: 0 },
    ],
    [
      { y: 4, x: 1 },
      { y: 3, x: 1 },
      { y: 2, x: 1 },
      { y: 1, x: 1 },
      { y: 0, x: 1 },
    ],
    [
      { y: 4, x: 2 },
      { y: 3, x: 2 },
      { y: 2, x: 2 },
      { y: 1, x: 2 },
      { y: 0, x: 2 },
    ],
    [
      { y: 4, x: 3 },
      { y: 3, x: 3 },
      { y: 2, x: 3 },
      { y: 1, x: 3 },
      { y: 0, x: 3 },
    ],
    [
      { y: 4, x: 4 },
      { y: 3, x: 4 },
      { y: 2, x: 4 },
      { y: 1, x: 4 },
      { y: 0, x: 4 },
    ],
  ],
  isPlaced: false,
  position: null,
  facing: 'NORTH',
  logs: [],
};

describe('The commandReducer', () => {
  it('Throws error if called with invalid action', () => {
    expect(() =>
      commandReducer(mockState, {
        type: 'INVALID_ACTION',
        payload: {},
      } as unknown as AppReducerAction),
    ).toThrow('Invalid action');
  });
  it('Can place the robot', () => {
    const result = commandReducer(mockState, {
      type: 'PLACE',
      payload: {
        position: {
          x: 2,
          y: 2,
        },
        facing: 'SOUTH',
      },
    });
    expect(result).toEqual({
      ...mockState,
      facing: 'SOUTH',
      isPlaced: true,
      logs: [expect.any(String)],
      position: {
        x: 2,
        y: 2,
      },
    });
    expect(result.logs[0]).toContain('Successfully executed command PLACE()');
  });
  it('Can not place the robot outside of table', () => {
    const result = commandReducer(mockState, {
      type: 'PLACE',
      payload: {
        position: {
          x: 10,
          y: -5,
        },
        facing: 'NORTH',
      },
    });
    expect(result).toEqual({
      ...mockState,
      facing: 'NORTH',
      isPlaced: false,
      logs: [expect.any(String)],
      position: null,
    });
    expect(result.logs[0]).toContain(
      'Out of range position provided to command PLACE()',
    );
  });
  it('Can not rotate the robot to the left before it is placed', () => {
    const result = commandReducer(mockState, {
      type: 'LEFT',
    });
    expect(result).toEqual({
      ...mockState,
      logs: [expect.any(String)],
    });
    expect(result.logs[0]).toContain('Failed to execute command LEFT()');
  });
  it('Can rotate the robot to the left if robot has been placed', () => {
    const result = commandReducer(
      { ...mockState, isPlaced: true, position: { y: 0, x: 0 } },
      {
        type: 'LEFT',
      },
    );
    expect(result).toEqual({
      ...mockState,
      facing: 'WEST',
      isPlaced: true,
      logs: [expect.any(String)],
      position: {
        x: 0,
        y: 0,
      },
    });
    expect(result.logs[0]).toContain('Successfully executed command LEFT()');
  });
  it('Can not rotate the robot to the right before it is placed', () => {
    const result = commandReducer(mockState, {
      type: 'RIGHT',
    });
    expect(result).toEqual({
      ...mockState,
      logs: [expect.any(String)],
    });
    expect(result.logs[0]).toContain('Failed to execute command RIGHT()');
  });
  it('Can rotate the robot to the right if robot has been placed', () => {
    const result = commandReducer(
      { ...mockState, isPlaced: true, position: { y: 0, x: 0 } },
      {
        type: 'RIGHT',
      },
    );
    expect(result).toEqual({
      ...mockState,
      facing: 'EAST',
      isPlaced: true,
      logs: [expect.any(String)],
      position: {
        x: 0,
        y: 0,
      },
    });
    expect(result.logs[0]).toContain('Successfully executed command RIGHT()');
  });
  it('Can not move the robot before it has been placed', () => {
    const result = commandReducer(mockState, {
      type: 'MOVE',
    });
    expect(result).toEqual({
      ...mockState,
      logs: [expect.any(String)],
    });
    expect(result.logs[0]).toContain('Failed to execute command MOVE()');
  });
  it('Can move the robot after it has been placed', () => {
    const result = commandReducer(
      { ...mockState, isPlaced: true, position: { y: 0, x: 0 } },
      {
        type: 'MOVE',
      },
    );
    expect(result).toEqual({
      ...mockState,
      isPlaced: true,
      logs: [expect.any(String)],
      position: {
        x: 0,
        y: 1,
      },
    });
    expect(result.logs[0]).toContain('Successfully executed command MOVE()');
  });
  it('Can not move the robot off the table', () => {
    const result = commandReducer(
      {
        ...mockState,
        facing: 'SOUTH',
        isPlaced: true,
        position: { y: 0, x: 0 },
      },
      {
        type: 'MOVE',
      },
    );
    expect(result).toEqual({
      ...mockState,
      isPlaced: true,
      facing: 'SOUTH',
      logs: [expect.any(String)],
      position: {
        x: 0,
        y: 0,
      },
    });
    expect(result.logs[0]).toContain(
      'Out of range position provided to command PLACE()',
    );
  });
  it('Can report current position', () => {
    const result = commandReducer(
      {
        ...mockState,
        isPlaced: true,
        position: { y: 0, x: 0 },
      },
      {
        type: 'REPORT',
      },
    );
    expect(result).toEqual({
      ...mockState,
      isPlaced: true,
      logs: [expect.any(String), expect.any(String)],
      position: {
        x: 0,
        y: 0,
      },
    });
    expect(result.logs[0]).toContain('Successfully executed command REPORT()');
    expect(result.logs[1]).toContain('Report: 0, 0 NORTH');
  });
  it('Does not report position before robot is placed', () => {
    const result = commandReducer(
      {
        ...mockState,
      },
      {
        type: 'REPORT',
      },
    );
    expect(result).toEqual({
      ...mockState,
      logs: [expect.any(String)],
    });
    expect(result.logs[0]).toContain('Failed to execute command REPORT()');
  });
  it('ERROR stuff', () => {
    const result = commandReducer(
      {
        ...mockState,
      },
      {
        type: 'ERROR',
      },
    );
    expect(result).toEqual({
      ...mockState,
      logs: [expect.any(String)],
    });
    expect(result.logs[0]).toContain('Invalid command provided');
  });
});

describe('The calculateNewPosition function', () => {
  it('Moves north if facing north', () => {
    const result = calculateNewPosition('NORTH', { y: 2, x: 2 });
    expect(result).toEqual({ x: 2, y: 3 });
  });
  it('Moves south if facing south', () => {
    const result = calculateNewPosition('SOUTH', { y: 2, x: 2 });
    expect(result).toEqual({ x: 2, y: 1 });
  });
  it('Moves east if facing east', () => {
    const result = calculateNewPosition('EAST', { y: 2, x: 2 });
    expect(result).toEqual({ x: 3, y: 2 });
  });
  it('Moves west if facing west', () => {
    const result = calculateNewPosition('WEST', { y: 2, x: 2 });
    expect(result).toEqual({ x: 1, y: 2 });
  });
  it('Throws error if called with invalid direction', () => {
    expect(() =>
      calculateNewPosition('LEFT' as Direction, { y: 2, x: 2 }),
    ).toThrow('Invalid direction provided');
  });
});

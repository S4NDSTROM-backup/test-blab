import validateCommands from './validateCommands';

describe('The command validator', () => {
  it('Returns INPUT reducer action for valid place() command', () => {
    const result = validateCommands('place(1, 1, NORTH)');
    expect(result).toEqual({
      payload: { facing: 'NORTH', position: { x: 1, y: 1 } },
      type: 'PLACE',
    });
  });
  it('Returns ERROR reducer action for invalid place() command', () => {
    const result = validateCommands('place(a, b, NORTH)');
    expect(result).toEqual({
      type: 'ERROR',
    });
  });
  it('Returns LEFT reducer action for valid left() command', () => {
    const result = validateCommands('left()');
    expect(result).toEqual({
      type: 'LEFT',
    });
  });
  it('Returns RIGHT reducer action for valid right() command', () => {
    const result = validateCommands('right()');
    expect(result).toEqual({
      type: 'RIGHT',
    });
  });
  it('Returns MOVE reducer action for valid move() command', () => {
    const result = validateCommands('move()');
    expect(result).toEqual({
      type: 'MOVE',
    });
  });
  it('Returns REPORT reducer action for valid report() command', () => {
    const result = validateCommands('report()');
    expect(result).toEqual({
      type: 'REPORT',
    });
  });
});

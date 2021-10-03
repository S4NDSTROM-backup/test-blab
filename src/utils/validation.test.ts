import { isValidPosition } from './validation';

describe('The position validator', () => {
  it('Returns true for valid positions', () => {
    const result = isValidPosition({ x: 2, y: 2 }, 5, 5);
    expect(result).toEqual(true);
  });
  it('Returns false if both values are out of range values', () => {
    const result = isValidPosition({ x: 5, y: 5 }, 5, 5);
    expect(result).toEqual(false);
  });
  it('Returns false if x position is out of range values', () => {
    const result = isValidPosition({ x: 5, y: 1 }, 5, 5);
    expect(result).toEqual(false);
  });
  it('Returns false if y position is out of range values', () => {
    const result = isValidPosition({ x: 1, y: 5 }, 5, 5);
    expect(result).toEqual(false);
  });
});

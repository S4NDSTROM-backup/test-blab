import { AppReducerAction } from '../reducers/commandReducer';
import { Direction } from '../types';

const commandValidation = {
  place: /(place)\((\d+), (\d+), (NORTH|SOUTH|EAST|WEST)\)/i,
  move: /(move)\(\)/i,
  left: /(left)\(\)/i,
  right: /(right)\(\)/i,
  report: /(report)\(\)/i,
};

const validateCommands = (input: string): AppReducerAction => {
  const inputCommand = input.match(commandValidation.place);

  if (inputCommand) {
    return {
      type: 'PLACE',
      payload: {
        position: {
          x: parseInt(inputCommand[2], 10),
          y: parseInt(inputCommand[3], 10),
        },
        facing: inputCommand[4] as Direction,
      },
    };
  }
  const leftCommand = input.match(commandValidation.left);

  if (leftCommand) {
    return {
      type: 'LEFT',
    };
  }
  const rightCommand = input.match(commandValidation.right);

  if (rightCommand) {
    return {
      type: 'RIGHT',
    };
  }

  const moveCommand = input.match(commandValidation.move);

  if (moveCommand) {
    return {
      type: 'MOVE',
    };
  }
  const reportCommand = input.match(commandValidation.report);

  if (reportCommand) {
    return {
      type: 'REPORT',
    };
  }

  return {
    type: 'ERROR',
  };
};

export default validateCommands;

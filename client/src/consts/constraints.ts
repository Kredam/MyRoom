import { elapsedYears } from 'utils';

export const DATE = {
  required: true,
  validate: elapsedYears
};

export const ROOM = {
  NAME: {
    required: true,
    maxLength: 200
  },
  DESCRIPTION: {
    // required: true
  }
};

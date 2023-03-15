import moment from 'moment';

export const elapsedYears = (value: any): boolean => {
  const ms = moment().diff(moment(value));
  const elapsedYears = moment.duration(ms).years();
  return elapsedYears >= 18;
};

import dayjs from 'dayjs';

export const validateCooldown = (lastRunDate: Date, seconds: number = 86400) =>
  dayjs().diff(lastRunDate, 's', true) > seconds;

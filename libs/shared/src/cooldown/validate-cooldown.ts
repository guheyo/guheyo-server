import dayjs from '@lib/shared/dayjs/dayjs-config';

export const validateCooldown = (lastRunDate: Date, seconds: number = 86400) =>
  dayjs().diff(lastRunDate, 's', true) > seconds;

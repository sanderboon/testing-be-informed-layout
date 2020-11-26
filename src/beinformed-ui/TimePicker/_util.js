// @flow
import { addMinutes, isToday } from "date-fns";

import { TimestampUtil } from "beinformed/utils/datetime/DateTimeUtil";

// add zero to input
const leftPadWithZero = (input: number): string => ("0" + input).slice(-2);

// get time strings array with 30 minute interval
const getTimeStrings = () => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  const timeStrings = [];

  while (isToday(date)) {
    const hours = leftPadWithZero(TimestampUtil.getHours(date));
    const minutes = leftPadWithZero(TimestampUtil.getMinutes(date));

    timeStrings.push(`${hours}:${minutes}`);

    date = addMinutes(date, 30);
  }

  return timeStrings;
};

export { getTimeStrings };

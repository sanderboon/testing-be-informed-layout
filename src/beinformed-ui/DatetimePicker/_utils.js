// @flow
import {
  DateUtil,
  TimestampUtil,
} from "beinformed/utils/datetime/DateTimeUtil";

const getWeeks = (date: string) => {
  const firstDayOfMonth = DateUtil.startOfMonth(date);
  const firstDayOfFirstWeek = DateUtil.startOfWeek(firstDayOfMonth);

  const WEEK_ROWS = 6;
  const DAYS_IN_WEEK = 7;
  const weeks = [];

  for (let i = 0; i < WEEK_ROWS; i++) {
    const week = DateUtil.addWeeks(firstDayOfFirstWeek, i);

    const days = [];
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      days.push(DateUtil.addDays(week, j));
    }

    weeks.push({
      number: DateUtil.getWeek(week),
      days,
    });
  }

  return weeks;
};

const getYears = (date: string) => {
  const DECADE_YEARS = 10;
  const MONTHS_IN_YEAR = 12;
  const CELLS_AROUND_YEARS = 3;

  const years = [];
  const year = parseInt(DateUtil.toFormat(date, "yyyy"), 10);
  const startYear = year - (year % DECADE_YEARS) - 1;

  for (
    let i = startYear;
    i < startYear + MONTHS_IN_YEAR;
    i += CELLS_AROUND_YEARS
  ) {
    const yearGroup = [];

    for (let j = i; j < parseInt(i, 10) + CELLS_AROUND_YEARS; j++) {
      yearGroup.push(j);
    }
    years.push(yearGroup);
  }

  return years;
};

const getDecades = (date: string) => {
  const YEARS_IN_CENTURY = 100;
  const YEARS_IN_DECADE = 10;
  const YEARS_IN_TABLE = 120;
  const YEARS_AROUND_CENTURY = 30;

  const decades = [];
  const year = parseInt(DateUtil.toFormat(date, "yyyy"), 10);
  const startDecade = year - (year % YEARS_IN_CENTURY) - YEARS_IN_DECADE;

  for (
    let i = startDecade;
    i < startDecade + YEARS_IN_TABLE;
    i += YEARS_AROUND_CENTURY
  ) {
    const decadeGroup = [];

    for (
      let j = i;
      j < parseInt(i, 10) + YEARS_AROUND_CENTURY;
      j += YEARS_IN_DECADE
    ) {
      decadeGroup.push(j);
    }
    decades.push(decadeGroup);
  }

  return decades;
};

const isOtherMonth = (date: string, currentDate: string) => {
  const beforeMonth = DateUtil.isBefore(
    date,
    DateUtil.startOfMonth(currentDate)
  );
  const afterMonth = DateUtil.isAfter(date, DateUtil.endOfMonth(currentDate));
  return beforeMonth || afterMonth;
};

/**
 * Calulates a new period based on a date, the direction and next or previous (period)
 */
const calcNewPeriod = (
  date: string,
  type: "decades" | "years" | "months" | "days",
  direction: "next" | "prev"
) => {
  const DECADE_YEARS = 120;
  const YEARS = 12;
  const YEAR = 1;
  const MONTH = 1;

  const calcMethods = {
    next: {
      decades: DateUtil.addYears(date, DECADE_YEARS),
      years: DateUtil.addYears(date, YEARS),
      months: DateUtil.addYears(date, YEAR),
      days: DateUtil.addMonths(date, MONTH),
    },
    prev: {
      decades: DateUtil.subtractYears(date, DECADE_YEARS),
      years: DateUtil.subtractYears(date, YEARS),
      months: DateUtil.subtractYears(date, YEAR),
      days: DateUtil.subtractMonths(date, MONTH),
    },
  };

  return calcMethods[direction][type];
};

/**
 * Label to render on the switch button of the datepicker toolbar
 */
const getToolbarSwitchLabel = (
  date: string,
  type: "decades" | "years" | "months" | "days"
) => {
  const CENTURY_YEARS = 100;
  const DECADE_YEARS = 10;

  const year = parseInt(DateUtil.toFormat(date, "yyyy"), 10);

  switch (type) {
    case "decades": {
      const startCentury = year - (year % CENTURY_YEARS);
      const endCentury = startCentury + CENTURY_YEARS;

      return `${startCentury} - ${endCentury}`;
    }
    case "years": {
      const startDecade = year - (year % DECADE_YEARS);
      const endDecade = startDecade + DECADE_YEARS;

      return `${startDecade} - ${endDecade}`;
    }
    case "months":
      return year;
    default:
      return DateUtil.toFormat(date, "MMMM yyyy");
  }
};

/**
 * Convert string date to iso date
 */
const toIso = (value: string, format: string) => {
  if (TimestampUtil.isValid(value, format)) {
    return TimestampUtil.toISO(value, format);
  }

  return TimestampUtil.now();
};

export {
  getWeeks,
  getYears,
  getDecades,
  isOtherMonth,
  calcNewPeriod,
  getToolbarSwitchLabel,
  toIso,
};

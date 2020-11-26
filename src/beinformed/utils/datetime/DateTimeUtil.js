// @flow
import {
  parse,
  format,
  isValid,
  isAfter,
  isBefore,
  isSameDay,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subSeconds,
  subMinutes,
  subHours,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  getHours,
  getMinutes,
  getDay,
  getWeek,
  setMilliseconds,
  setSeconds,
  setMinutes,
  setHours,
  setMonth,
  setYear,
  set,
} from "date-fns";
import { nl, enGB } from "date-fns/locale";

import { isNil, isDate } from "lodash";

import { getCookie } from "beinformed/utils/browser/Cookies";

export const ISO_DATE_FORMAT = "yyyy-MM-dd";
export const ISO_DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
export const ISO_TIME_FORMAT = "HH:mm:ss";
export const ISO_TIMESTAMP_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS";

class BaseDateTimeUtil {
  _isoFormat: string;

  constructor(isoFormat: string) {
    this._isoFormat = isoFormat;
  }

  getLocale(): typeof nl | typeof enGB {
    const locale = getCookie("locale") || "en";

    if (locale === "nl") {
      return nl;
    }

    return enGB;
  }

  toDate(date: string, inputFormat: string = this._isoFormat) {
    return parse(date, inputFormat, new Date(), {
      weekStartsOn: 1,
      firstWeekContainsDate: 1,
    });
  }

  toFormat(date: string | Date, targetFormat: string) {
    if (isDate(date)) {
      return format(date, targetFormat, {
        weekStartsOn: 1,
        locale: this.getLocale(),
      });
    }

    const parsedDate = this.toDate(date);

    if (isValid(parsedDate)) {
      return format(parsedDate, targetFormat, {
        weekStartsOn: 1,
        locale: this.getLocale(),
      });
    }

    return "Invalid Date";
  }

  toISO(date: string | Date, sourceFormat: string = this._isoFormat) {
    if (isDate(date)) {
      return format(date, this._isoFormat, { weekStartsOn: 1 });
    }

    const parsedDate = this.toDate(date, sourceFormat);

    if (isValid(parsedDate)) {
      return format(this.toDate(date, sourceFormat), this._isoFormat, {
        weekStartsOn: 1,
      });
    }

    return "Invalid Date";
  }

  now() {
    return this.toISO(new Date());
  }

  convertFormat(sourceFormat: string) {
    return sourceFormat ? sourceFormat : this._isoFormat;
  }

  /**
   * VALIDATION
   */
  hasFormat(date: string, sourceFormat: string) {
    return (
      isValid(this.toDate(date, sourceFormat)) &&
      format(this.toDate(date, sourceFormat), sourceFormat, {
        weekStartsOn: 1,
      }).replace(/0/gu, "") === date.replace(/0/gu, "")
    );
  }

  isValid(date: string, inputFormat?: string = this._isoFormat) {
    return isValid(this.toDate(date, inputFormat));
  }

  isAfter(
    inputDate: string,
    afterISODate: ?string,
    inputFormat?: string = this._isoFormat
  ) {
    return (
      !isNil(afterISODate) &&
      isAfter(this.toDate(inputDate, inputFormat), this.toDate(afterISODate))
    );
  }

  isSameOrAfter(
    inputDate: string,
    afterISODate: ?string,
    inputFormat?: string = this._isoFormat
  ) {
    return (
      !isNil(afterISODate) &&
      (this.isAfter(inputDate, afterISODate, inputFormat) ||
        this.isSame(inputDate, afterISODate, inputFormat))
    );
  }

  isBefore(
    inputDate: string,
    beforeISODate: ?string,
    inputFormat?: string = this._isoFormat
  ) {
    return (
      !isNil(beforeISODate) &&
      isBefore(this.toDate(inputDate, inputFormat), this.toDate(beforeISODate))
    );
  }

  isSameOrBefore(
    inputDate: string,
    beforeISODate: ?string,
    inputFormat?: string = this._isoFormat
  ): boolean {
    return (
      !isNil(beforeISODate) &&
      (this.isBefore(inputDate, beforeISODate, inputFormat) ||
        this.isSame(inputDate, beforeISODate, inputFormat))
    );
  }

  isSame(
    inputDate: string,
    compareDate: ?string,
    inputFormat?: string = this._isoFormat
  ) {
    return (
      !isNil(compareDate) &&
      this.toDate(inputDate, inputFormat).getTime() ===
        this.toDate(compareDate).getTime()
    );
  }

  isSameDay(
    inputDate: string,
    compareDate: string,
    inputFormat?: string = this._isoFormat
  ) {
    return (
      !isNil(compareDate) &&
      isSameDay(
        this.toDate(inputDate, inputFormat),
        this.toDate(compareDate, inputFormat)
      )
    );
  }

  isOther(
    inputDate: string,
    compareDate: ?string,
    inputFormat?: string = this._isoFormat
  ) {
    return !this.isSame(inputDate, compareDate, inputFormat);
  }

  isWeekend(inputDate: string) {
    const SATURDAY_NUMBER = 6;
    const SUNDAY_NUMBER = 0;
    const weekDay = getDay(this.toDate(inputDate));

    return weekDay === SATURDAY_NUMBER || weekDay === SUNDAY_NUMBER;
  }

  /**
   * CALCULATIONS
   */
  addSeconds(date: string, amount: number) {
    return this.toISO(addSeconds(this.toDate(date), amount));
  }

  addMinutes(date: string, amount: number) {
    return this.toISO(addMinutes(this.toDate(date), amount));
  }

  addHours(date: string, amount: number) {
    return this.toISO(addHours(this.toDate(date), amount));
  }

  addDays(date: string, amount: number) {
    return this.toISO(addDays(this.toDate(date), amount));
  }

  addWeeks(date: string, amount: number) {
    return this.toISO(addWeeks(this.toDate(date), amount));
  }

  addMonths(date: string, amount: number) {
    return this.toISO(addMonths(this.toDate(date), amount));
  }

  addYears(date: string, amount: number) {
    return this.toISO(addYears(this.toDate(date), amount));
  }

  subtractSeconds(date: string, amount: number) {
    return this.toISO(subSeconds(this.toDate(date), amount));
  }

  subtractMinutes(date: string, amount: number) {
    return this.toISO(subMinutes(this.toDate(date), amount));
  }

  subtractHours(date: string, amount: number) {
    return this.toISO(subHours(this.toDate(date), amount));
  }

  subtractDays(date: string, amount: number) {
    return this.toISO(subDays(this.toDate(date), amount));
  }

  subtractWeeks(date: string, amount: number) {
    return this.toISO(subWeeks(this.toDate(date), amount));
  }

  subtractMonths(date: string, amount: number) {
    return this.toISO(subMonths(this.toDate(date), amount));
  }

  subtractYears(date: string, amount: number) {
    return this.toISO(subYears(this.toDate(date), amount));
  }

  /**
   * GETTERS
   */
  startOfMonth(date: string, inputFormat: string = this._isoFormat) {
    return this.toISO(startOfMonth(this.toDate(date, inputFormat)));
  }

  endOfMonth(date: string, inputFormat: string = this._isoFormat) {
    return this.toISO(endOfMonth(this.toDate(date, inputFormat)));
  }

  startOfWeek(date: string, inputFormat: string = this._isoFormat) {
    return this.toISO(
      startOfWeek(this.toDate(date, inputFormat), {
        weekStartsOn: 1,
      })
    );
  }

  getHours(date: string | Date): number {
    const dateObject = isDate(date) ? date : this.toDate(date);

    return getHours(dateObject);
  }

  getMinutes(date: string | Date): number {
    const dateObject = isDate(date) ? date : this.toDate(date);

    return getMinutes(dateObject);
  }

  getWeek(date: string) {
    return getWeek(this.toDate(date), {
      weekStartsOn: 1,
      firstWeekContainsDate: 1,
    });
  }

  /**
   * SETTERS
   */
  setYear(date: string, year: number) {
    return this.toISO(setYear(this.toDate(date), year));
  }

  setMonth(date: string, month: number) {
    return this.toISO(setMonth(this.toDate(date), month));
  }

  setHour(date: string, hour: number) {
    return this.toISO(setHours(this.toDate(date), hour));
  }

  setMinute(date: string, minute: number) {
    return this.toISO(setMinutes(this.toDate(date), minute));
  }

  setSecond(date: string, second: number) {
    return this.toISO(setSeconds(this.toDate(date), second));
  }

  setMilliseconds(date: string, milliseconds: number) {
    return this.toISO(setMilliseconds(this.toDate(date), milliseconds));
  }

  setTime(
    date: string,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
  ) {
    return this.toISO(
      set(this.toDate(date), {
        hours,
        minutes,
        seconds,
        milliseconds,
      })
    );
  }
}

const DateUtil = new BaseDateTimeUtil(ISO_DATE_FORMAT);
const DateTimeUtil = new BaseDateTimeUtil(ISO_DATETIME_FORMAT);
const TimeUtil = new BaseDateTimeUtil(ISO_TIME_FORMAT);
const TimestampUtil = new BaseDateTimeUtil(ISO_TIMESTAMP_FORMAT);

export { DateUtil, DateTimeUtil, TimeUtil, TimestampUtil };

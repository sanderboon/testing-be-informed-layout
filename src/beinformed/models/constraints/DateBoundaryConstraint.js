// @flow
import { isNil, isString } from "lodash";
import {
  TimeUtil,
  DateUtil,
  TimestampUtil,
  DateTimeUtil,
} from "beinformed/utils/datetime/DateTimeUtil";

import { getSetting } from "beinformed/constants/Settings";

class DateBoundaryConstraint implements IConstraintModel {
  _type: "date" | "datetime" | "time" | "timestamp";
  _format: string;
  _minDate: ?string;
  _maxDate: ?string;

  constructor(
    type: "date" | "datetime" | "time" | "timestamp",
    minDate: ?string = null,
    maxDate: ?string = null,
    format: string = "yyyy-MM-dd"
  ) {
    this._type = type;
    this._format = format;
    this._minDate = minDate;
    this._maxDate = maxDate;
  }

  get type() {
    return this._type;
  }

  get id() {
    if (
      this.minDate !== null &&
      this.maxDate !== null &&
      this.minDate === this.maxDate
    ) {
      return "Constraint.Date.InexactDate";
    } else if (this.minDate !== null && this.maxDate !== null) {
      return "Constraint.Date.OutOfRange";
    } else if (this.minDate !== null) {
      return "Constraint.Date.BelowMinimum";
    } else if (this.maxDate !== null) {
      return "Constraint.Date.AboveMaximum";
    }

    return "Constraint.Date.NoBoundaryConstraint";
  }

  get format() {
    return this._format;
  }

  get minDate() {
    return this._minDate;
  }

  get maxDate() {
    return this._maxDate;
  }

  get defaultMessage() {
    switch (this.id) {
      case "Constraint.Date.InexactDate":
        return "Date must be precisely ${min-date}"; // NOSONAR
      case "Constraint.Date.OutOfRange":
        return "Must be between ${min-date} and ${max-date}"; // NOSONAR
      case "Constraint.Date.BelowMinimum":
        return "Must be on or after ${min-date}"; // NOSONAR
      case "Constraint.Date.AboveMaximum":
        return "Must be on or before ${max-date}"; // NOSONAR
      default:
        return "";
    }
  }

  get parameters() {
    const dateInputFormat = getSetting("DATE_INPUT_FORMAT");

    return {
      "min-date": this.minDate
        ? this.formatUtil.toFormat(this.minDate, dateInputFormat)
        : null,
      "max-date": this.maxDate
        ? this.formatUtil.toFormat(this.maxDate, dateInputFormat)
        : null,
    };
  }

  hasValidation() {
    return true;
  }

  isExactDate(value: string) {
    if (!isString(value)) {
      throw new TypeError("isBetweenDates: Not comparing to string");
    }

    if (this.minDate === null) {
      throw new Error("isExactDate: Min and max date not set");
    }

    return this.formatUtil.isSame(value, this.minDate, this.format);
  }

  isBetweenDates(value: string) {
    if (!isString(value)) {
      throw new TypeError("isBetweenDates: Not comparing to string");
    }

    if (this.minDate === null || this.maxDate === null) {
      throw new Error("isBetweenDate: Min or max date not set");
    }

    return (
      this.isSameOrAfterMinDate(value) && this.isSameOrBeforeMaxDate(value)
    );
  }

  isSameOrAfterMinDate(value: string) {
    if (!isString(value)) {
      throw new TypeError("isSameOrAfterMinDate: Not comparing to string");
    }

    if (isNil(this.minDate)) {
      throw new Error("isSameOrAfterMinDate: Min date not set");
    }

    return this.formatUtil.isSameOrAfter(value, this.minDate, this.format);
  }

  isSameOrBeforeMaxDate(value: string) {
    if (!isString(value)) {
      throw new TypeError("isSameOrBeforeMaxDate: Not comparing to string");
    }

    if (isNil(this.maxDate)) {
      throw new Error("isSameOrBeforeMaxDate: Max date not set");
    }

    return this.formatUtil.isSameOrBefore(value, this.maxDate, this.format);
  }

  get formatUtil() {
    switch (this.type) {
      case "time":
        return TimeUtil;
      case "timestamp":
        return TimestampUtil;
      case "datetime":
        return DateTimeUtil;
      default:
        return DateUtil;
    }
  }

  validate(value: string) {
    if (!isString(value)) {
      throw new TypeError("isNotEmptyString: Not comparing to string");
    }

    switch (this.id) {
      case "Constraint.Date.InexactDate":
        return this.isExactDate(value);
      case "Constraint.Date.OutOfRange":
        return this.isBetweenDates(value);
      case "Constraint.Date.BelowMinimum":
        return this.isSameOrAfterMinDate(value);
      case "Constraint.Date.AboveMaximum":
        return this.isSameOrBeforeMaxDate(value);
      default:
        return true;
    }
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default DateBoundaryConstraint;

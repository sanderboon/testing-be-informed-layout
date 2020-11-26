// @flow
import { TimeUtil } from "beinformed/utils/datetime/DateTimeUtil";

class DateTimeTimeFormatConstraint implements IConstraintModel {
  _format: string;

  constructor(format: string) {
    this._format = format;
  }

  get id() {
    return "Constraint.TimeFormat.InvalidFormat";
  }

  get format() {
    return this._format;
  }

  get formatLabel() {
    return this.format.toLowerCase();
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Time must be entered in the format ${format}"; // NOSONAR
  }

  get parameters() {
    return { format: this.formatLabel };
  }

  validate(value: string) {
    if (!value) {
      return false;
    }

    const timePart = value.includes(" ")
      ? value.substring(value.indexOf(" ") + 1)
      : value;

    return TimeUtil.hasFormat(timePart, this.format);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default DateTimeTimeFormatConstraint;

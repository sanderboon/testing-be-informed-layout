// @flow
import {
  TimestampUtil,
  DateTimeUtil,
} from "beinformed/utils/datetime/DateTimeUtil";

class DatetimeFormatConstraint implements IConstraintModel {
  _type: "datetime" | "timestamp";
  _format: string;

  constructor(type: "datetime" | "timestamp", format: string) {
    this._type = type;
    this._format = format;
  }

  get type() {
    return this._type;
  }

  get id() {
    return "Constraint.DateTime.MissingValue";
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
    return "Date and time should both be entered";
  }

  get parameters() {
    return { format: this.formatLabel };
  }

  get formatUtil() {
    switch (this.type) {
      case "timestamp":
        return TimestampUtil;
      default:
        return DateTimeUtil;
    }
  }

  validate(value: string) {
    if (!value) {
      return false;
    }

    return this.formatUtil.hasFormat(value, this.format);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default DatetimeFormatConstraint;

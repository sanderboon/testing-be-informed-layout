// @flow
import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

class DateTimeDateFormatConstraint implements IConstraintModel {
  _format: string;

  constructor(format: string) {
    this._format = format;
  }

  get id() {
    return "Constraint.DateFormat.InvalidFormat";
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
    return "Date must be entered in the format ${format}"; // NOSONAR
  }

  get parameters() {
    return { format: this.formatLabel };
  }

  validate(value: string) {
    if (!value) {
      return false;
    }

    const datePart = value.split(" ")[0];
    return DateUtil.hasFormat(datePart, this.format);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default DateTimeDateFormatConstraint;

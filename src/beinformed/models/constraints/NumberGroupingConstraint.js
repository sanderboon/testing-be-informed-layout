// @flow
import { isString } from "lodash";

import DecimalFormat from "beinformed/utils/number/DecimalFormat";

const DEFAULT_GROUPING_SIZE = 3;

class NumberGroupingConstraint implements IConstraintModel {
  _decimalSeparator: string;
  _groupingSeparator: string;
  _format: string;

  constructor(
    groupingSeparator: string = ",",
    decimalSeparator: string = ".",
    format: string = "0"
  ) {
    this._decimalSeparator = decimalSeparator;
    this._groupingSeparator = groupingSeparator;
    this._format = format;
  }

  get id() {
    return "Constraint.Number.GroupingSeparator";
  }

  get decimalSeparator() {
    return this._decimalSeparator;
  }

  get groupingSeparator() {
    return this._groupingSeparator;
  }

  get format() {
    return this._format;
  }

  get groupSize() {
    if (this.format) {
      const fromFormat = new DecimalFormat(this.format).comma;
      if (fromFormat > 0) {
        return fromFormat;
      }
    }

    return DEFAULT_GROUPING_SIZE;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Group divider '${group-divider}' must be correctly placed"; // NOSONAR
  }

  get parameters() {
    return { "group-divider": this.groupingSeparator };
  }

  hasCorrectGrouping(value: string) {
    if (!value.includes(this.groupingSeparator)) {
      return true;
    }

    let integer = value;
    if (this.decimalSeparator !== "" && value.includes(this.decimalSeparator)) {
      // decimal before grouping
      if (
        value.indexOf(this.decimalSeparator) <
        value.indexOf(this.groupingSeparator)
      ) {
        return false;
      }

      integer = value.substr(0, value.indexOf(this.decimalSeparator));
    }

    let groups = integer.split(this.groupingSeparator);

    // when the first item is smaller than group size, remove it from check
    if (groups[0].length < this.groupSize) {
      groups = groups.slice(1);
    }

    return groups.every((group) => group.length === this.groupSize);
  }

  validate(value: string | number) {
    return (
      this.groupingSeparator === "" ||
      !isString(value) ||
      !value.includes(this.groupingSeparator) ||
      this.hasCorrectGrouping(value)
    );
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default NumberGroupingConstraint;

// @flow
import { isNil } from "lodash";

import formatValue from "beinformed/utils/number/formatValue";
import parseToNumber from "beinformed/utils/number/parseToNumber";

class NumberBoundaryConstraint implements IConstraintModel {
  _minNumber: ?number;
  _maxNumber: ?number;
  _groupingSeparator: string;
  _decimalSeparator: string;
  _format: string;

  constructor(
    minNumber: ?number = null,
    maxNumber: ?number = null,
    groupingSeparator: string = ",",
    decimalSeparator: string = ".",
    format: string = ""
  ) {
    this._format = format;
    this._groupingSeparator = groupingSeparator;
    this._decimalSeparator = decimalSeparator;
    this._minNumber = minNumber;
    this._maxNumber = maxNumber;
  }

  get id() {
    if (
      this.minNumber !== null &&
      this.maxNumber !== null &&
      this.minNumber === this.maxNumber
    ) {
      return "Constraint.Number.InexactNumber";
    } else if (this.minNumber !== null && this.maxNumber !== null) {
      return "Constraint.Number.OutOfRange";
    } else if (this.minNumber !== null) {
      return "Constraint.Number.BelowMinimum";
    } else if (this.maxNumber !== null) {
      return "Constraint.Number.AboveMaximum";
    }

    return "Constraint.Number.NoBoundaryConstraint";
  }

  get minNumber() {
    return this._minNumber;
  }

  get maxNumber() {
    return this._maxNumber;
  }

  get format() {
    return this._format;
  }

  get groupingSeparator() {
    return this._groupingSeparator;
  }

  get decimalSeparator() {
    return this._decimalSeparator;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    switch (this.id) {
      case "Constraint.Number.InexactDate":
        return "Number must be precisely ${min-number}"; // NOSONAR
      case "Constraint.Number.OutOfRange":
        return "Must be between ${min-number} and ${max-number}"; // NOSONAR
      case "Constraint.Number.BelowMinimum":
        return "The number must be larger than ${min-number}"; // NOSONAR
      case "Constraint.Number.AboveMaximum":
        return "The number must be smaller than ${max-number}"; // NOSONAR
      default:
        return "";
    }
  }

  get parameters() {
    return {
      "min-number":
        this.minNumber === null
          ? null
          : formatValue(
              this.minNumber,
              this.format,
              this.groupingSeparator,
              this.decimalSeparator
            ),
      "max-number":
        this.maxNumber === null
          ? null
          : formatValue(
              this.maxNumber,
              this.format,
              this.groupingSeparator,
              this.decimalSeparator
            ),
    };
  }

  isExactNumber(value: string) {
    const parsedNumber = parseToNumber(
      value,
      this.groupingSeparator,
      this.decimalSeparator
    );
    return parsedNumber === this.minNumber;
  }

  isSameOrAboveMinNumber(value: string) {
    const parsedNumber = parseToNumber(
      value,
      this.groupingSeparator,
      this.decimalSeparator
    );

    if (isNaN(parsedNumber) || isNil(parsedNumber)) {
      return false;
    }

    return this.minNumber !== null && parsedNumber >= this.minNumber;
  }

  isSameOrBelowMaxNumber(value: string) {
    const parsedNumber = parseToNumber(
      value,
      this.groupingSeparator,
      this.decimalSeparator
    );

    if (isNaN(parsedNumber) || isNil(parsedNumber)) {
      return false;
    }

    return this.maxNumber !== null && parsedNumber <= this.maxNumber;
  }

  isBetweenNumbers(value: string) {
    return (
      this.isSameOrAboveMinNumber(value) && this.isSameOrBelowMaxNumber(value)
    );
  }

  validate(value: string) {
    switch (this.id) {
      case "Constraint.Number.InexactDate":
        return this.isExactNumber(value);
      case "Constraint.Number.OutOfRange":
        return this.isBetweenNumbers(value);
      case "Constraint.Number.BelowMinimum":
        return this.isSameOrAboveMinNumber(value);
      case "Constraint.Number.AboveMaximum":
        return this.isSameOrBelowMaxNumber(value);
      default:
        return true;
    }
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default NumberBoundaryConstraint;

// @flow
import { isString } from "lodash";

class StringLengthConstraint implements IConstraintModel {
  _minLength: number | null;
  _maxLength: number | null;

  constructor(minLength: number | null, maxLength: number | null) {
    this._minLength = minLength;
    this._maxLength = maxLength;
  }

  get id() {
    if (this.minLength && this.maxLength && this.minLength === this.maxLength) {
      return "Constraint.InvalidLengthExact";
    } else if (this.minLength && this.maxLength) {
      return "Constraint.InvalidLengthBetween";
    } else if (this.minLength) {
      return "Constraint.InvalidLengthTooShort";
    } else if (this.maxLength) {
      return "Constraint.InvalidLengthTooLong";
    }

    return "Constraint.NoLengthConstraint";
  }

  get minLength() {
    return this._minLength;
  }

  get maxLength() {
    return this._maxLength;
  }

  hasValidation() {
    return true;
  }

  isExactLength(value: string) {
    if (!isString(value)) {
      throw new TypeError("isExactLength: Not comparing to string");
    }

    if (this.minLength === null) {
      throw new Error("isExactLength: Min and max length not set");
    }

    return value.length === this.minLength;
  }

  isBetween(value: string) {
    if (!isString(value)) {
      throw new TypeError("isBetween: Not comparing to string");
    }

    if (this.minLength === null || this.maxLength === null) {
      throw new Error("isBetween: Min or max length not set");
    }

    return this.isLongEnough(value) && this.isSmallEnough(value);
  }

  isLongEnough(value: string) {
    if (!isString(value)) {
      throw new TypeError("isLongEnough: Not comparing to string");
    }

    if (this.minLength === null) {
      throw new Error("isLongEnough: Min length not set");
    }

    return value.length >= this.minLength;
  }

  isSmallEnough(value: string) {
    if (!isString(value)) {
      throw new TypeError("isSmallEnough: Not comparing to string");
    }

    if (this.maxLength === null) {
      throw new Error("isSmallEnough: Max length not set");
    }

    return value.length <= this.maxLength;
  }

  get defaultMessage() {
    switch (this.id) {
      case "Constraint.InvalidLengthExact":
        return "Length must be precisely ${max-length} characters"; // NOSONAR
      case "Constraint.InvalidLengthBetween":
        return "Length must be between ${min-length} and ${max-length} characters"; // NOSONAR
      case "Constraint.InvalidLengthTooShort":
        return "The length of the value  must be larger than ${min-length}"; // NOSONAR
      case "Constraint.InvalidLengthTooLong":
        return "The length of the value must be smaller than ${max-length}"; // NOSONAR
      default:
        return "";
    }
  }

  get parameters() {
    return {
      "min-length": this.minLength,
      "max-length": this.maxLength,
    };
  }

  validate(value: string) {
    switch (this.id) {
      case "Constraint.InvalidLengthExact":
        return this.isExactLength(value);
      case "Constraint.InvalidLengthBetween":
        return this.isBetween(value);
      case "Constraint.InvalidLengthTooShort":
        return this.isLongEnough(value);
      case "Constraint.InvalidLengthTooLong":
        return this.isSmallEnough(value);
      default:
        return true;
    }
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default StringLengthConstraint;

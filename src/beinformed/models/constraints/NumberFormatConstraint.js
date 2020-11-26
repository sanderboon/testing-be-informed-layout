// @flow
import DecimalFormat from "beinformed/utils/number/DecimalFormat";
import parseToNumber from "beinformed/utils/number/parseToNumber";

class NumberFormatConstraint implements IConstraintModel {
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
    if (this.maxDigits === 0) {
      return "Constraint.Number.InvalidInteger";
    }

    return "Constraint.Number.InvalidDecimal";
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

  get maxDigits() {
    return this.format ? new DecimalFormat(this.format).maxFrac : 0;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    if (this.id === "Constraint.Number.InvalidInteger") {
      return "Must be a whole number";
    }

    return "The value is not correct numeric format";
  }

  get parameters() {
    return {
      "max-digits": this.maxDigits,
    };
  }

  isInteger(value: number) {
    return Number.isInteger(value);
  }

  isValidDecimal(value: number) {
    if (isNaN(value)) {
      return false;
    }

    const numberOfDigits =
      Math.floor(value) === value
        ? 0
        : value.toString().split(".")[1].length || 0;

    return (
      !isNaN(parseFloat(value)) &&
      isFinite(value) &&
      numberOfDigits <= this.maxDigits
    );
  }

  validate(value: string | number) {
    if (
      this.maxDigits === 0 &&
      this.decimalSeparator !== "" &&
      value.toString().includes(this.decimalSeparator)
    ) {
      return false;
    }

    const parsedNumber = parseToNumber(
      value,
      this.groupingSeparator,
      this.decimalSeparator
    );

    if (this.id === "Constraint.Number.InvalidInteger") {
      return this.isInteger(parsedNumber);
    }

    return this.isValidDecimal(parsedNumber);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default NumberFormatConstraint;

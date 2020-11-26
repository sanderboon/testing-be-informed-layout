// @flow
class PasswordMinNumericCharactersConstraint implements IConstraintModel {
  _minNumeric: number;

  constructor(minNumeric: number) {
    this._minNumeric = minNumeric;
  }

  get id() {
    return "Constraint.Password.MinNumericCharactersMandatory";
  }

  get minNumeric() {
    return this._minNumeric;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must contain ${min-numeric} or more numerical characters"; // NOSONAR
  }

  get parameters() {
    return {
      "min-numeric": this.minNumeric,
    };
  }

  validate(value: string) {
    return value.replace(/\D/gu, "").length >= this.minNumeric;
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default PasswordMinNumericCharactersConstraint;

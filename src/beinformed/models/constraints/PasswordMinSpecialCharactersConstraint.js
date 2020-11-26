// @flow
class PasswordMinSpecialCharactersConstraint implements IConstraintModel {
  _minSpecial: number;

  constructor(minSpecial: number) {
    this._minSpecial = minSpecial;
  }

  get id() {
    return "Constraint.Password.MinSpecialCharactersMandatory";
  }

  get minSpecial() {
    return this._minSpecial;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must contain ${min-special} or more special characters"; // NOSONAR
  }

  get parameters() {
    return {
      "min-special": this.minSpecial,
    };
  }

  validate(value: string) {
    return value.replace(/[\da-z]/giu, "").length >= this.minSpecial;
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default PasswordMinSpecialCharactersConstraint;

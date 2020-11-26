// @flow
class PasswordConfirmConstraint implements IConstraintModel {
  _otherPasswordLabel: string;
  _otherPasswordValue: string;

  constructor(otherPasswordValue: string, otherPasswordLabel: string) {
    this._otherPasswordLabel = otherPasswordLabel;
    this._otherPasswordValue = otherPasswordValue;
  }

  get id() {
    return "Constraint.Password.ConfirmMismatch";
  }

  get otherPasswordLabel() {
    return this._otherPasswordLabel;
  }

  get otherPasswordValue() {
    return this._otherPasswordValue;
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must match ${other} field"; // NOSONAR
  }

  get parameters() {
    return {
      other: this.otherPasswordLabel,
    };
  }

  validate(value: string) {
    return value === this.otherPasswordValue;
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default PasswordConfirmConstraint;

// @flow
class PasswordLowerAndUpperCaseConstraint implements IConstraintModel {
  get id() {
    return "Constraint.Password.LowerAndUpperCaseMandatory";
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must contain both upper and lowercase characters";
  }

  get parameters() {
    return {};
  }

  validate(value: string) {
    return /[a-z]/u.test(value) && /[A-Z]/u.test(value);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default PasswordLowerAndUpperCaseConstraint;

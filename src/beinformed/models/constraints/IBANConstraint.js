// @flow
import IBAN from "iban";

class IBANConstraint implements IConstraintModel {
  get id() {
    return "Constraint.IBAN.InvalidFormat";
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Must be a valid IBAN number";
  }

  get parameters() {
    return {};
  }

  validate(value: string) {
    return IBAN.isValid(value);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default IBANConstraint;

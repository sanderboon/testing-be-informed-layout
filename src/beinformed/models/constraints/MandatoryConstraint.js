// @flow
import { isString, isNil } from "lodash";

class MandatoryConstraint implements IConstraintModel {
  get id() {
    return "Constraint.Mandatory";
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Field is mandatory";
  }

  get parameters() {
    return {};
  }

  validate(value: string) {
    if (isNil(value)) {
      return false;
    }

    if (!isString(value)) {
      throw new TypeError(
        `isNotEmptyString: Not comparing to string: ${typeof value}`
      );
    }

    return value !== "";
  }

  get isMandatoryConstraint(): boolean {
    return true;
  }
}

export default MandatoryConstraint;

// @flow
import { isNil } from "lodash";

import { getSetting } from "beinformed/constants/Settings";

export default class ConstraintModel implements IConstraintModel {
  _id: string;
  _validateMethod: ?Function;
  _defaultMessage: ?string;
  _parameters: ?Object;

  constructor(
    id: string,
    validateMethod: ?Function,
    defaultMessage: ?string,
    parameters: ?Object
  ) {
    this._id = id;
    this._validateMethod = validateMethod;
    this._defaultMessage = defaultMessage;
    this._parameters = parameters;
  }

  /**
   * Retreive type of constraint
   */
  get id(): string {
    return this._id;
  }

  get defaultMessage(): string {
    return this._defaultMessage || "Missing default message";
  }

  /**
   * Returns available data for constraint
   */
  get parameters(): ?Object {
    return this._parameters;
  }

  /**
   * Inidicates if validation message is present
   */
  hasValidation(): boolean {
    return !isNil(this._validateMethod);
  }

  /**
   * Validate constraint with value
   */
  validate(value: any) {
    const validateMethod = this._validateMethod;

    if (getSetting("USE_CLIENTSIDE_VALIDATION") && validateMethod) {
      return validateMethod(value);
    }

    return true;
  }

  get isMandatoryConstraint(): boolean {
    return this._id === "mandatory" || this._id === "Constraint.Mandatory";
  }
}

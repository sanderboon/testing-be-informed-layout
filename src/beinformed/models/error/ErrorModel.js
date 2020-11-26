// @flow
import type { MessageParameters } from "beinformed/i18n";

/**
 * Wrapper around an error message / object
 */
class ErrorModel {
  _id: string;
  _defaultMessage: ?string;
  _parameters: ?MessageParameters;
  _isClientConstraint: boolean;

  /**
   * Contruct
   */
  constructor(
    id: string,
    defaultMessage: ?string,
    parameters: ?MessageParameters,
    isClientConstraint?: boolean = false
  ) {
    this._id = id;
    this._parameters = parameters;
    this._defaultMessage = defaultMessage;

    this._isClientConstraint = isClientConstraint;
  }

  /**
   * Get id of error
   */
  get id(): string {
    return this._id;
  }

  get defaultMessage(): ?string {
    return this._defaultMessage;
  }

  get parameters(): ?MessageParameters {
    return this._parameters;
  }

  get isClientConstraint(): boolean {
    return this._isClientConstraint || false;
  }

  get isMandatoryConstraint(): boolean {
    return this.id === "Constraint.Mandatory";
  }
}

export default ErrorModel;

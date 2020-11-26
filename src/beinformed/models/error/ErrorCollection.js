// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import ErrorModel from "beinformed/models/error/ErrorModel";

import type { MessageParameters } from "beinformed/i18n";

/**
 * Form Objects
 */
export default class ErrorCollection extends BaseCollection<ErrorModel> {
  _type: string;

  /**
   * constructor
   */
  constructor(type: string, errorCollection?: ErrorCollection) {
    super();

    this._type = type;
    this.collection = [];

    if (errorCollection) {
      this.collection = [...errorCollection.collection];
    }
  }

  get serverErrors(): Array<ErrorModel> {
    return this.collection.filter((error) => !error.isClientConstraint);
  }

  findById(id: string) {
    return this.collection.findIndex((item) => item.id === id);
  }

  /**
   * Add an error to the collection
   */
  addError(
    id: string,
    defaultMessage?: string,
    parameters?: MessageParameters
  ) {
    const itemIdx = this.findById(id);

    if (itemIdx > -1) {
      this.removeByIndex(itemIdx);
    }

    this.add(new ErrorModel(id, defaultMessage, parameters));
  }

  removeError(id: string) {
    const itemIdx = this.findById(id);
    this.removeByIndex(itemIdx);
  }

  /**
   * Add a server error to the collection
   */
  addServerError(
    id: string,
    defaultMessage?: string,
    parameters?: MessageParameters
  ) {
    if (parameters) {
      this.addError(id, defaultMessage, parameters);
    } else {
      this.addError(id, defaultMessage);
    }
  }

  removeServerError(id: string) {
    this.removeError(id);
  }

  removeServerErrors() {
    this.serverErrors.forEach((error) => {
      this.removeError(error.id);
    });
  }

  addErrors(errors: Array<ErrorModel>) {
    this.collection = [...this.collection, ...errors];
  }

  /**
   * Add constraints to error collection
   */
  addConstraints(constraints: Array<IConstraintModel>) {
    this.collection = [
      ...this.collection,
      ...constraints.map(
        (constraint) =>
          new ErrorModel(
            constraint.id,
            constraint.defaultMessage,
            constraint.parameters,
            true
          )
      ),
    ];
  }

  /**
   * Indicates if a mandatory constraint is available and if it is in error.
   * Rationale: When a mandatory constraint is in error other constraint probably don't mather because there is no value to check
   */
  hasMandatoryError(): boolean {
    return this.collection.some((error) => error.isMandatoryConstraint);
  }
}

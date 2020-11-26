// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import ConstraintModel from "beinformed/models/constraints/ConstraintModel";

/**
 * Attribute constraints
 */
export default class ConstraintCollection extends BaseCollection<IConstraintModel> {
  /**
   * Add constraint
   */
  addConstraint(
    id: string,
    validateMethod: ?Function,
    defaultMessage: ?string,
    data: ?Object
  ) {
    this.add(new ConstraintModel(id, validateMethod, defaultMessage, data));
  }

  /**
   * Validate if complete collection is valid
   */
  validate(value: any) {
    return (
      this.isEmpty ||
      this.collection.every((constraint) => constraint.validate(value))
    );
  }

  /**
   * Indicates if a mandatory constraint exists in the collection
   */
  hasMandatoryConstraint(): boolean {
    return this.collection.some(
      (constraint) => constraint.isMandatoryConstraint
    );
  }

  /**
   * Retrieve all invalid constraints
   */
  invalidConstraints(value: any): Array<IConstraintModel> {
    if (value === "" && !this.hasMandatoryConstraint()) {
      return [];
    }

    return this.collection.filter(
      (constraint) => constraint.validate(value) === false
    );
  }
}

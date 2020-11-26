// @flow
import type CompositeAttributeChildCollection from "beinformed/models/attributes/CompositeAttributeChildCollection";

class MandatoryRangeConstraint implements IConstraintModel {
  _type: "date" | "time" | "datetime" | "timestamp";
  _children: CompositeAttributeChildCollection;

  constructor(
    type: "date" | "time" | "datetime" | "timestamp",
    children: CompositeAttributeChildCollection
  ) {
    this._type = type;
    this._children = children;
  }

  get type() {
    return this._type;
  }

  get children() {
    return this._children.all;
  }

  get id() {
    switch (this.type) {
      case "date":
        return "Constraint.DateRange.Mandatory";
      case "time":
        return "Constraint.TimeRange.Mandatory";
      case "datetime":
        return "Constraint.DateTimeRange.Mandatory";
      case "timestamp":
        return "Constraint.TimeStampRange.Mandatory";
      default:
        return "Constraint.Range.Mandatory";
    }
  }

  hasValidation() {
    return true;
  }

  get defaultMessage() {
    return "Field is mandatory: must contain at least a start or end value";
  }

  get parameters() {
    return {};
  }

  validate() {
    // only validate when no children are in error
    if (this.children.some((child) => child.inError())) {
      return true;
    }

    return this.children.some((child) => child.hasValue());
  }

  get isMandatoryConstraint(): boolean {
    return true;
  }
}

export default MandatoryRangeConstraint;

// @flow
import {
  DateUtil,
  DateTimeUtil,
  TimestampUtil,
  TimeUtil,
} from "beinformed/utils/datetime/DateTimeUtil";

import type { AttributeType } from "beinformed/models";

class RangeConstraint implements IConstraintModel {
  _start: AttributeType;
  _end: AttributeType;

  constructor(startAttribute: AttributeType, endAttribute: AttributeType) {
    this._start = startAttribute;
    this._end = endAttribute;
  }

  get id() {
    const id = this.hasInclusiveBounds
      ? "InvalidRangeInclusive"
      : "InvalidRange";

    switch (this.rangeType) {
      case "time":
        return `Constraint.TimeRange.${id}`;
      case "date":
        return `Constraint.DateRange.${id}`;
      case "datetime":
        return `Constraint.DateTimeRange.${id}`;
      case "timestamp":
        return `Constraint.TimeStampRange.${id}`;
      default:
        return `Constraint.NumberRange.${id}`;
    }
  }

  get defaultMessage() {
    const inclusivePart = this.hasInclusiveBounds ? " or equal to the" : "";

    switch (this.rangeType) {
      case "time":
        return `Start time must be before${inclusivePart} end time`;
      case "date":
        return `Start date must be before${inclusivePart} end date`;
      case "datetime":
        return `Start value must be before${inclusivePart} end value`;
      case "timestamp":
        return `Start value must be before${inclusivePart} end value`;
      default:
        return `Start value must be less than${inclusivePart} the end value`;
    }
  }

  hasValidation() {
    return true;
  }

  get parameters() {
    return {};
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get rangeType() {
    return this.start.type;
  }

  get hasInclusiveBounds() {
    return (
      this.start.operator === "greaterThanOrEqualTo" &&
      this.end.operator === "lessThanOrEqualTo"
    );
  }

  get util() {
    switch (this.rangeType) {
      case "time":
        return TimeUtil;
      case "date":
        return DateUtil;
      case "datetime":
        return DateTimeUtil;
      case "timestamp":
        return TimestampUtil;
      default:
        return null;
    }
  }

  doValidate(startValue: string, endValue: string) {
    if (this.hasInclusiveBounds) {
      if (!this.util) {
        return startValue <= endValue;
      }
      return this.util.isSameOrBefore(startValue, endValue);
    }

    if (!this.util) {
      return startValue < endValue;
    }

    return this.util.isBefore(startValue, endValue);
  }

  validate() {
    // only validate range when both attributes are valid
    if (this.start.inError() || this.end.inError()) {
      return true;
    }

    return this.doValidate(this.start.value, this.end.value);
  }

  get isMandatoryConstraint() {
    return false;
  }
}

export default RangeConstraint;

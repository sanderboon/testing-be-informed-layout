// @flow
import { get, isNil, isPlainObject } from "lodash";

import AttributeModel from "beinformed/models/attributes/AttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

import formatValue from "beinformed/utils/number/formatValue";

import {
  CASEVIEW_LINK,
  INITIAL_TOTAL_FILESIZE,
  MAX_TOTAL_FILESIZE,
} from "beinformed/constants/LayoutHints";

import NumberFormatConstraint from "beinformed/models/constraints/NumberFormatConstraint";
import NumberGroupingConstraint from "beinformed/models/constraints/NumberGroupingConstraint";
import NumberBoundaryConstraint from "beinformed/models/constraints/NumberBoundaryConstraint";

import parseToNumber from "beinformed/utils/number/parseToNumber";

/**
 * Number attribute
 */
export default class NumberAttributeModel extends AttributeModel {
  static isApplicableModel(contributions: Object) {
    return contributions.type === "number" || contributions.type === "integer";
  }

  get type() {
    return "number";
  }

  /**
   * Get initial value
   */
  getInitialInputValue(value?: string) {
    if (isNil(value)) {
      return "";
    }

    return this.formatValue(value);
  }

  /**
   * Get grouping separator
   */
  get groupingSeparator() {
    return this.contributions.groupingSeparator || "";
  }

  /**
   * Get decimal separator
   */
  get decimalSeparator() {
    return this.contributions.decimalSeparator || "";
  }

  /**
   * Get minimum value
   */
  get minNumber() {
    return this.contributions.minimum;
  }

  /**
   * Get maximum value
   */
  get maxNumber() {
    return this.contributions.maximum;
  }

  /**
   * Gets the maximum digits based on the format
   */
  get maxDigits() {
    return this.format && this.format.includes(".")
      ? this.format.split(".")[1].length
      : 0;
  }

  /**
   * Get unit text
   */
  get unit() {
    return get(this.contributions, "unit", "");
  }

  /**
   * Get placeholder text
   */
  get placeholder() {
    return this.contributions.placeholder || "";
  }

  get operator() {
    return this.contributions.operator;
  }

  /**
   * Add number constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    constraints.add(
      new NumberFormatConstraint(
        this.groupingSeparator,
        this.decimalSeparator,
        this.format
      )
    );
    constraints.add(
      new NumberGroupingConstraint(
        this.groupingSeparator,
        this.decimalSeparator,
        this.format
      )
    );
    constraints.add(
      new NumberBoundaryConstraint(
        this.minNumber,
        this.maxNumber,
        this.groupingSeparator,
        this.decimalSeparator,
        this.format
      )
    );

    return constraints;
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.inputvalue = "";
  }

  formatValue(value: ?number | ?string) {
    if (isNil(value) || value.toString() === "") {
      return "";
    }

    return formatValue(
      value,
      this.format,
      this.groupingSeparator,
      this.decimalSeparator
    );
  }

  get readonlyvalue() {
    if (!isPlainObject(this.value)) {
      return this.formatValue(this.value);
    }

    return this.value;
  }

  /**
   * Returns the value as entered by the user. This can differ from the internal iso value that is stored
   */
  get inputvalue() {
    return this.getInputValue();
  }

  /**
   * Sets the input value to the value entered by the user
   */
  set inputvalue(value: string) {
    this._inputvalue = value;
    this.validate(value);

    const outputNumber = parseToNumber(
      value,
      this.groupingSeparator,
      this.decimalSeparator
    );

    this.value = isNaN(outputNumber) ? null : outputNumber.toString();
  }

  /**
   * Getting the value of the attribute
   */
  getValue() {
    const value = this._value;

    return isNil(value) || value === "" ? null : Number(value);
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    if (value === this.inputvalue) {
      return this;
    }

    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }

  get isHidden() {
    return (
      super.isHidden ||
      this.layouthint.has(
        INITIAL_TOTAL_FILESIZE,
        MAX_TOTAL_FILESIZE,
        CASEVIEW_LINK
      )
    );
  }
}

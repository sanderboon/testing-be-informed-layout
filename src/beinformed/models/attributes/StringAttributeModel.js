// @flow
import { get, isNil, isPlainObject, isString } from "lodash";

import AttributeModel from "beinformed/models/attributes/AttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import RegexConstraint from "beinformed/models/constraints/RegexConstraint";
import BSNConstraint from "beinformed/models/constraints/BSNConstraint";
import IBANConstraint from "beinformed/models/constraints/IBANConstraint";

/**
 * String attribute
 */
export default class StringAttributeModel extends AttributeModel {
  _placeholder: string;

  constructor(attribute: Object, attributeContributions: Object) {
    super(attribute, attributeContributions);

    this._placeholder = this.contributions.placeholder || "";
  }

  /**
   * Retrieve initial input value
   */
  getInitialInputValue(value: any) {
    return this.formatValue(value);
  }

  static isApplicableModel(contributions: Object) {
    return (
      contributions.type === "string" ||
      get(contributions, "layouthint", []).includes("string")
    );
  }

  get type() {
    return "string";
  }

  /**
   * Get Regexp pattern
   */
  get regexp() {
    return get(this.contributions, "regexp", null);
  }

  get regexpvalidationmessage() {
    return get(this.contributions, "regexpValidationMessage", null);
  }

  /**
   * Get postfix text
   */
  get postfix() {
    return get(this.contributions, "postfix", "");
  }

  /**
   * Get prefix text
   */
  get prefix() {
    return get(this.contributions, "prefix", "");
  }

  /**
   * Get placeholder text
   */
  get placeholder() {
    return this._placeholder;
  }

  /**
   * Set placeholder text
   */
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }

  isBSN() {
    return this.layouthint.has("bsn");
  }

  isIBAN() {
    return this.layouthint.has("iban");
  }

  isZipcode() {
    return this.layouthint.has("zipcode");
  }

  isEmail() {
    return this.layouthint.has("email");
  }

  /**
   * Add regex constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    if (this.isBSN()) {
      constraints.add(new BSNConstraint());
    } else if (this.isIBAN()) {
      constraints.add(new IBANConstraint());
    }

    if (isString(this.regexp)) {
      if (this.isZipcode()) {
        constraints.add(
          new RegexConstraint({
            messageKey: "Constraint.ZipCode.InvalidFormat",
            defaultMessage: "Must be a valid Dutch ZIP code, e.g. 1234 AB",
            regex: this.regexp,
          })
        );
      } else if (this.isEmail()) {
        constraints.add(
          new RegexConstraint({
            messageKey: "Constraint.Email.InvalidFormat",
            defaultMessage: "Must be a valid e-mail address",
            regex: new RegExp(this.regexp, "gi"),
          })
        );
      } else if (this.regexp) {
        constraints.add(
          new RegexConstraint({
            messageKey: "Constraint.String.InvalidRegex",
            defaultMessage: this.regexpvalidationmessage,
            regex: this.regexp,
          })
        );
      }
    }

    return constraints;
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.inputvalue = "";
  }

  formatIBAN(value: string) {
    const noFormat = this.removeFormat(value);

    const groups = noFormat.replace(/\s/g, "").match(/.{1,4}/g);
    return isNil(groups) ? "" : groups.join(" ");
  }

  formatZipcode(value: string) {
    const noFormat = this.removeFormat(value);
    if (noFormat.length > 4) {
      return (
        noFormat.substring(0, 4) + " " + noFormat.substring(4).toUpperCase()
      );
    }
    return noFormat;
  }

  formatBSN(value: string) {
    return this.removeFormat(value);
  }

  formatValue(value: ?string) {
    if (isNil(value) || value.toString() === "") {
      return "";
    }

    if (this.isIBAN()) {
      return this.formatIBAN(value);
    }

    if (this.isZipcode()) {
      return this.formatZipcode(value);
    }

    if (this.isBSN()) {
      return this.formatBSN(value);
    }

    return value;
  }

  removeFormat(value: ?string): string {
    if (isNil(value) || value.toString() === "") {
      return "";
    }

    if (this.isIBAN() || this.isZipcode() || this.isBSN()) {
      return value.replace(/\.|\s/g, "");
    }

    return value;
  }

  get validateValue() {
    return this.removeFormat(this.inputvalue);
  }

  get inputvalue() {
    return this.getInputValue();
  }

  /**
   * Sets the input value to the value entered by the user
   */
  set inputvalue(value: string) {
    this._inputvalue = value;

    this.value = isNil(value) ? value : this.removeFormat(value);
    this.validate(this.validateValue);
  }

  get readonlyvalue() {
    if (!isPlainObject(this.value) && isString(this.value)) {
      return this.formatValue(this.value);
    }

    return isNil(this.value) ? "" : this.value;
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    if (this.inputvalue === value) {
      return this;
    }

    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }
}

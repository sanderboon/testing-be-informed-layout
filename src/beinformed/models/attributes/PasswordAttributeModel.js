// @flow
import { get } from "lodash";

import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

import PasswordLowerAndUpperCaseConstraint from "beinformed/models/constraints/PasswordLowerAndUpperCaseConstraint";
import PasswordThreeConsecutiveCharactersNotAllowedConstraint from "beinformed/models/constraints/PasswordThreeConsecutiveCharactersNotAllowedConstraint";
import PasswordMinNumericCharactersConstraint from "beinformed/models/constraints/PasswordMinNumericCharactersConstraint";
import PasswordMinSpecialCharactersConstraint from "beinformed/models/constraints/PasswordMinSpecialCharactersConstraint";
import RegexConstraint from "beinformed/models/constraints/RegexConstraint";
import PasswordConfirmConstraint from "beinformed/models/constraints/PasswordConfirmConstraint";

import { CONFIRM_PASSWORD } from "beinformed/constants/LayoutHints";
import { getSetting } from "beinformed/constants/Settings";

/**
 * Password attribute
 */
export default class PasswordAttributeModel extends StringAttributeModel {
  _confirmValue: string;
  _isConfirmPassword: boolean;
  _otherLabel: string;

  static isApplicableModel(contributions: Object) {
    return (
      contributions.type === "password" ||
      get(contributions, "layouthint", []).includes("password")
    );
  }

  get type() {
    return "password";
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }

  get constraints() {
    return this.contributions.constraints || {};
  }

  get upperAndLowerCaseMandatory() {
    return this.constraints.upperAndLowerCaseMandatory;
  }

  get maxSequenceOfIdenticalCharacters() {
    return this.constraints.maxSequenceOfIdenticalCharacters;
  }

  get maxSequenceOfUsernameCharacters() {
    return this.constraints.maxSequenceOfUsernameCharacters;
  }

  get minNumberOfNumericCharacters() {
    return this.constraints.minNumberOfNumericCharacters;
  }

  get minNumberOfSpecialCharacters() {
    return this.constraints.minNumberOfSpecialCharacters;
  }

  get regexConstraints() {
    return this.constraints.regexConstraint;
  }

  /**
   * Add password constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    if (this.isConfirmPassword) {
      constraints.add(
        new PasswordConfirmConstraint(this.confirmValue, this.otherLabel)
      );
    } else {
      if (this.upperAndLowerCaseMandatory) {
        constraints.add(new PasswordLowerAndUpperCaseConstraint());
      }

      if (this.maxSequenceOfIdenticalCharacters) {
        constraints.add(
          new PasswordThreeConsecutiveCharactersNotAllowedConstraint(
            this.maxSequenceOfIdenticalCharacters
          )
        );
      }

      if (this.minNumberOfNumericCharacters) {
        constraints.add(
          new PasswordMinNumericCharactersConstraint(
            this.minNumberOfNumericCharacters
          )
        );
      }

      if (this.minNumberOfSpecialCharacters) {
        constraints.add(
          new PasswordMinSpecialCharactersConstraint(
            this.minNumberOfSpecialCharacters
          )
        );
      }

      if (this.regexConstraints && this.regexConstraints.length > 0) {
        this.regexConstraints.forEach((regexConstraint) => {
          constraints.add(new RegexConstraint(regexConstraint));
        });
      }

      if (this.layouthint.has(CONFIRM_PASSWORD)) {
        constraints.add(
          new PasswordConfirmConstraint(this.confirmValue, this.otherLabel)
        );
      }
    }

    return constraints;
  }

  /**
   * Retrieve applicable constraint for this attribute
   */
  get constraintCollection() {
    if (this.isConfirmPassword) {
      const constraints = new ConstraintCollection();
      constraints.add(this.addConstraints());
      return constraints;
    }

    return super.constraintCollection;
  }

  get isConfirmPassword() {
    return this._isConfirmPassword || false;
  }

  set isConfirmPassword(isConfirmPassword: boolean) {
    this._isConfirmPassword = isConfirmPassword;
  }

  get confirmValue() {
    return this._confirmValue || "";
  }

  set confirmValue(confirmValue: string) {
    this._confirmValue = confirmValue;

    this.validate(this.inputvalue);
  }

  get otherLabel() {
    return this._otherLabel;
  }

  set otherLabel(otherLabel: string) {
    this._otherLabel = otherLabel;
  }

  /**
   * Validate input
   */
  validate(value: string) {
    // when client side validation is disabled, this attribute is always valid
    if (!getSetting("USE_CLIENTSIDE_VALIDATION")) {
      return true;
    }

    if (this.isOptionalAndEmpty(value)) {
      this._isValid = true;
    } else if (this._validatedValue !== `${this.confirmValue}-${value}`) {
      this._isValid = this.constraintCollection.validate(value);
    }
    this._validatedValue = `${this.confirmValue}-${value}`;

    return this._isValid;
  }

  getFormData() {
    if (this.isConfirmPassword || this.inError()) {
      return null;
    }

    return {
      [this.name]: this.value,
    };
  }
}

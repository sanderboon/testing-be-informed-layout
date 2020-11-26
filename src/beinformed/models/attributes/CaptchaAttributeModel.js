// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";

/**
 * Password attribute
 */
export default class CaptchaAttributeModel extends AttributeModel {
  static isApplicableModel(contributions: Object) {
    return contributions.type === "captcha";
  }

  get type() {
    return "captcha";
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }

  get hasDynamicValidationData() {
    return false;
  }
}

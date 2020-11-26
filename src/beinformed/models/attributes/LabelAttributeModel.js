// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";
import { get } from "lodash";

/**
 * Label Attribute model
 */
export default class LabelAttributeModel extends AttributeModel {
  static isApplicableModel(contributions: Object) {
    return (
      contributions.type === "label" ||
      get(contributions, "layouthint", []).includes("label")
    );
  }

  get type() {
    return "label";
  }

  // eslint-disable-next-line no-unused-vars
  update(value: string) {
    return null;
  }

  getFormData() {
    return null;
  }
}

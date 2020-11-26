// @flow
import { get, has } from "lodash";

import LabelAttributeModel from "beinformed/models/attributes/LabelAttributeModel";

/**
 * Helptext attribute
 */
export default class HelptextAttributeModel extends LabelAttributeModel {
  static isApplicableModel(contributions: Object) {
    return (
      contributions.type === "helptext" ||
      (contributions.readonly && has(contributions, "text"))
    );
  }

  get type() {
    return "helptext";
  }

  /**
   * Get helptext text
   */
  get text() {
    return get(this.contributions, "text", null);
  }
}

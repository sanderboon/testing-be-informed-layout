// @flow
import { get } from "lodash";

import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";

/**
 * Money Attribute model
 */
export default class MoneyAttributeModel extends NumberAttributeModel {
  static isApplicableModel(contributions: Object) {
    return (
      contributions.type === "money" ||
      get(contributions, "layouthint", []).includes("money")
    );
  }

  get type() {
    return "money";
  }

  /**
   * Retrieve currency symbol
   */
  get currencySymbol() {
    return get(this.contributions, "currencySymbol", "");
  }

  /**
   * Retrieve currency symbol as prefix
   */
  get prefix() {
    return this.currencySymbol;
  }
}

// @flow
import { get } from "lodash";

import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * Memo attribute
 */
export default class MemoAttributeModel extends StringAttributeModel {
  static isApplicableModel(contributions: Object) {
    const rows = get(contributions, "rows", 0);

    return contributions.type === "memo" || rows > 1;
  }

  get type() {
    return "memo";
  }

  /**
   * Retrieve number of rows to render in a textarea and wysiwyg input
   */
  get rows() {
    const DEFAULT_ROWS_TO_RENDER = 10;

    return this.contributions.rows || DEFAULT_ROWS_TO_RENDER;
  }

  /**
   * Get formatted switch
   */
  get formatted() {
    return this.contributions.formatted || false;
  }
}

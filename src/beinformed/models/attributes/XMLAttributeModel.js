// @flow
import { get } from "lodash";

import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import XMLConstraint from "beinformed/models/constraints/XMLConstraint";

/**
 * XML attribute
 */
export default class XMLAttributeModel extends StringAttributeModel {
  static isApplicableModel(contributions: Object) {
    return (
      contributions.type === "xml" ||
      get(contributions, "layouthint", []).includes("xml")
    );
  }

  get type() {
    return "xml";
  }

  /**
   * Retrieve number of rows to render
   */
  get rows() {
    return 10;
  }

  /**
   * Add constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    constraints.add(new XMLConstraint());

    return constraints;
  }
}

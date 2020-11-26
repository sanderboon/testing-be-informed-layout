// @flow
import { get } from "lodash";

import ResourceModel from "beinformed/models/base/ResourceModel";

/**
 * Model for concept details, available through modelcatalog
 */
export default class ConceptTypeDetailModel extends ResourceModel {
  get type() {
    return "ConceptTypeDetail";
  }

  static isApplicableModel(data: Object) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ConceptTypeDetail"
    );
  }

  get key() {
    return this.data._id;
  }

  /**
   * Get concept type label
   */
  get label() {
    return get(this.data, "label", "");
  }

  /**
   * Get concept type icon
   */
  get icon() {
    return get(this.data, "icon", "");
  }

  /**
   * Get concept type text color
   */
  get textColor() {
    return get(this.data, "textColor", "#000");
  }

  /**
   * Get concept type background color
   */
  get backgroundColor() {
    return get(this.data, "backgroundColor", "#fff");
  }

  /**
   * Get concept line color
   */
  get borderColor() {
    return get(this.data, "lineColor", "#000");
  }

  /**
   * Get label types
   */
  get labelTypes() {
    return this.data.labelTypes;
  }

  /**
   * Get propertyTypes
   */
  get propertyTypes() {
    return get(this.data, "propertyTypes", []);
  }

  /**
   * Get textFragmentTypes
   */
  get textFragmentTypes() {
    return get(this.data, "textFragmentTypes", []);
  }

  /**
   * Get sectionReferenceTypes
   */
  get sectionReferenceTypes() {
    return get(this.data, "sectionReferenceTypes", []);
  }
}

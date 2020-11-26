// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";

/**
 * Model for concept details, available through modelcatalog
 */
export default class ContentTypeModel extends ResourceModel {
  get type() {
    return "ContentType";
  }

  static isApplicableModel(data: Object) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentTypeDetail"
    );
  }

  /**
   * Get concept type label
   */
  get label() {
    return this.data.label || "";
  }

  /**
   * Get content type icon
   */
  get icon() {
    return this.iconLarge;
  }

  /**
   * Get content type small icon
   */
  get iconSmall() {
    return this.data.iconSmall;
  }

  /**
   * Get content type medium icon
   */
  get iconMedium() {
    return this.data.iconMedium;
  }

  /**
   * Get content type large icon
   */
  get iconLarge() {
    return this.data.iconLarge;
  }

  /**
   * Get concept type text color
   */
  get description() {
    return this.data.description;
  }
}

// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";

import type { LinkModel } from "beinformed/models";

/**
 * The Application model
 */
export default class ModelCatalogModel extends ResourceModel {
  get type(): string {
    return "ModelCatalog";
  }

  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ModelCatalog"
    );
  }

  get label(): string {
    return this.locale === "nl" ? "Model catalogus" : "Model catalog";
  }

  /**
   * Retrieve link to Concept Index model
   */
  get conceptIndexLink(): LinkModel {
    return this.links.getLinkByKey("concepts");
  }

  /**
   * Retrieve link to Content Index model
   */
  get contentIndexLink(): LinkModel {
    return this.links.getLinkByKey("content");
  }
}

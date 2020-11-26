// @flow
import { get } from "lodash";

import BaseModel from "beinformed/models/base/BaseModel";
import LinkModel from "beinformed/models/links/LinkModel";
import LinkCollection from "beinformed/models/links/LinkCollection";
import ConceptTypeDetailModel from "beinformed/models/concepts/ConceptTypeDetailModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type { ModularUIModel } from "beinformed/models";
/**
 * Link to a concept
 */
export default class ConceptLinkModel extends BaseModel {
  _links: ?LinkCollection;
  _entryDate: ?ISO_DATE;
  _conceptType: ?ConceptTypeDetailModel;

  /**
   * Construct ConceptLinkModel
   */
  constructor(data: Object, entryDate: ?ISO_DATE = null) {
    super(data, {});

    this._entryDate = entryDate;
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    if (this.conceptTypeLink) {
      this.conceptTypeLink.isCacheable = true;
      return [this.conceptTypeLink];
    }

    return [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    if (this.conceptTypeLink) {
      const conceptTypeModel =
        models.find((model) =>
          model.selfhref.equalsWithParameters(this.conceptTypeLink.href)
        ) || null;

      if (
        conceptTypeModel !== null &&
        conceptTypeModel.type === "ConceptTypeDetail"
      ) {
        this.conceptType = conceptTypeModel;
      }
    }
  }

  /**
   * Retrieve concept type
   */
  get conceptType() {
    return this._conceptType;
  }

  /**
   * Set concept type
   */
  set conceptType(conceptType: ?ModularUIModel) {
    this._conceptType =
      conceptType instanceof ConceptTypeDetailModel ? conceptType : null;
  }

  /**
   * Retrieve key
   */
  get key() {
    return this.data._id;
  }

  /**
   * Retrieve label
   */
  get label() {
    return get(this.data, "label", get(this.data, "conceptLabel", ""));
  }

  /**
   * Getting the links of the resource
   */
  get links(): LinkCollection {
    if (!this._links) {
      this._links = new LinkCollection(
        Array.isArray(this.data._links) ? this.data._links[0] : this.data._links
      );
    }

    return this._links;
  }

  /**
   * Get self link of model
   */
  get selflink(): LinkModel {
    const selflink = this.links.getLinkByKey("self");

    if (selflink === null) {
      throw new Error(
        `Could not find self link for ${
          this.key === null ? "unknown" : this.key
        }`
      );
    }

    return selflink;
  }

  /**
   * Self href of concept
   */
  get selfhref() {
    if (this._entryDate !== null) {
      return this.selflink.href.addParameter(
        TIMEVERSION_FILTER_NAME,
        this._entryDate
      );
    }

    return this.selflink.href;
  }

  get conceptTypeLink() {
    return this.links.getLinkByKey("concepttype");
  }

  /**
   * Concept type href of concept
   */
  get concepttypeHref() {
    return this.conceptTypeLink.href;
  }

  get taxonomyType() {
    return "default";
  }

  asLinkModel() {
    const link = LinkModel.create(this.key, this.selfhref.href, this.label);
    link.href = this.selfhref;

    return link;
  }
}

// @flow
import { get, has } from "lodash";

import BaseModel from "beinformed/models/base/BaseModel";
import Href from "beinformed/models/href/Href";
import LinkModel from "beinformed/models/links/LinkModel";
import ContentTypeModel from "beinformed/models/content/ContentTypeModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import LinkCollection from "beinformed/models/links/LinkCollection";

import type { ModularUIModel } from "beinformed/models";

/**
 * Link to a concept
 */
export default class ContentLinkModel extends BaseModel {
  _links: ?LinkCollection;
  _entryDate: ?ISO_DATE;
  _contentType: ?ContentTypeModel;
  _items: Array<ContentLinkModel>;

  constructor(data: Object, entryDate: ?ISO_DATE = null) {
    super(data, {});

    this._entryDate = entryDate;
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    if (this.contentTypeLink) {
      this.contentTypeLink.isCacheable = true;
      return [this.contentTypeLink];
    }

    return [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    if (this.contentTypeLink) {
      const contentTypeModel =
        models.find((model) =>
          model.selfhref.equalsWithParameters(this.contentTypeLink.href)
        ) || null;

      if (
        contentTypeModel !== null &&
        contentTypeModel.type === "ContentType"
      ) {
        this.contentType = contentTypeModel;
      }
    }
  }

  /**
   * Retrieve concept type
   */
  get contentType() {
    return this._contentType;
  }

  /**
   * Set concept type
   */
  set contentType(contentType: ?ModularUIModel) {
    this._contentType =
      contentType instanceof ContentTypeModel ? contentType : null;
  }

  set entryDate(entryDate: ISO_DATE) {
    this._entryDate = entryDate;
  }

  /**
   * Retrieve key
   */
  get key() {
    return get(this.data, "_id", "");
  }

  /**
   * Retrieve label
   */
  get label() {
    return get(this.data, "label", "");
  }

  /**
   * Retrieve the label of the source a link to a section belongs to
   */
  get sourceLabel() {
    return get(this.data, "sourceLabel");
  }

  /**
   * Encode the content-identifier of the path to the content resource.
   * This makes it a single uri part, which can be used on routes to make nested routes
   */
  get encodedHref() {
    const startURI = "/content/";

    const selfhref = this.data._links.self.href;
    const href = has(this.data, "section")
      ? new Href(
          `${startURI}${encodeURIComponent(
            selfhref.substring(
              startURI.length,
              selfhref.indexOf(this.data.section) - 1
            )
          )}/${get(this.data, "section")}`
        )
      : new Href(
          `${startURI}${encodeURIComponent(
            this.data._links.self.href.substr(startURI.length)
          )}`
        );

    if (this._entryDate !== null) {
      return href.addParameter(TIMEVERSION_FILTER_NAME, this._entryDate);
    }

    return href;
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

  get subSectionID() {
    return this.selfhref.hash;
  }

  get contentTypeLink() {
    return this.links.getLinkByKey("contenttype");
  }

  /**
   * Concept type href of concept
   */
  get contentTypeHref() {
    if (this.contentTypeLink) {
      return this.contentTypeLink.href;
    }

    return null;
  }

  /**
   * Children of link model in TOC
   */
  set items(items: Array<ContentLinkModel>) {
    this._items = items;
  }

  get items() {
    return this._items;
  }
}

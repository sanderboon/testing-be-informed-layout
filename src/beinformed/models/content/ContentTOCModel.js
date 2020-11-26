// @flow
import { get, has } from "lodash";

import ResourceModel from "beinformed/models/base/ResourceModel";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import ContentTypeModel from "beinformed/models/content/ContentTypeModel";
import Href from "beinformed/models/href/Href";

import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type { ModularUIModel } from "beinformed/models";

/**
 * Get content items recursively
 */
const getItems = (items, entryDate) =>
  items.map((item) => {
    const link = new ContentLinkModel(
      {
        ...item,
        section: item._id,
      },
      entryDate
    );

    if (item.items) {
      link.items = getItems(item.items, entryDate);
    }

    return link;
  });

/**
 * Get categories
 */
const getCategories = (categories) =>
  categories.map((category) => new ContentLinkModel(category));

/**
 * Content detail model
 */
export default class ContentTOCModel extends ResourceModel {
  _contentType: ?ContentTypeModel;
  _filterCollection: FilterCollection;

  get type() {
    return "ContentTOC";
  }

  static isApplicableModel(data: Object) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentTOC"
    );
  }

  getInitialChildModelLinks() {
    const contentTypeLink = this.links.getLinkByKey("contenttype");

    if (contentTypeLink) {
      return [contentTypeLink];
    }

    return [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.contentType = models.find((model) => model.type === "ContentType");
  }

  /**
   * Get content label
   */
  get label() {
    return get(this.data, "label", "");
  }

  /**
   * Getting the self link of this list
   */
  get selfhref() {
    const href = new Href(this.selflink.href);

    this.filterCollection.forEach((filter) => {
      filter.params.forEach((param) => {
        if (param.value) {
          href.setParameter(param.name, param.value);
        } else {
          href.removeParameter(param.name);
        }
      });
    });

    return href;
  }

  get selfContentLink() {
    return new ContentLinkModel(this.data, this.entryDate);
  }

  /**
   * Get sub items of toc
   */
  get items() {
    return this.data.items ? getItems(this.data.items, this.entryDate) : [];
  }

  /**
   * get categories of content
   */
  get categories() {
    return this.data.categories ? getCategories(this.data.categories) : [];
  }

  /**
   * Retrieve content type model
   * @return {ContentTypeModel}
   */
  get contentType() {
    return this._contentType;
  }

  set contentType(contentType: ?ModularUIModel) {
    this._contentType =
      contentType instanceof ContentTypeModel ? contentType : null;
  }

  /**
   * Retrieve available filters on concept toc
   */
  get filterCollection() {
    if (!this._filterCollection) {
      this._filterCollection = new FilterCollection(this.data.filter, {
        filter: this.contributions.filter.filter((filter) => {
          const [key] = Object.keys(filter);
          return has(this.data.filter, key);
        }),
      });
    }

    return this._filterCollection;
  }

  /**
   * Retrieve entrydate of content toc
   */
  get entryDate() {
    const timeversionFilter = this.filterCollection.getFilterByAttributeKey(
      TIMEVERSION_FILTER_NAME
    );
    if (timeversionFilter) {
      return timeversionFilter.attribute.value;
    }

    return null;
  }
}

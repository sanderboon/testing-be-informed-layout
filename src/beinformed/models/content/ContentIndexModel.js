// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import ResourceCollection from "beinformed/models/base/ResourceCollection";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import Href from "beinformed/models/href/Href";

import type { ModularUIModel, LinkModel } from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";
import { get } from "lodash";

/**
 * Get Index of concepts, to filter model catalog
 */
export default class ContentIndexModel extends ResourceModel {
  _filterCollection: FilterCollection;
  _content: ResourceCollection<ContentLinkModel>;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._filterCollection = new FilterCollection(this.data.filter, {
      filter: this.contributions.filter,
      dynamicschema: this.data.dynamicschema,
    });

    this._content = new ResourceCollection();
    this._content.collection = this.data._embedded
      ? this.data._embedded.results.map(
          (content) => new ContentLinkModel(content.content)
        )
      : [];
  }

  get type() {
    return "ContentIndex";
  }

  static isApplicableModel(data: Object) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentSearch"
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    return this.items.getInitialChildModelLinks();
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.items.setChildModels(models);
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

  get label() {
    return get(this.contributions, "label", "");
  }

  /**
   * Retrieve filters of conceptindex model
   */
  get filterCollection() {
    return this._filterCollection;
  }

  /**
   * Get index filter
   */
  get indexfilter() {
    return this._filterCollection.getFilterByAttributeKey("index");
  }

  /**
   * Retrieve content collection
   */
  get items() {
    return this._content;
  }

  hasIndexFilter() {
    return this.indexfilter && this.indexfilter.attribute.options.length > 0;
  }

  hasNoFiltersSet() {
    return (
      this.items.isEmpty &&
      this.filterCollection.filter(
        (filter) => filter.attribute.inputvalue !== ""
      ).length === 0
    );
  }

  getFirstCharHref() {
    const firstChar =
      this.indexfilter && this.indexfilter.attribute
        ? this.indexfilter.attribute.options.filter(
            (option) => option.code !== "0"
          )[0].code
        : "#";

    return new Href(this.selfhref.path).addParameter("index", firstChar);
  }
}

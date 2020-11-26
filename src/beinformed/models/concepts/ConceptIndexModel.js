// @flow
import { get } from "lodash";

import ResourceModel from "beinformed/models/base/ResourceModel";
import ResourceCollection from "beinformed/models/base/ResourceCollection";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";

import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type { ModularUIResponse } from "beinformed/modularui";
import type { ModularUIModel, LinkModel } from "beinformed/models";

/**
 * Get Index of concepts, to filter model catalog
 */
export default class ConceptIndexModel extends ResourceModel {
  _filterCollection: FilterCollection;
  _concepts: ResourceCollection<ConceptLinkModel>;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._filterCollection = new FilterCollection(this.data.filter, {
      filter: this.contributions.filter,
      dynamicschema: this.data.dynamicschema,
    });

    this._concepts = new ResourceCollection();
    this._concepts.collection = this.data._embedded
      ? this.data._embedded.results.map(
          (concept) => new ConceptLinkModel(concept.concept, this.entryDate)
        )
      : [];
  }

  get type() {
    if (this.resourcetype === "RelatedConcepts") {
      return "RelatedConcepts";
    }

    return "ConceptIndex";
  }

  static isApplicableModel(data: Object) {
    const resourceType = get(data, "contributions.resourcetype");

    return (
      resourceType === "ConceptSearch" || resourceType === "relatedConcepts"
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
    const { href } = this.selflink;

    if (this.filterCollection.hasItems) {
      this.filterCollection.forEach((filter) => {
        filter.params.forEach((param) => {
          if (param.value) {
            href.setParameter(param.name, param.value);
          } else {
            href.removeParameter(param.name);
          }
        });
      });
    }

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
    return this.filterCollection.getFilterByAttributeKey("index");
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

  /**
   * get searchterm filter
   */
  get searchtermfilter() {
    return this.filterCollection.getFilterByAttributeKey("label");
  }

  /**
   * Get concept links found by index filter
   */
  get items() {
    return this._concepts;
  }

  /**
   * Replace the items collection
   */
  set items(itemCollection: ResourceCollection<ConceptLinkModel>) {
    this._concepts = itemCollection;
  }
}

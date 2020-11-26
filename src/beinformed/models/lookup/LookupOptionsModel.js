// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import LookupOptionCollection from "beinformed/models/lookup/LookupOptionCollection";
import FilterCollection from "beinformed/models/filters/FilterCollection";

import type { ModularUIResponse } from "beinformed/modularui";

export default class LookupOptionsModel extends ResourceModel {
  _options: LookupOptionCollection;
  _filterCollection: ?FilterCollection;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._options = LookupOptionCollection.create(
      this.data,
      this.contributions
    );

    this._filterCollection = this.createFilterCollection(
      this.data.filter,
      this.contributions.filter
    );
  }

  get type(): string {
    return "LookupOptions";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "lookupOptions"
    );
  }

  get options() {
    return this._options;
  }

  createFilterCollection(data: Object, contributions: Object) {
    if (data && contributions) {
      return new FilterCollection(
        { [data.name]: data },
        { filter: contributions }
      );
    }

    return new FilterCollection();
  }

  /**
   * Getting the filters
   */
  get filterCollection(): ?FilterCollection {
    return this._filterCollection;
  }
}

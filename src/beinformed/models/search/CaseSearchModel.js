// @flow
import ListModel from "beinformed/models/list/ListModel";

import type { ModularUIResponse } from "beinformed/modularui";
import type { FilterModel } from "beinformed/models";

/**
 * Case search model
 */
export default class CaseSearchModel extends ListModel {
  get type(): string {
    return "CaseSearch";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "CaseSearch"
    );
  }

  /**
   * Retrieve quick search filters
   */
  getQuickSearchFilters(): Array<FilterModel> {
    return this.filterCollection
      ? this.filterCollection.filter((filter) => filter.isQuickSearch())
      : [];
  }

  hasQuickSearchFilters(): boolean {
    return this.getQuickSearchFilters().length > 0;
  }
}

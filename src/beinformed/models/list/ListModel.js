// @flow
import { get, isNil } from "lodash";

import { ConfigurationException } from "beinformed/exceptions";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import ListItemCollection from "beinformed/models/list/ListItemCollection";
import ListDetailModel from "beinformed/models/list/ListDetailModel";
import ActionCollection from "beinformed/models/actions/ActionCollection";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import GroupingModel from "beinformed/models/grouping/GroupingModel";
import ListHeaderModel from "beinformed/models/list/ListHeaderModel";
import ListHref from "beinformed/models/href/ListHref";
import ListItemModel from "beinformed/models/list/ListItemModel";
import PagingModel from "beinformed/models/paging/PagingModel";
import ResourceModel from "beinformed/models/base/ResourceModel";
import SortingModel from "beinformed/models/sorting/SortingModel";
import {
  CASEVIEW_LINK,
  HIDE_WHEN_EMPTY,
  SHOW_ONE_RESULT_AS_DETAIL,
} from "beinformed/constants/LayoutHints";

import type { LinkModel, ModularUIModel } from "beinformed/models";

/**
 * Defines a list object
 */
export default class ListModel extends ResourceModel {
  _detail: ?ListDetailModel = null;
  _headers: Array<ListHeaderModel>;
  _paging: PagingModel;
  _filterCollection: FilterCollection;
  _sorting: SortingModel;
  _actionCollection: ActionCollection;
  _listItemCollection: ListItemCollection;
  _grouping: GroupingModel;
  _selfhref: ListHref;

  get type(): string {
    return "List";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      (data.contributions.resourcetype.endsWith("List") ||
        data.contributions.resourcetype.endsWith("ListPanel") ||
        [
          "DatastoreRelatedDatastorePanel",
          "list-related-cases",
          "CaseRelatedDataStorePanel",
          "RecordPanel",
          "EventHistoryPanel",
          "NotePanel",
          "AppointmentPanel",
          "DocumentPanel",
          "AssignmentPanel",
        ].includes(data.contributions.resourcetype))
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    if (
      this.layouthint.has(SHOW_ONE_RESULT_AS_DETAIL) &&
      this.listItemCollection.length === 1
    ) {
      return this.listItemCollection.map((listItem) => {
        const listDetailLink = listItem.selflink;
        listDetailLink.targetModel = ListDetailModel;
        return listDetailLink;
      });
    }

    return [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.detail = models.find((childModel) => childModel.type === "ListDetail");
  }

  /**
   * Getting the label of the list
   */
  get label(): string {
    return this.contributions.label;
  }

  /**
   * Getting the introduction text
   */
  get introtext(): string {
    if (this.contributions.texts) {
      const text = this.contributions.texts.find(
        (item) => item.type === "master"
      );

      return text ? text.text : "";
    }

    return "";
  }

  /**
   * Create a listitem collection from the data and contributions of a list
   */
  createListItemCollection(): ListItemCollection {
    const listitemCollection = new ListItemCollection();

    if (get(this.data, "_embedded", null) !== null) {
      if (Array.isArray(this.data._embedded)) {
        throw new ConfigurationException(
          `One record panel with multiple tables is not supported, place all types in one panel for the panel with key ${this.key}`
        );
      }

      listitemCollection.collection = this.data._embedded.results.map(
        (result) => this.createListItem(result)
      );
    }

    return listitemCollection;
  }

  /**
   * Create a ListItem
   */
  createListItem(resultItem: Object) {
    const [key] = Object.keys(resultItem);
    const listitemData = resultItem[key];
    const listitemContributions = this.contributions.results[key];

    if (this.data.dynamicschema) {
      listitemData.dynamicschema = this.data.dynamicschema;
    }

    const listitemModelInput = new ModularUIResponse();
    listitemModelInput.key = key;
    listitemModelInput.data = listitemData;
    listitemModelInput.contributions = listitemContributions;

    return new ListItemModel(listitemModelInput);
  }

  /**
   * Getting the results
   */
  get listItemCollection(): ListItemCollection {
    if (!this._listItemCollection) {
      this._listItemCollection = this.createListItemCollection();
    }

    return this._listItemCollection;
  }

  /**
   * Set results
   */
  set listItemCollection(listItemCollection: ListItemCollection) {
    this._listItemCollection = listItemCollection;
  }

  /**
   * Getting the detail
   */
  get detail(): ?ListDetailModel {
    return this._detail;
  }

  /**
   * Add detail model to the {ListModel}
   */
  set detail(detail: ?ModularUIModel) {
    if (detail instanceof ListDetailModel) {
      const listitemHref = detail.selfhref;

      const listitem = this.listItemCollection.find((listItem) =>
        listItem.selfhref.equals(listitemHref)
      );

      if (listitem) {
        detail.listitem = listitem;
      }

      this._detail = detail;
    }

    this.setSelfHref();
  }

  /**
   * Retrieve grouping information
   */
  get grouping(): GroupingModel {
    if (!this._grouping) {
      this._grouping = this.setGrouping();
    }

    return this._grouping;
  }

  setGrouping() {
    return new GroupingModel(
      { ...this.data.grouping, dynamicschema: this.data.dynamicschema },
      this.contributions.contexts
    );
  }

  hasGrouping() {
    return this.grouping.hasGroups();
  }

  /**
   * Check if list has results
   */
  hasResults(): boolean {
    return this.listItemCollection.hasItems;
  }

  get shouldHide() {
    return (
      this.layouthint.has(HIDE_WHEN_EMPTY) &&
      !this.hasResults() &&
      this.actionCollection.isEmpty &&
      !this.filterCollection.hasActiveFilters()
    );
  }

  /**
   * Get list item by ID
   */
  getListItemById(id: string | number) {
    const decodedId = decodeURIComponent(id.toString());
    return this.listItemCollection.find(
      (result) => result.id.toString() === decodedId
    );
  }

  /**
   * Get list item by Href
   */
  getListItemByHref(href: ListHref) {
    return this.listItemCollection.find((result) =>
      result.selfhref.equals(href)
    );
  }

  /**
   * Getting paging information
   */
  get paging(): PagingModel {
    if (!this._paging) {
      this._paging = this.setPaging();
    }
    return this._paging;
  }

  setPaging() {
    return new PagingModel(this.data.paging, this.contributions.paging);
  }

  /**
   * Getting sorting information
   */
  get sorting(): SortingModel {
    if (!this._sorting) {
      this._sorting = this.setSorting();
    }

    return this._sorting;
  }

  setSorting() {
    return new SortingModel(
      this.contributions,
      this.getSortingLabels(),
      this.grouping,
      this.data.sorting
    );
  }

  /**
   * Getting the filters
   */
  get filterCollection(): FilterCollection {
    if (!this._filterCollection) {
      this._filterCollection = this.setFilters();
    }

    return this._filterCollection;
  }

  /**
   * Set filterCollection
   */
  set filterCollection(filterCollection: FilterCollection) {
    this._filterCollection = filterCollection;
  }

  setFilters() {
    return new FilterCollection(this.data.filter, {
      listkey: this.key,
      filter: this.contributions.filter,
      contexts: this.contributions.contexts,
      dynamicschema: this.data.dynamicschema,
    });
  }

  /**
   * Indicates if list results are filtered
   */
  isFiltered(): boolean {
    return this.filterCollection.hasActiveFilters();
  }

  /**
   * Getting actions
   */
  get actionCollection(): ActionCollection {
    if (!this._actionCollection) {
      this._actionCollection = this.setActionCollection();
    }
    return this._actionCollection;
  }

  setActionCollection() {
    return new ActionCollection(this.data.actions, this.contributions.actions);
  }

  /**
   * Contains this model list data
   */
  hasList(): boolean {
    return !isNil(this.key);
  }

  /**
   * Sets self href from links collection
   */
  setSelfHref() {
    const selfLink = this.links ? this.links.getLinkByKey("self") : null;

    if (selfLink !== null) {
      return new ListHref(selfLink.href, this);
    }

    return new ListHref();
  }

  /**
   * Getting the self link of this list
   */
  get selfhref(): ListHref {
    if (!this._selfhref) {
      this._selfhref = this.setSelfHref();
    }
    return this._selfhref;
  }

  /**
   * Getting the headers of this list
   */
  get headers(): Array<ListHeaderModel> {
    if (!this._headers) {
      this._headers = this.setHeaders();
    }

    return this._headers;
  }

  /**
   * Set initial headers of list
   */
  setHeaders(): Array<ListHeaderModel> {
    const tempHeaders = [];

    if (this.contributions.results) {
      const { results } = this.contributions;

      Object.keys(results).forEach((key) => {
        results[key].attributes.forEach((attribute) => {
          const listHeader = new ListHeaderModel(attribute, this.sorting);

          const exists = tempHeaders.some((tempHeader) =>
            tempHeader.equals(listHeader)
          );

          if (!exists && !listHeader.layouthint.has(CASEVIEW_LINK)) {
            tempHeaders.push(listHeader);
          }
        });
      });
    }

    return tempHeaders;
  }

  getSortingLabels() {
    const sortingLabels = {};

    if (this.contributions.results) {
      const { results } = this.contributions;
      Object.keys(results).forEach((key) => {
        results[key].attributes.forEach((attribute) => {
          const attributeKey = Object.keys(attribute)[0];
          sortingLabels[attributeKey] = attribute[attributeKey].label;
        });
      });
    }

    return sortingLabels;
  }

  /**
   * Retrieve all actions by type
   */
  getActionsByType(actionType: string) {
    return this.actionCollection.getActionsByType(actionType);
  }
}

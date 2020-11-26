// @flow
import { isNil } from "lodash";
import Href from "beinformed/models/href/Href";

import type { HrefInput } from "./Href";

import type { ListModel, FilterCollection } from "beinformed/models";

/**
 * Class representing the href of a list. It adds paging, sorting and filter parameters where necessary
 * @extends Href
 */
export default class ListHref extends Href {
  _isPrefixed: boolean;
  _prefix: ?string;
  _pagingName: string;
  _pagesizeName: string;
  _sortingName: string;

  /**
   * Create a ListHref
   */
  constructor(href?: HrefInput, list?: ListModel, isPrefixed: boolean = true) {
    super(href);

    this._isPrefixed = isPrefixed;

    if (!isNil(list)) {
      this.setParameterNamesFromListModel(list);
    } else if (!isNil(href) && href instanceof ListHref) {
      this.setParameterNamesFromHref(href);
    }
  }

  /**
   * Retrieve parameter names from Href
   */
  setParameterNamesFromHref(href: ListHref) {
    this._prefix = this._isPrefixed ? href.prefix : null;
    this._pagingName = href.pagingName;
    this._pagesizeName = href.pagesizeName;
    this._sortingName = href.sortingName;
  }

  /**
   * Retrieve parameter names and settings from List model
   */
  setParameterNamesFromListModel(list: ListModel) {
    this._prefix = this._isPrefixed ? list.key : null;

    this._pagingName = list.paging ? list.paging.name : "";
    this._pagesizeName =
      list.paging && list.paging.pagesize ? list.paging.pagesize.name : "";

    this._sortingName = list.sorting ? list.sorting.name : "";

    this.page = list.paging ? list.paging.page : null;
    this.pagesize =
      list.paging && list.paging.pagesize.options.length > 0
        ? list.paging.pagesize.value
        : null;

    this.sort = list.sorting && list.sorting.param ? list.sorting.param : null;

    this.filterCollection = list.filterCollection;
  }

  /**
   * Getting prefix
   */
  get prefix(): ?string {
    return this._prefix;
  }

  /**
   * Getting paging name
   */
  get pagingName(): string {
    return this._pagingName;
  }

  /**
   * Getting pagesize name
   */
  get pagesizeName(): string {
    return this._pagesizeName;
  }

  /**
   * Getting sorting name
   */
  get sortingName(): string {
    return this._sortingName;
  }

  /**
   * Setting the current page
   */
  set page(page: ?number) {
    const pageValue = isNil(page) ? null : page.toString();

    this.setParameter(this.pagingName, pageValue, this.prefix);
  }

  get page() {
    return this.getParameter(this.pagingName, this.prefix);
  }

  /**
   * Setting the sort value
   */
  set sort(sort: ?string) {
    this.setParameter(this.sortingName, sort, this.prefix);
  }

  /**
   * Setting the page size
   */
  set pagesize(pagesize: ?number) {
    const pageSizeValue = isNil(pagesize) ? null : pagesize.toString();

    this.setParameter(this.pagesizeName, pageSizeValue, this.prefix);
  }

  /**
   * Add filter parameters to the parameter collection
   */
  set filterCollection(filters: FilterCollection) {
    if (!filters) {
      return;
    }

    filters.forEach((filter) => {
      filter.params.forEach((param) => {
        if (param.value) {
          this.setParameter(param.name, param.value, this.prefix);
        } else {
          this.removeParameter(param.name, this.prefix);
        }
      });
    });
  }
}

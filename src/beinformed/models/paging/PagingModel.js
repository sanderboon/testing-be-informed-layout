// @flow
import { has } from "lodash";
import PagesizeModel from "beinformed/models/paging/PagesizeModel";

export default class PagingModel {
  _contributions: Object;
  _paging: Object;
  _pagesize: PagesizeModel;
  _isEnabled: boolean;

  constructor(paging: Object, pagingContributions: Object) {
    this._isEnabled = has(paging, "page");

    this._contributions = pagingContributions;
    this._paging = paging;

    this._pagesize = new PagesizeModel(
      this.paging.pagesize,
      this.contributions.pagesize
    );
  }

  get contributions(): Object {
    return this._contributions || {};
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }

  /**
   * Getting paging information
   */
  get paging(): Object {
    return this._paging || {};
  }

  /**
   * Get the paging parameter name
   */
  get name(): string {
    return "page";
  }

  /**
   * Getting paging value
   */
  get value(): number {
    return this.page;
  }

  /**
   * Get maximum pages
   */
  get maxpages(): number {
    return this.paging.maxpages;
  }

  /**
   * Get current page
   */
  get page(): number {
    return this.paging.page;
  }

  /**
   * Set current page
   */
  set page(page: number) {
    this.paging.page = page;
  }

  /**
   * Get the total number of results
   */
  get totalResults(): number {
    return this.paging.totalresults || -1;
  }

  get pagesize(): PagesizeModel {
    return this._pagesize;
  }
}

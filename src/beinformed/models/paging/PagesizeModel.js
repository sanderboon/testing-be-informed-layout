// @flow
export default class PagesizeModel {
  _pagesize: number;
  _options: Array<number>;

  constructor(pagesize: number, pagesizeContributions: Object) {
    this._pagesize = pagesize;

    this._options =
      pagesizeContributions && pagesize ? pagesizeContributions.options : [];
  }

  /**
   * Getting the name
   */
  get name(): string {
    return "pagesize";
  }

  /**
   * Geting the value
   */
  get value(): number {
    return this._pagesize;
  }

  /**
   * Setting the page size
   */
  set value(pagesize: number) {
    this._pagesize = pagesize;
  }

  /**
   * Getting available pagesize options
   */
  get options(): Array<number> {
    return this._options;
  }
}

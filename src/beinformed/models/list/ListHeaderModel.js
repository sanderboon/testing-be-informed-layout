// @flow
import { isNil } from "lodash";

import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

import type SortingModel from "beinformed/models/sorting/SortingModel";
import type SortOptionModel from "beinformed/models/sorting/SortOptionModel";

/**
 * One header item of the list
 */
export default class ListHeaderModel {
  _key: string;
  _header: {
    label: string,
    type: string,
    layouthint: Array<string>,
  };
  _sortOption: ?SortOptionModel;

  /**
   * constructor
   */
  constructor(header: Object, sorting?: SortingModel) {
    const [headerKey] = Object.keys(header);

    this._key = headerKey;
    this._header = header[headerKey];
    this._sortOption =
      sorting && sorting.find((sortOption) => sortOption.key === headerKey);
  }

  /**
   * Get key
   */
  get key(): string {
    return this._key;
  }

  /**
   * Getting the label of this header item
   */
  get label(): string {
    return this._header.label;
  }

  /**
   * Getting the type of this header item. For instance string, date, etc.
   */
  get type(): string {
    return this._header.type;
  }

  /**
   * Getting the layout hints of this header item
   */
  get layouthint(): LayoutHintCollection {
    return new LayoutHintCollection(this._header.layouthint || []);
  }

  /**
   * Get alignment of header label
   */
  get alignment(): string {
    const alignment = this.layouthint.getByLayoutHint("align-");
    return alignment === null ? "left" : alignment.substring("align-".length);
  }

  equals(listHeader: ListHeaderModel) {
    return listHeader.key === this.key;
  }

  get sortOption() {
    return this._sortOption;
  }

  hasSorting() {
    return !isNil(this.sortOption);
  }
}

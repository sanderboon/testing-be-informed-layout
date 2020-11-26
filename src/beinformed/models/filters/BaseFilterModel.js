// @flow
import BaseModel from "beinformed/models/base/BaseModel";
import createAttribute from "beinformed/models/attributes/_createAttribute";
import { PARAMETER_SEPARATOR } from "beinformed/constants/Constants";

import type { FilterAttributeType } from "beinformed/models";

/**
 * Base class for filters
 */
export default class BaseFilterModel extends BaseModel {
  _attribute: FilterAttributeType;
  _context: Object;
  _listKey: string;

  constructor(data: Object, contributions: Object) {
    super(data, contributions);

    // $FlowFixMe
    this._attribute = this.createAttribute();

    if (this.contributions.listKey) {
      this.listkey = this.contributions.listKey;
    }
  }

  /**
   * Get the type of a filter.
   */
  get type() {
    return this.contributions.type
      ? this.contributions.type.replace("filter", "")
      : "string";
  }

  /**
   * Create attribute through the attribute factory. Create type based on filter key without the filter suffix
   */
  createAttribute() {
    if (this.type === "assignment") {
      return null;
    }

    return createAttribute(this.data.name || this.data.param, this.data, {
      ...this.contributions,
      type: this.type,
    });
  }

  /**
   * Getting context data
   */
  get context() {
    return this._context;
  }

  /**
   * Set context of filter
   */
  set context(context: Object) {
    this._context = context;

    if (this.contextLabel !== "" && this.attribute !== null) {
      this.attribute.label = `${this.attribute.label} (${this.contextLabel})`;
    }
  }

  /**
   * Getting the context label
   */
  get contextLabel() {
    return this.context ? this.context.label || "" : "";
  }

  /**
   * Getting key of the list these filters apply to
   */
  get listkey() {
    return this._listKey;
  }

  /**
   * Set key of list this filter belongs to
   */
  set listkey(key: string) {
    this._listKey = key;
  }

  /**
   * Getting the label of the filter
   */
  get label() {
    return this.contributions.label || "";
  }

  /**
   * Getting the name of the filter
   */
  get name() {
    if (this.listkey) {
      return this.listkey + PARAMETER_SEPARATOR + this.param;
    }

    return this.param;
  }

  /**
   * Getting the param name of the filter
   */
  get param() {
    return this.data.param || this.data.name;
  }

  /**
   * Get attribute of filter
   */
  get attribute(): FilterAttributeType {
    return this._attribute;
  }

  /**
   * Retrieve the parameters with it's value for this filter
   * @return {Array.<{name: String, value: *}>}
   */
  get params() {
    if (!this.param) {
      return [];
    }

    return [
      {
        name: this.param,
        value: this.attribute.value,
      },
    ];
  }

  /**
   * Reset the value of this filter to undefined
   * @return {FilterModel}
   */
  reset() {
    this.attribute.reset();

    return this;
  }

  /**
   * Update this filter with input name and value
   */
  update(attribute: FilterAttributeType, value: string) {
    this.attribute.update(value);
  }

  /**
   * Inidicates if filter is a quick search filter
   */
  isQuickSearch() {
    return this.contributions.quicksearch === true;
  }

  /**
   * Inidiates if filter is active
   */
  isActive() {
    return this.attribute && this.attribute.initvalue !== null;
  }

  /**
   * Inidiates if filter is valid
   */
  get isValid() {
    return this.attribute && this.attribute.isValid;
  }

  get readonlyvalue() {
    return this.attribute && this.attribute.readonlyvalue;
  }
}

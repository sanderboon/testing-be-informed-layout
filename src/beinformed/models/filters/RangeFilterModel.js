// @flow
import BaseFilterModel from "beinformed/models/filters/BaseFilterModel";

import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";
import type { FilterAttributeType } from "beinformed/models";

/**
 * Range filter, for instance a date range filter or a number range filter
 */
export default class RangeFilterModel extends BaseFilterModel {
  update(attribute: FilterAttributeType, value: string) {
    if (this.attribute instanceof CompositeAttributeModel) {
      this.attribute.update(value, attribute);
    } else {
      this.attribute.update(value);
    }
  }

  get params() {
    if (this.attribute instanceof CompositeAttributeModel) {
      return this.attribute.children.map((child) => {
        const { param } = this.data[child.name];
        return {
          name: param,
          value: child.value,
        };
      });
    }

    return [];
  }
}

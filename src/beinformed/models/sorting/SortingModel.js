// @flow
import { has } from "lodash";

import BaseCollection from "beinformed/models/base/BaseCollection";
import SortOptionModel from "beinformed/models/sorting/SortOptionModel";
import ListHref from "beinformed/models/href/ListHref";

import type { GroupingModel } from "beinformed/models";

class SortingModel extends BaseCollection<SortOptionModel> {
  constructor(
    contributions: Object,
    labels: { [key: string]: string },
    grouping: GroupingModel,
    currentSort: string
  ) {
    super();

    if (has(contributions, "sorting.attributes")) {
      this.collection = contributions.sorting.attributes.map((attributeKey) => {
        const label = labels[attributeKey];
        const group = grouping && grouping.getGroupByAttributeKey(attributeKey);

        return new SortOptionModel(attributeKey, label, group);
      });

      this.setSelected(currentSort);
    }
  }

  get name(): string {
    return "sort";
  }

  get value() {
    return this.filter((option) => option.selected)
      .map((option) => option.value)
      .join(",");
  }

  get param(): string {
    return this.value;
  }

  get options() {
    return this.collection;
  }

  setSelected(currentSort: string = "") {
    currentSort.split(",").forEach((sortItem) => {
      const [key, direction] = sortItem.split(" ");

      this.collection.forEach((option) => {
        if (option.key === key) {
          option.selected = true;
          option.sortorder = direction;
        }
      });
    });
  }

  getUpdateQuerystring(sortOption: SortOptionModel) {
    const optionKey = sortOption.key;

    return this.filter((option) => option.key === optionKey)
      .map((option) =>
        option.key === optionKey ? option.oppositeValue : option.value
      )
      .join(",");
  }

  createListHref(listHref: ListHref, sortOption: SortOptionModel) {
    const listhref = new ListHref(listHref);
    const hasPage = listhref.prefix
      ? listhref.hasParameter("page", listhref.prefix)
      : listhref.hasParameter("page");
    if (hasPage) {
      listhref.page = 1;
    }
    listhref.sort = this.getUpdateQuerystring(sortOption);

    return listhref;
  }
}

export default SortingModel;

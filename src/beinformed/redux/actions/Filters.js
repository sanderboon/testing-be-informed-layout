// @flow
import { requestList } from "beinformed/redux/actions/List";
import { updateModel } from "beinformed/redux/actions/ModularUI";

import type { AttributeType, ListModel } from "beinformed/models";

/**
 * handles the submit of the filters by executing the list action submitFilters
 */
export const submitFilter = (list: ListModel) => {
  if (!list.filterCollection.isValid) {
    return updateModel(list);
  }

  const href = list.selfhref;

  if (href.page && href.page > 1) {
    href.page = 1;
  }
  href.filterCollection = list.filterCollection;

  return requestList(href);
};

/**
 * Handle change of a filter
 */
export const changeFilterItem = (
  list: ListModel,
  attribute: AttributeType,
  inputvalue: string
) => {
  const newList = list.clone();

  newList.filterCollection.update(attribute, inputvalue);

  if (
    attribute.type === "choice" ||
    attribute.type === "lookup" ||
    attribute.type === "boolean"
  ) {
    return submitFilter(newList);
  }

  return updateModel(newList);
};

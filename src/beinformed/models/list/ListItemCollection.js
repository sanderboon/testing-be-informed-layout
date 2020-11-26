// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import ActionCollection from "beinformed/models/actions/ActionCollection";

import type { ListItemModel } from "beinformed/models";

/**
 * Collection of list items
 */
class ListItemCollection extends BaseCollection<ListItemModel> {
  get additionalDetailRoutePath() {
    if (this.isEmpty) {
      return "__NON_EXISTING_ROUTE__";
    }

    const allRoutes = this.all
      .map((listItem) => listItem.additionalDetailRoutePath)
      .join("|");

    if (allRoutes.includes("|")) {
      return `(${allRoutes})`;
    }

    return allRoutes;
  }

  get actionCollection() {
    const actions = new ActionCollection();

    this.all.forEach((listItem) => {
      actions.collection.push(...listItem.actionCollection.all);
    });

    return actions;
  }
}

export default ListItemCollection;

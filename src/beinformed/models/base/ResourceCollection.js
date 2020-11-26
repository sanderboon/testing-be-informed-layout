// @flow
import { isFunction } from "lodash";
import BaseCollection from "beinformed/models/base/BaseCollection";

import type { ModularUIModel } from "beinformed/models";

/**
 * The ResourceCollection makes it possible to add child models to a collection of models
 * These child models are fetched using the ModularUI util
 */
class ResourceCollection<T> extends BaseCollection<T> {
  /**
   * Retrieve all child model links and flatten it into an array with single entries, removing all undefined items
   */
  getInitialChildModelLinks() {
    const initialChildModelLinks = [];

    this.collection.forEach((item: T) => {
      if (
        item &&
        item.getInitialChildModelLinks &&
        isFunction(item.getInitialChildModelLinks)
      ) {
        initialChildModelLinks.push(...item.getInitialChildModelLinks());
      }
    });

    return initialChildModelLinks;
  }

  /**
   * Pass through models for setchildmodels to items of this collection
   */
  setChildModels(models: Array<ModularUIModel>) {
    this.collection.forEach((item) => {
      if (item && item.setChildModels && isFunction(item.setChildModels)) {
        item.setChildModels(models);
      }
    });
  }
}

export default ResourceCollection;

// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";

import type { TaskGroupModel } from "beinformed/models";

/**
 * Collection of taskgroup models
 */
export default class TaskGroupCollection extends BaseCollection<TaskGroupModel> {
  /**
   * Indicates if the taskgroup collection has has tasks
   */
  hasTasks(): boolean {
    return (
      this.hasItems &&
      this.collection.some((taskgroup) => taskgroup.actionCollection.length > 0)
    );
  }
}

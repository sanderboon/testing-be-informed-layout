// @flow
import ActionCollection from "beinformed/models/actions/ActionCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * TaskGroupModel
 */
export default class TaskGroupModel extends ResourceModel {
  _key: string;
  _actionCollection: ActionCollection;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );

    const selfHref = this.links.getLinkByKey("self")
      ? this.selflink.href.href
      : null;

    this._key = selfHref
      ? selfHref.substring(selfHref.lastIndexOf("/") + 1)
      : this.data.name;
  }

  static create(key: string, data: Object, contributions: Object) {
    const taskgroup = new ModularUIResponse();
    taskgroup.key = key;
    taskgroup.data = data;
    taskgroup.contributions = contributions;

    return new TaskGroupModel(taskgroup);
  }

  get type(): string {
    return "TaskGroup";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "TaskGroup"
    );
  }

  /**
   * Get the key of the TaskGroup
   */
  get key(): string {
    return this._key;
  }

  /**
   * Get the label of the TaskGroup
   */
  get label(): string {
    return this.contributions.label;
  }

  /**
   * Retrieve actions of taskgroup
   */
  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }
}

// @flow
import { isNil } from "lodash";

import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";
import ActionCollection from "beinformed/models/actions/ActionCollection";

import type {
  ModularUIModel,
  LinkCollection,
  LinkModel,
} from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";

/**
 * Describes a TabModel
 */
export default class TabModel extends ResourceModel {
  _actionCollection: ActionCollection;
  _taskGroupCollection: TaskGroupCollection;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this.createTaskGroupCollection();

    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );
  }

  get type(): string {
    return "Tab";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      (data.contributions.resourcetype.endsWith("Tab") ||
        data.contributions.resourcetype.endsWith("KnowledgeBank"))
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    return this.links.getLinksByGroup("taskgroup", "actions").all;
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.taskGroupCollection.add(
      // $FlowFixMe
      models.filter((model) => model.type === "TaskGroup")
    );
  }

  get searchLink(): LinkModel {
    return this.links.getLinksByGroup("search").first;
  }

  createTaskGroupCollection() {
    this.taskGroupCollection = this.data.taskgroups
      ? this.data.taskgroups
          .map((taskgroup) => {
            const taskgroupContributions = this.contributions.taskgroups.find(
              (taskgroupContribution) =>
                taskgroupContribution.name === taskgroup.name
            );

            if (taskgroupContributions) {
              return TaskGroupModel.create(
                taskgroup.name,
                taskgroup,
                taskgroupContributions
              );
            }

            return null;
          })
          .filter((taskgroup) => !isNil(taskgroup))
      : [];
  }

  /**
   * Getting the taskgrouppanels on the tab
   */
  get taskGroupCollection(): TaskGroupCollection {
    return this._taskGroupCollection;
  }

  /**
   * Setting the taskgroup panel collection
   */
  set taskGroupCollection(taskgroups: Array<TaskGroupModel>) {
    this._taskGroupCollection = new TaskGroupCollection(taskgroups);
  }

  /**
   * Getting the label of the tab
   */
  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Getting the component links on the tab
   */
  get components(): LinkCollection {
    return this.links.getLinksByGroup("component", "search");
  }

  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }

  /**
   * Has component links
   */
  hasComponents() {
    return this.components.size > 0;
  }

  /**
   * Has taskgroups
   */
  hasTaskGroups() {
    return this.taskGroupCollection && this.taskGroupCollection.hasItems;
  }

  hasActions() {
    return this.actionCollection && this.actionCollection.hasItems;
  }
}

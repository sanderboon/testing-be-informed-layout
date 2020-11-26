// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";

import { get } from "lodash";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";

import type { ModularUIResponse } from "beinformed/modularui";
import type {
  ModularUIModel,
  LinkModel,
  LinkCollection,
} from "beinformed/models";

/**
 * Panel that groups other panels
 */
export default class GroupingPanelModel extends ResourceModel {
  _taskGroupCollection: TaskGroupCollection;

  /**
   * Constructs GroupingPanel
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this.createTaskGroupCollection();
  }

  get type(): string {
    return "GroupingPanel";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      ["GroupingPanel", "CaseTabGroupingPanel"].includes(
        data.contributions.resourcetype
      )
    );
  }

  /**
   * Getting the label of the panel
   */
  get label(): string {
    return this.contributions.label;
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    return this.links.getLinksByGroup("taskgroup").all;
  }

  get panelLinks(): LinkCollection {
    return this.links.getLinksByGroup("panel");
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.taskGroupCollection.add(
      // $FlowFixMe
      models.filter((model) => model.type === "TaskGroup")
    );
  }

  /**
   * Check if an introtext exists for this caseview
   * @return {boolean}
   */
  hasIntroText(): boolean {
    return (
      this.contributions.texts &&
      this.contributions.texts.find((item) => item.type === "master")
    );
  }

  /**
   * Getting the introduction text configured on the grouping panel
   */
  get introtext(): string {
    if (this.contributions.texts) {
      const text = this.contributions.texts.find(
        (item) => item.type === "master"
      );

      return text ? text.text : "";
    }

    return "";
  }

  createTaskGroupCollection() {
    this.taskGroupCollection = get(this.data, "taskgroups", [])
      .filter((taskgroup) =>
        get(this.contributions, "taskgroups", []).some(
          (taskgroupContribution) =>
            taskgroupContribution.name === taskgroup.name
        )
      )
      .map((taskgroup) => {
        const taskgroupContributions = get(
          this.contributions,
          "taskgroups",
          []
        ).find(
          (taskgroupContribution) =>
            taskgroupContribution.name === taskgroup.name
        );

        return TaskGroupModel.create(
          taskgroup.name,
          taskgroup,
          taskgroupContributions
        );
      });
  }

  /**
   * Setting the taskgroup panel collection
   */
  set taskGroupCollection(taskgroups: Array<TaskGroupModel>) {
    this._taskGroupCollection = new TaskGroupCollection(taskgroups);
  }

  /**
   * Getting the taskgrouppanels on the tab
   */
  get taskGroupCollection(): TaskGroupCollection {
    return this._taskGroupCollection;
  }

  /**
   * Has taskgroups
   */
  hasTaskGroups(): boolean {
    return this.taskGroupCollection && this.taskGroupCollection.hasItems;
  }

  /**
   * Has tasks
   */
  hasTasks(): boolean {
    return this.taskGroupCollection.hasTasks();
  }
}

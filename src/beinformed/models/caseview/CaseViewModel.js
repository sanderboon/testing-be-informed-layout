// @flow
import { get } from "lodash";

import DetailModel from "beinformed/models/detail/DetailModel";
import Href from "beinformed/models/href/Href";
import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";

import { TITLE } from "beinformed/constants/LayoutHints";

import type {
  ModularUIModel,
  LinkCollection,
  LinkModel,
  AttributeType,
} from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";
/**
 * Model containing the details of one case.
 */
export default class CaseViewModel extends DetailModel {
  _taskGroupCollection: TaskGroupCollection;

  constructor(caseviewData: ModularUIResponse) {
    super(caseviewData);

    this.createTaskGroupCollection();
  }

  get type(): string {
    return "CaseView";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "CaseView"
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    return this.links.getLinksByGroup("taskgroup").all;
  }

  /**
   * Getting panel links
   */
  get panelLinks(): LinkCollection {
    return this.links.getLinksByGroup("panel");
  }

  setChildModels(models: Array<ModularUIModel>) {
    super.setChildModels(models);

    this.taskGroupCollection.add(
      // $FlowFixMe
      models.filter((model) => model.type === "TaskGroup")
    );
  }

  /**
   * Getting the case name
   */
  get casename(): ?AttributeType {
    return this.attributeCollection.getAttributeByLayoutHint(TITLE);
  }

  get label(): string {
    return this.casename ? this.casename.value : "";
  }

  /**
   * Check if an introtext exists for this caseview
   * @return {boolean}
   */
  hasIntroText(): boolean {
    return this.introtext !== "";
  }

  /**
   * Getting the introduction text configured on the case view
   */
  get introtext(): string {
    if (this.contributions.texts) {
      const text = this.contributions.texts.find(
        (item) => item.type === "master"
      );

      if (text) {
        return text.text;
      }
    }

    return "";
  }

  /**
   * Getting the self href
   * @return {Href}
   */
  get selfhref(): Href {
    const selfLink = this.links.getLinkByKey("self");

    if (selfLink === null) {
      throw new Error("No self href available");
    }

    return new Href(selfLink.href);
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
}

// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import LinkModel from "beinformed/models/links/LinkModel";
import UserServicesModel from "beinformed/models/user/UserServicesModel";

import { NotAllowedUriException } from "beinformed/exceptions";

import type { ModularUIModel, LinkCollection } from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";
/**
 * The Application model
 */
export default class ApplicationModel extends ResourceModel {
  _userServices: ?UserServicesModel;

  get type(): string {
    return "Application";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "Application"
    );
  }

  getInitialChildModelLinks() {
    const userService = this.links.getLinkByKey("UserServices");
    if (userService && userService.href.path === "/login") {
      throw new NotAllowedUriException(
        "The user service (Login panel) should not have the uri '/login', use a different URI because this uri matches the login service."
      );
    }

    return userService ? [userService] : [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    const userServiceModel = models.find(
      (model) => model.type === "UserServices"
    );

    if (userServiceModel) {
      this.userServices = userServiceModel;
    }
  }

  /**
   * Getting the label of the application
   */
  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Getting the tab links
   */
  get tabs(): LinkCollection {
    return this.links.getLinksByGroup("tab");
  }

  /**
   * Get modelcatalog link
   */
  get modelcatalog(): LinkModel {
    return LinkModel.create("modelcatalog", "/modelcatalog", "Model catalog");
  }

  /**
   * Set the userservices for this application
   */
  set userServices(model: ?ModularUIModel) {
    this._userServices = model instanceof UserServicesModel ? model : null;
  }

  /**
   * returns the userservices configured for this application
   */
  get userServices(): ?UserServicesModel {
    return this._userServices ? this._userServices : null;
  }
}

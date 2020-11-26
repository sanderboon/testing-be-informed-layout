// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import UserModel from "beinformed/models/user/UserModel";

import Cache from "beinformed/utils/browser/Cache";

import type { ModularUIModel, LinkModel, Href } from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";

/**
 * UserServicesModel model
 */
class UserServicesModel extends ResourceModel {
  _user: ?UserModel;

  get type(): string {
    return "UserServices";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "user_services"
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    const userData = this.links.getLinkByKey("Userdata");
    return userData ? [userData] : [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.user = models.find((model) => model.type === "User");
  }

  /**
   * return the user for the current user
   */
  get user(): ?UserModel {
    return this._user || null;
  }

  /**
   * Set user data
   */
  set user(model: ?ModularUIModel) {
    this._user = model instanceof UserModel ? model : null;
  }

  /**
   * Getting the label of the application
   */
  get label(): string {
    return this.contributions.label || "";
  }

  get changePassword(): ?Href {
    const changePasswordLink = this.links.getLinkByKey("ChangePassword");

    if (changePasswordLink) {
      return changePasswordLink.href;
    }

    return null;
  }

  // when more than three unsecure links are present (always present: self, contributions and api-docs),
  // the userservice is permitted and thus the user is logged in
  get isLoggedIn() {
    const hasUser = this.user instanceof UserModel;

    const UNSECURE_LINK_COUNT = 3;
    return (
      this.links.length > UNSECURE_LINK_COUNT ||
      Cache.hasItem("basic") ||
      hasUser
    );
  }
}

export default UserServicesModel;

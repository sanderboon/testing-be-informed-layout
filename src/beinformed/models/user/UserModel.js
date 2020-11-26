// @flow
import { has } from "lodash";

import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";

import type { ModularUIResponse } from "beinformed/modularui";

/**
 * User model
 */
export default class UserModel extends ResourceModel {
  _attributeCollection: AttributeCollection;

  /**
   * constructor
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    const attributeContributions = this.contributions.attributes
      ? this.contributions.attributes.filter((contribution) => {
          const [key] = Object.keys(contribution);
          return key !== "sessiondata" && has(this.data, key);
        })
      : [];

    this._attributeCollection = new AttributeCollection(
      this.data,
      attributeContributions
    );
  }

  get type(): string {
    return "User";
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "userdata"
    );
  }

  /**
   * Retrieve username of user
   */
  get username(): string {
    return this.data.Username || "Guest";
  }

  /**
   * returns all the attributes from the attribute collection
   */
  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  /**
   * retrieve the fullname of the user
   */
  get fullname(): string {
    return this.data.Fullname || "Guest";
  }

  get label(): string {
    return this.contributions.label;
  }
}

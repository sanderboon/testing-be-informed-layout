// @flow
import BaseFilterModel from "beinformed/models/filters/BaseFilterModel";
import createAttribute from "beinformed/models/attributes/_createAttribute";

import type { AttributeType } from "beinformed/models";
/**
 * Assignment filter consists of two filters: assignment type and user filter
 */
export default class AssignmentFilterModel extends BaseFilterModel {
  _listKey: string;
  _assignmenttype: ?AttributeType;
  _user: ?AttributeType;

  /**
   * Construct an assignment filter
   */
  constructor(data: Object, contributions: Object) {
    super(data, contributions);

    this._assignmenttype = this.createAssignmentTypeModel();
    this._user = this.createUserModel();
  }

  get key() {
    return this.data.name;
  }

  /**
   * Getting key of the list these filters apply to
   */
  get listkey() {
    return this._listKey;
  }

  /**
   * Set key of list this filter belongs to
   */
  set listkey(key: string) {
    this._listKey = key;
  }

  /**
   * Creates an assignmenttype model when assignmenttype json is present
   */
  createAssignmentTypeModel() {
    const key = `${this.contributions.contextid || ""}ASSIGNMENTTYPE`;
    const assignmentTypeData = this.data[key];

    if (this.data.dynamicschema && this.data.dynamicschema[key]) {
      assignmentTypeData.dynamicschema = {
        [key]: this.data.dynamicschema[key],
      };
    }

    const assignmentTypeContributions = {
      ...this.contributions[key],
      type: "choice",
      enumerated: true,
      optionMode: assignmentTypeData._links ? "lookup" : "static",
    };

    return createAttribute(
      assignmentTypeData.name || assignmentTypeData.param,
      assignmentTypeData,
      assignmentTypeContributions
    );
  }

  /**
   * Creates an assignmenttype model when userkey json is present
   */
  createUserModel() {
    const key = `${this.contributions.contextid || ""}USERKEY`;
    const userData = this.data[key];

    if (this.data.dynamicschema && this.data.dynamicschema[key]) {
      userData.dynamicschema = {
        [key]: this.data.dynamicschema[key],
      };
    }

    const userContributions = {
      ...this.contributions[key],
      type: "choice",
      optionMode: userData._links ? "lookup" : "static",
    };

    return createAttribute(
      userData.name || userData.param,
      userData,
      userContributions
    );
  }

  /**
   * The assignment filter consists of two part. This method return the assignment type attribute
   */
  get assignmenttype() {
    return this._assignmenttype;
  }

  /**
   * The assignment filter consists of two part. This method return the user identifier attribute
   */
  get user() {
    return this._user;
  }

  /**
   * Getting the parameters of this filter
   */
  get params() {
    if (this.assignmenttype && this.user) {
      return [
        {
          name: this.assignmenttype.name,
          value: this.assignmenttype.value,
        },
        {
          name: this.user.name,
          value: this.user.value,
        },
      ];
    }

    return [];
  }

  /**
   * Reset the values within the filter
   */
  reset() {
    if (this.assignmenttype) {
      this.assignmenttype.reset();
    }
    if (this.user) {
      this.user.reset();
    }

    return this;
  }

  /**
   * Update this filter
   */
  update(attribute: AttributeType, value: string) {
    if (this.user && this.user.key === attribute.key) {
      this.user.update(value);
    } else if (
      this.assignmenttype &&
      this.assignmenttype.key === attribute.key
    ) {
      this.assignmenttype.update(value);
    }
  }

  /**
   * Inidiates if filter is active
   */
  isActive() {
    return (
      (this.assignmenttype && this.assignmenttype.initvalue !== null) ||
      (this.user && this.user.initvalue !== null)
    );
  }

  /**
   * Inidiates if filter is valid
   */
  get isValid() {
    return (
      this.assignmenttype &&
      this.user &&
      this.assignmenttype.isValid &&
      this.user.isValid
    );
  }
}

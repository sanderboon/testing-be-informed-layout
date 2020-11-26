// @flow
import { isNil, has, get } from "lodash";

import ProcessStatusSettingsModel from "beinformed/models/process/ProcessStatusSettingsModel";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import BaseModel from "beinformed/models/base/BaseModel";
import Href from "beinformed/models/href/Href";

import { HTTP_METHODS } from "beinformed/constants/Constants";
import {
  CREATE_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
} from "beinformed/constants/LayoutHints";

import type { Node } from "react";
import type { HttpMethods } from "beinformed/constants";
import type { AttributeType } from "beinformed/models";

/**
 * Defines an Action. For instance an action on the tab 'books', which leads to a form
 */
export default class ActionModel extends BaseModel {
  _fieldCollection: AttributeCollection;
  _href: Href;
  _icon: Node;

  /**
   * Create an ActionModel
   */
  constructor(data: Object, contributions: Object) {
    super(data, contributions);

    this._fieldCollection = new AttributeCollection(
      this.data.fields,
      this.contributions.fields
    );
  }

  static createFromHref(
    name: string,
    href: string,
    label: string,
    type: string = "form"
  ) {
    return new ActionModel(
      {
        name,
        href,
      },
      {
        name,
        label: label || name,
        type,
      }
    );
  }

  get isDisabled() {
    return isNil(this.data.href);
  }

  /**
   * retrieve href of action
   */
  get selfhref(): Href {
    return (
      this._href || new Href(`${this.data.href}?${this.querystring}`, "Form")
    );
  }

  set selfhref(href: Href) {
    this._href = href;
  }

  /**
   * retrieve request method
   */
  get method(): HttpMethods {
    return this.data.method || HTTP_METHODS.POST;
  }

  /**
   * Retrieve type of method
   */
  get type(): string {
    if (this.layouthint.has(CREATE_ACTION)) {
      return "create";
    }
    if (this.layouthint.has(UPDATE_ACTION)) {
      return "update";
    }
    if (this.layouthint.has(DELETE_ACTION)) {
      return "delete";
    }

    return this.contributions.type || "general";
  }

  /**
   * Retrieve name of action
   */
  get name(): string {
    return this.data.name || "unknown";
  }

  /**
   * retrieve the collection of field attributes as an array
   */
  get fields(): Array<AttributeType> {
    return this._fieldCollection.all;
  }

  /**
   * Retrieve the field collection
   */
  get fieldCollection(): AttributeCollection {
    return this._fieldCollection;
  }

  set fieldCollection(fieldCollection: AttributeCollection) {
    this._fieldCollection = fieldCollection;
  }

  /**
   * Retrieve querystring of action
   */
  get querystring(): string {
    return this.fields
      .filter((attribute) => !isNil(attribute.value) && attribute.value !== "")
      .map((attribute) => {
        const { value } = attribute;
        if (value !== null) {
          return `${attribute.name}=${value}`;
        }
        return attribute.name;
      })
      .join("&");
  }

  /**
   * Retrieve a field by it's key
   */
  getFieldByKey(key: string) {
    return this._fieldCollection.getAttributeByKey(key);
  }

  /**
   * Indicates if field exists by the given key
   */
  hasFieldByKey(key: string) {
    return this.getFieldByKey(key) !== null;
  }

  /**
   * Getting the key/name of this action
   */
  get key(): string {
    return this.data.name;
  }

  /**
   * Getting the label of the action
   */
  get label(): string {
    return this.contributions.label || this.key;
  }

  get isProcessTask(): boolean {
    return has(this.contributions, "processTask");
  }

  get processStatus(): ProcessStatusSettingsModel | null {
    if (this.isProcessTask) {
      return new ProcessStatusSettingsModel(
        get(this.data, "processStatus", {}),
        get(this.contributions, "processTask", {})
      );
    }

    return null;
  }

  get icon(): Node {
    return this._icon;
  }

  set icon(icon: Node) {
    this._icon = icon;
  }
}

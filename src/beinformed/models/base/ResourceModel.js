// @flow
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import BaseModel from "beinformed/models/base/BaseModel";
import LinkCollection from "beinformed/models/links/LinkCollection";

import { IllegalArgumentException } from "beinformed/exceptions";

import type { ModularUIModel, Href, LinkModel } from "beinformed/models";

/**
 * Base model
 */
class ResourceModel extends BaseModel {
  _key: string;
  _locale: string;
  _childModels: Array<ModularUIModel>;
  _links: LinkCollection;
  _lastServerUpdate: number;

  /**
   * constructor
   */
  constructor(modularuiResponse: ModularUIResponse = new ModularUIResponse()) {
    super(modularuiResponse.data, modularuiResponse.contributions);

    this._key = modularuiResponse.key;
    this._locale = modularuiResponse.locale;

    this._childModels = [];

    this._lastServerUpdate = Date.now();
  }

  /**
   * Returns true when the model is supported based on configuration found in contributions
   * @abstract
   */
  static isApplicableModel(data: ModularUIResponse) {
    if (!(data instanceof ModularUIResponse)) {
      throw new IllegalArgumentException(
        "Given argument for isApplicableModel is not a ModularUIResponse"
      );
    }

    throw new Error("No isApplicableModel condition set on resourcemodel");
  }

  get lastServerUpdate() {
    return this._lastServerUpdate;
  }

  set lastServerUpdate(lastServerUpdate: number) {
    this._lastServerUpdate = lastServerUpdate;
  }

  get locale(): string {
    return this._locale;
  }

  /**
   * Retrieve key
   */
  get key(): string {
    return this._key;
  }

  /**
   * Get type of model
   * @abstract
   */
  get type(): string {
    throw new Error(`No type set on the resource model with key ${this.key}`);
  }

  /**
   * Retrieve type of resource
   */
  get resourcetype(): string {
    return this.contributions.resourcetype;
  }

  /**
   * Getting the links of the resource
   */
  get links(): LinkCollection {
    if (!this._links) {
      this._links = new LinkCollection(
        Array.isArray(this.data._links)
          ? this.data._links[0]
          : this.data._links,
        {
          self: {
            resourcetype: this.resourcetype,
          },
          ...this.contributions._links,
        }
      );
    }
    return this._links;
  }

  set links(links: LinkCollection) {
    this._links = links;
  }

  /**
   * Get self link of model
   */
  get selflink(): LinkModel {
    const selflink = this.links.getLinkByKey("self");

    if (selflink === null) {
      throw new Error(
        `Could not find self link for ${
          this.key === null ? "unknown" : this.key
        }`
      );
    }

    return selflink;
  }

  /**
   * Return default self link of resource
   */
  get selfhref(): Href {
    return this.selflink.href;
  }

  /**
   * Add links to expand on initialization of this model
   * @abstract
   */
  getInitialChildModelLinks() {
    return [];
  }

  /**
   * Retrieve links of expanded child models
   */
  get childModels(): Array<ModularUIModel> {
    return this._childModels;
  }

  /**
   * Add child models to this model
   */
  addChildModels(models: Array<ModularUIModel>) {
    const flattenModels = [].concat(...models);

    this._childModels = flattenModels;

    this.setChildModels(flattenModels);

    return this;
  }

  /**
   * Template to set expanded child models
   * Use this hook to separate the retrieved child models into the correct models.
   *
   * @abstract
   * @example <caption>Put all models of instance List and GroupingPanel into the panels property</caption>
   */
  setChildModels(models: Array<ModularUIModel>) {
    if (!models) {
      throw new IllegalArgumentException("No models send to setChildModels");
    }
  }

  dehydrate() {
    return {
      ...super.dehydrate(),
      key: this._key,
      locale: this._locale,
      childModels: this._childModels.map<ModularUIModel>((childModel) =>
        childModel.dehydrate()
      ),
    };
  }
}

export default ResourceModel;

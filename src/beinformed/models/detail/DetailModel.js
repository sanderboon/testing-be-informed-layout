// @flow
import { get, has } from "lodash";

import ActionCollection from "beinformed/models/actions/ActionCollection";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";

import { TITLE } from "beinformed/constants/LayoutHints";

import type { ModularUIResponse } from "beinformed/modularui";
import type {
  ModularUIModel,
  LinkModel,
  AttributeType,
} from "beinformed/models";

/**
 * Base class for details<br/>
 * For instance the details of case 1<br/>
 * For instance the details of record 12<br/>
 */
export default class DetailModel extends ResourceModel {
  _attributeCollection: AttributeCollection;
  _metadataCollection: AttributeCollection;
  _actionCollection: ActionCollection;

  /**
   * constructor
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this.createAttributeCollection();
    this.createMetadataCollection();
    this.createActionCollection();
  }

  get type(): string {
    return "Detail";
  }

  static isApplicableModel(data: ModularUIResponse) {
    const resourceType = get(data.contributions, "resourcetype", "");
    return (
      resourceType.endsWith("DetailPanel") ||
      ["Detail", "CasePropertiesPanel", "CasePropertiesPanelDetail"].includes(
        resourceType
      )
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    return this._attributeCollection.getInitialChildModelLinks();
  }

  setChildModels(models: Array<ModularUIModel>) {
    this._attributeCollection.setChildModels(models);
  }

  /**
   * Getting the unique identifier of the details
   */
  get id(): string {
    return this.data._id || this.key;
  }

  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Attribute collection
   */
  createAttributeCollection() {
    const attributeContributions = this.contributions.attributes
      ? this.contributions.attributes.filter((contribution) => {
          const [key] = Object.keys(contribution);
          return has(this.data, key);
        })
      : [];

    this.attributeCollection = new AttributeCollection(
      this.data,
      attributeContributions,
      true
    );
  }

  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  set attributeCollection(collection: AttributeCollection) {
    this._attributeCollection = collection;
  }

  /**
   * Retrieve list of visible attributes
   * @returns {Array<$NonMaybeType<T>>|Array<T>}
   */
  get attributes() {
    return this.attributeCollection.all.filter(
      (attribute) => !attribute.layouthint.has(TITLE) && !attribute.isHidden
    );
  }

  /**
   * Retrieve an attribute by it's key
   */
  getAttributeByKey(key: string) {
    return this._attributeCollection.getAttributeByKey(key);
  }

  /**
   * Metadata collection
   */
  createMetadataCollection() {
    const metadataContributions = this.contributions.metadata
      ? Object.keys(this.contributions.metadata).map((metadataKey) => ({
          [metadataKey]: this.contributions.metadata[metadataKey],
        }))
      : [];

    this.metadataCollection = new AttributeCollection(
      this.data,
      metadataContributions,
      true
    );
  }

  get metadataCollection(): AttributeCollection {
    return this._metadataCollection;
  }

  set metadataCollection(collection: AttributeCollection) {
    this._metadataCollection = collection;
  }

  /**
   * Action collection
   */
  createActionCollection() {
    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );
  }

  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }

  set actionCollection(actionCollection: ActionCollection) {
    this._actionCollection = actionCollection;
  }

  /**
   * Determines if this is a case
   */
  get isCase(): boolean {
    return this.contributions.resourcetype === "CaseView";
  }

  /**
   * Getting the attribute that has as layout hint 'title'
   */
  get titleAttribute(): ?AttributeType {
    return this._attributeCollection.getAttributeByLayoutHint(TITLE);
  }

  /**
   * Update current detail with a new detail model and return a cloned version of the model
   */
  update(model: DetailModel) {
    const clonedModel = this.clone();

    clonedModel.attributeCollection = model._attributeCollection;
    clonedModel.metadataCollection = model._metadataCollection;
    clonedModel.actionCollection = model._actionCollection;

    return clonedModel;
  }

  equals(model: DetailModel) {
    return this.id.toString() === model.id.toString();
  }
}

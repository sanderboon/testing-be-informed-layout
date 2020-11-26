// @flow
import { get, has } from "lodash";

import BaseModel from "beinformed/models/base/BaseModel";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

import type { AttributeType, ModularUIModel } from "beinformed/models";

/**
 * Form Object
 */
export default class FormObjectModel extends BaseModel {
  _attributeCollection: AttributeCollection;
  _contentConfiguration: ContentConfiguration;
  _errorCollection: ErrorCollection;
  _repeatIndex: number;
  _dynamicValidationsLoaded: boolean;

  /**
   * Construct FormObjectModel
   */
  constructor(object: Object, objectContributions: Object) {
    super(object, objectContributions);

    if (object && this.getElements().length > 0) {
      this._attributeCollection = new AttributeCollection(
        this.getElements(),
        this.getApplicableAttributeContributions()
      );
    } else {
      this._attributeCollection = new AttributeCollection();
    }

    this._contentConfiguration = new ContentConfiguration(
      objectContributions ? objectContributions.content : {}
    );

    this._errorCollection = new ErrorCollection("formobject");

    if (has(this.data, "referenceDate")) {
      this.attributeCollection.setReferenceDate(
        get(this.data, "referenceDate")
      );
    }

    this.attributeCollection.indicateContentConfiguration(
      this.contentConfiguration
    );
  }

  static createEmpty(formObjectModel: FormObjectModel) {
    return new FormObjectModel(
      formObjectModel.data,
      formObjectModel.contributions
    );
  }

  equals(object: ?FormObjectModel, withRepeatIndex: boolean = true) {
    if (!object || this.key !== object.key) {
      return false;
    }

    const objectContainsOneOfTheAttributes = this.attributeCollection.all
      .filter((attribute) => !attribute.isResult)
      .some(
        (attribute) =>
          object && object.attributeCollection.hasAttributeByKey(attribute.key)
      );

    const hasSameRepeatIndex = withRepeatIndex
      ? this.repeatIndex === object.repeatIndex
      : true;

    return hasSameRepeatIndex && objectContainsOneOfTheAttributes;
  }

  getAttributeByAttribute(attribute: AttributeType) {
    return this.attributeCollection.getAttributeByAttribute(attribute);
  }

  getAttributeByKey(key: string) {
    return this.attributeCollection.getAttributeByKey(key);
  }

  hasAttributeByKey(key: string) {
    return this.attributeCollection.hasAttributeByKey(key);
  }

  /**
   * Get elements from both the missing attributes and the result attributes
   */
  getElements(): Array<Object> {
    const elements = [];

    if (this.data.elements) {
      elements.push(...this.data.elements);
    }

    if (this.data.results) {
      const dataResults = this.data.results.map((result) => ({
        ...result,
        isResult: true,
      }));

      elements.push(...dataResults);
    }

    if (this.data.elementid) {
      elements.push({
        ...this.data,
      });
    }

    return elements;
  }

  /**
   * Map available contributions on the available data. Only use contributions that are needed for the data
   */
  getApplicableAttributeContributions() {
    if (this.data && this.contributions) {
      const dataElementIds = this.getElements().map(
        (element) => element.elementid
      );

      const contributions = this.getAttributesInData(
        dataElementIds,
        this.contributions.attributes
      );

      // set all attribute mandatory for dynamic object
      if (this.isDynamic) {
        return contributions.map((attribute) => {
          const [attributeKey] = Object.keys(attribute);
          return {
            [attributeKey]: {
              ...attribute[attributeKey],
              mandatory: true,
            },
          };
        });
      }

      return contributions;
    }

    return [];
  }

  /**
   * Recursevily check if an attribute id occurs in the tree of attribute contributions.
   * The complete leaf of the tree is returned when an attribute id matches
   */
  getAttributesInData(
    dataElementIds: Array<string>,
    attributesContributions: Object
  ) {
    return attributesContributions.filter((attributeContributions) => {
      const [attributeKey] = Object.keys(attributeContributions);

      return dataElementIds.some(
        (dataElementId) => dataElementId.split(".")[0] === attributeKey
      );
    });
  }

  getInitialChildModelLinks() {
    return this._attributeCollection.getInitialChildModelLinks();
  }

  setChildModels(models: Array<ModularUIModel>) {
    this._attributeCollection.setChildModels(models);
  }

  /**
   * get key
   */
  get key(): string {
    return this.data.objectid;
  }

  /**
   * Get content configuration for form objects
   */
  get contentConfiguration(): ContentConfiguration {
    return this._contentConfiguration;
  }

  get hasEndResultConfiguration(): boolean {
    return has(this.contributions, "content.results");
  }

  /**
   * Indicates if object is dynamic. A dynamic object should be submitted on each attribute change
   */
  get isDynamic(): boolean {
    return get(this.contributions, "dynamicObject", false);
  }

  get hasDynamicValidations(): boolean {
    return get(this.contributions, "dynamicValidations", false);
  }

  /**
   * Indicates if object is repeatable
   */
  get isRepeatable(): boolean {
    return this.contributions.repeatable || false;
  }

  get repeatIndex(): number {
    return this._repeatIndex || this.data.index || 1;
  }

  set repeatIndex(repeatIndex: number) {
    this._repeatIndex = repeatIndex;
  }

  get maxRepeats(): number {
    if (this.isRepeatable) {
      return this.data.numberofrepeats || -1;
    }

    return 1;
  }

  get hasFixedNrOfRepeats(): boolean {
    return this.maxRepeats > -1;
  }

  get isRepeatWithUnknownTotal(): boolean {
    return this.isRepeatable && this.maxRepeats === -1;
  }

  get isLastRepeat(): boolean {
    return this.isRepeatable && (this.data.last || false);
  }

  get repeatIndexLabel(): string | null {
    return this.data["index-identifier"] || null;
  }

  /**
   * Get label of form object
   */
  get label(): string {
    return this.contributions.label;
  }

  /**
   * Get introText of form object
   */
  get introText(): string {
    return this.contributions.introText;
  }

  /**
   * Get assistent of form object
   */
  get assistent(): string {
    return this.contributions.assistent;
  }

  /**
   * Get button labels
   */
  get buttonLabels(): Object {
    return this.contributions.buttonLabels || {};
  }

  /**
   * get attribute collection
   */
  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  set attributeCollection(attributeCollection: AttributeCollection) {
    this._attributeCollection = attributeCollection;
  }

  mergeObject(withObject: FormObjectModel) {
    this.attributeCollection
      .filter((attribute) => !attribute.readonly)
      .forEach((attribute) => {
        const mergeWithAttribute = withObject.getAttributeByAttribute(
          attribute
        );

        if (mergeWithAttribute) {
          attribute.mergeAttribute(mergeWithAttribute);
        }
      });

    this.repeatIndex = withObject.repeatIndex;
  }

  /**
   * Update attribute
   */
  updateAttribute(attribute: AttributeType, value: any) {
    const attributeToUpdate = this.attributeCollection.getAttributeByAttribute(
      attribute
    );

    if (attributeToUpdate === null) {
      throw new Error(`Attribute with name: ${attribute.name} not found.`);
    }

    if (attributeToUpdate instanceof CompositeAttributeModel) {
      attributeToUpdate.update(value, attribute);
    } else {
      attributeToUpdate.update(value);
    }

    return attributeToUpdate;
  }

  /**
   * Inidicates if Form is changed since a given timestamp (Date.now)
   */
  isChangedSince(timestamp: number) {
    return (
      this.attributeCollection.find((attribute) =>
        attribute.isChangedSince(timestamp)
      ) !== null
    );
  }

  /**
   * Reset all errors on Form Object
   */
  resetErrors() {
    this._errorCollection = new ErrorCollection("formobject");
    this.attributeCollection.forEach((attribute) => attribute.resetErrors());
  }

  /**
   * Get error messages
   */
  get errorCollection(): ErrorCollection {
    return this._errorCollection;
  }

  /**
   * Registers an error that was received from a server response
   */
  addServerError(error: FormErrorAnchor) {
    if (has(error.anchor, "elementid")) {
      this.attributeCollection.addServerError(error);
    } else {
      this._errorCollection.addServerError(
        error.id,
        error.message,
        error.properties
      );
    }
  }

  hasServerErrors() {
    return (
      this.errorCollection.hasItems ||
      this.attributeCollection.hasServerErrors()
    );
  }

  hasErrors() {
    return (
      this.errorCollection.hasItems || this.attributeCollection.hasErrors()
    );
  }

  get isValid(): boolean {
    return (
      this.attributeCollection.visible.every(
        (attribute) => attribute.isValid
      ) && !this.errorCollection.hasItems
    );
  }

  get dynamicValidationsLoaded() {
    return this._dynamicValidationsLoaded;
  }

  set dynamicValidationsLoaded(dynamicValidationsLoaded: boolean) {
    this._dynamicValidationsLoaded = dynamicValidationsLoaded;
  }

  updateValidations(data: any) {
    this.resetErrors();

    const attributeErrors = [];

    get(data, "errors", []).forEach((error) => {
      if (get(error, "anchor.objectid") === this.key) {
        if (has(error.anchor, "elementid")) {
          attributeErrors.push(error);
        } else {
          this.errorCollection.addServerError(
            error.id,
            error.message,
            error.properties
          );
        }
      }
    });

    // missing attribute errors
    if (has(data, "missing.anchors")) {
      attributeErrors.push(
        ...data.missing.anchors.map((anchor) => ({
          anchor,
          id: "Constraint.Mandatory",
        }))
      );
    }

    this.attributeCollection.updateValidations(attributeErrors);

    this.dynamicValidationsLoaded = true;

    return this;
  }

  /**
   * Generate formdata object for current formobject based on formdata of attributes
   */
  get formdata(): Object {
    return this.attributeCollection.formdata;
  }

  getFormData(validationData?: boolean = false) {
    return this.attributeCollection.getFormData(validationData);
  }
}

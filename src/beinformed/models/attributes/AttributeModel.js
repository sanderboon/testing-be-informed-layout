// @flow
import { get, isNil, isUndefined, isPlainObject } from "lodash";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

import BaseModel from "beinformed/models/base/BaseModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import ErrorCollection from "beinformed/models/error/ErrorCollection";
import LinkCollection from "beinformed/models/links/LinkCollection";

import StringLengthConstraint from "beinformed/models/constraints/StringLengthConstraint";
import MandatoryConstraint from "beinformed/models/constraints/MandatoryConstraint";

import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

import { MANDATORY } from "beinformed/constants/LayoutHints";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import { getSetting } from "beinformed/constants/Settings";

import { IllegalArgumentException } from "beinformed/exceptions";
import { hasDependentAttributeHint } from "beinformed/models/attributes/attributeVisibilityUtil";

import type { MessageParameters } from "beinformed/i18n";
import type {
  ModularUIModel,
  ContentConfigurationElements,
  LinkModel,
  AttributeType,
} from "beinformed/models";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";

/**
 * Attribute model, base model for all kind of attributes
 */
export default class AttributeModel extends BaseModel {
  _label: string;
  _lastModification: number = 0;

  _initvalue: any;
  _inputvalue: string;
  _value: any;

  _errorCollection: ErrorCollection;
  _serverConstraints: ConstraintCollection = new ConstraintCollection();
  _isValid: boolean = true;
  _validatedValue: string | null;
  _isEditable: boolean = false;
  _concept: ConceptDetailModel | null = null;
  _referenceDate: ISO_DATE;
  _isResult: boolean;
  _isHidden: boolean = false;
  _readonly: boolean;
  _mandatory: boolean;
  _links: LinkCollection;
  _parentKey: ?string;
  _hasContentConfiguration: boolean;

  _isDependentAttribute: boolean | null = null;

  constructor(attribute: Object, attributeContributions: Object) {
    super(attribute, attributeContributions);

    this._label = this.contributions.label;

    this._initvalue = this.data.value;
    this._inputvalue = this.getInitialInputValue(this.data.value);
    this._value = this.data.value;

    this._errorCollection = new ErrorCollection("attribute");
    if (attribute && attribute.message) {
      this._errorCollection.addServerError(
        attribute.message.id,
        attribute.message.message,
        attribute.message.parameters
      );
    }

    this._referenceDate = this.data.referenceDate || DateUtil.now();

    this._isResult = this.data.isResult || false;

    this._mandatory =
      this.layouthint.has(MANDATORY) || this.contributions.mandatory;
  }

  static isApplicableModel(contributions: Object) {
    if (!isPlainObject(contributions)) {
      throw new IllegalArgumentException(
        "Given argument for isApplicableModel is not a contributions object"
      );
    }

    return false;
  }

  /**
   * Retrieve initial input value
   */
  getInitialInputValue(value: any) {
    return value;
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    if (this.conceptLink && this.hasContentConfiguration) {
      return [this.conceptLink];
    }
    return [];
  }

  setChildModels(models: Array<ModularUIModel>) {
    const conceptHref = get(this.conceptLink, "href");
    this.concept = models.find((model) =>
      model.selfhref.equalsWithParameters(conceptHref)
    );
  }

  /**
   * Getting the attribute key
   */
  get key() {
    return this.data.key;
  }

  get parentKey(): string {
    return this._parentKey || "";
  }

  set parentKey(parentKey: string) {
    this._parentKey = parentKey;
  }

  /**
   * Getting the attribute name
   */
  get name(): string {
    return this.key;
  }

  /**
   * Getting the type of the attribute
   */
  get type() {
    return this.contributions.type;
  }

  /**
   * Getting the label of the attribute
   */
  get label() {
    return this._label || "";
  }

  /**
   * Set the label of this attribute
   */
  set label(label: string) {
    this._label = label;
  }

  set hasContentConfiguration(hasContentConfiguration: boolean) {
    this._hasContentConfiguration = hasContentConfiguration;
  }

  get hasContentConfiguration() {
    return this._hasContentConfiguration || false;
  }

  indicateContentConfiguration(contentConfiguration: ContentConfiguration) {
    if (contentConfiguration) {
      const hasQuestionConfig =
        !isNil(contentConfiguration.questions) &&
        contentConfiguration.questions.hasConfig();

      const hasEndResultConfig = contentConfiguration.isConfiguredEndResultAttribute(
        this.key
      );
      const hasIntermediateResultConfig = contentConfiguration.isConfiguredIntermediateResultAttribute(
        this.key
      );

      this.hasContentConfiguration =
        hasQuestionConfig || hasEndResultConfig || hasIntermediateResultConfig;
    }
  }

  /**
   * Retrieve the first permitted label to render when a concept and contentConfiguration is available
   * Be aware that permission could be in place for labels from a concept.
   */
  getContentConfiguredLabel(
    contentConfiguration: ?ContentConfigurationElements
  ) {
    const configuredLabelProperties =
      contentConfiguration && contentConfiguration.labelConfig.length > 0
        ? contentConfiguration.labelConfig[0].types
        : [];

    if (this.concept && configuredLabelProperties.length > 0) {
      const configuredLabels = this.concept
        .getLabelElementByIds(configuredLabelProperties)
        .filter(
          (configuredLabel) =>
            configuredLabel.value && configuredLabel.value !== ""
        );

      if (configuredLabels.length > 0) {
        const [
          firstConfiguredLabel,
        ] = configuredLabelProperties
          .filter((configuredLabelProperty) =>
            configuredLabels.some(
              (configuredLabel) =>
                configuredLabel._id === configuredLabelProperty
            )
          )
          .map((configuredLabelProperty) =>
            configuredLabels.find(
              (configuredLabel) =>
                configuredLabel._id === configuredLabelProperty
            )
          );

        if (firstConfiguredLabel) {
          return firstConfiguredLabel.value;
        }
      }
    }

    return this.label;
  }

  get defaultAlignment() {
    return "left";
  }

  /**
   * Handles layout hint align-left, align-center and align-right
   */
  get alignment() {
    const alignmentHints = this.layouthint.getByLayoutHint("align-");

    // return alignment based on layouthint or the default alignment for the attribute
    return alignmentHints
      ? alignmentHints.substring("align-".length)
      : this.defaultAlignment;
  }

  /**
   * Retrieve links of attribute
   */
  get links() {
    if (!this._links) {
      this._links = new LinkCollection(
        this.data._links,
        this.contributions._links
      );
    }

    return this._links;
  }

  /**
   * Retrieve link of attribute when available
   */
  get downloadLink() {
    const downloadLink = this.links.getLinksByGroup("download").first;

    if (downloadLink && downloadLink.key === this.key) {
      return downloadLink;
    }

    return null;
  }

  /**
   * Retrieve concept link of attribute when available
   */
  get conceptLink() {
    const conceptLink = this.links.getLinkByKey("concept");

    if (conceptLink !== null) {
      conceptLink.href = conceptLink.href.addParameter(
        TIMEVERSION_FILTER_NAME,
        this.referenceDate
      );

      conceptLink.isCacheable = true;
    }

    return conceptLink;
  }

  /**
   * Get concept information
   */
  get concept() {
    return this._concept || null;
  }

  /**
   * Set the concept
   */
  set concept(concept: ?ModularUIModel) {
    this._concept = concept instanceof ConceptDetailModel ? concept : null;
  }

  /**
   * Retrieve reference date of attribute which can be used as entryDate for content
   * to get information in correct time version
   */
  get referenceDate() {
    return this._referenceDate;
  }

  /**
   * Set reference date for concepts and content
   */
  set referenceDate(date: ISO_DATE) {
    this._referenceDate = date;
  }

  /**
   * Initial value received from the modular ui service
   */
  get initvalue() {
    return this._initvalue;
  }

  /**
   * Retrieve input value
   */
  getInputValue() {
    const inputvalue = this._inputvalue;

    return inputvalue ? inputvalue.toString() : "";
  }

  /**
   * Returns the value as entered by the user. This can differ from the internal iso value that is stored
   */
  get inputvalue() {
    return this.getInputValue();
  }

  /**
   * Value that is used when retrieving an error collection of this attribute
   * Mostly this is the input value, but sometimes a different value is needed,
   * for example iban and postcode need to validate length without spaces
   * @returns {string|string}
   */
  get validateValue() {
    return this.inputvalue;
  }

  /**
   * Sets the input value to the value entered by the user
   */
  set inputvalue(value: string) {
    this._inputvalue = value;
    this.value = value;

    this.validate(value);
  }

  hasValue() {
    const value = this._value;
    return !isNil(value) && value !== "";
  }

  /**
   * Getting the value of the attribute
   */
  getValue() {
    return this.hasValue() ? this._value : null;
  }

  /**
   * Getting data ready to be send to the modular ui
   * Returns null when the attribute should not be send to the server
   */
  getFormData() {
    if (this.inError()) {
      return null;
    }

    return {
      [this.name]: this.value,
    };
  }

  get formdata() {
    return this.getFormData();
  }

  getEmptyFormData() {
    return { [this.name]: null };
  }

  /**
   * Getting the value of the attribute
   */
  get value() {
    return this.getValue();
  }

  /**
   * Setting a value in the element
   */
  set value(value: ?string) {
    this.updateLastModification();

    this._value = value;
  }

  formatValue(value: string) {
    return value;
  }

  /**
   * Getting the readonly value, iso value converted for human reading
   */
  get readonlyvalue() {
    return !this.value || this.value === null ? "" : this.value.toString();
  }

  /**
   * Getting mandatory status of attribute
   */
  get mandatory() {
    return this._mandatory || false;
  }

  get configuredMandatory() {
    return this.layouthint.has(MANDATORY) || this.contributions.mandatory;
  }

  /**
   * Set mandatory status of attribute
   */
  set mandatory(mandatory: boolean) {
    if (mandatory !== this._mandatory) {
      this._validatedValue = null;
    }
    this._mandatory = mandatory;
  }

  get readonly() {
    return (
      this._readonly ||
      this.contributions.readonly === true ||
      this.data.static === true ||
      this.isResult === true
    );
  }

  set readonly(readonly: boolean) {
    this._readonly = readonly;
  }

  get isResult() {
    return this._isResult;
  }

  set isResult(isResult: boolean) {
    this._isResult = isResult;
  }

  /**
   * Getting the display and input format of a attribute
   */
  get format() {
    return get(this.contributions, "format", null);
  }

  get formatLabel() {
    return this.format || "";
  }

  /**
   * Get minimum string length
   */
  get minLength() {
    return get(this.contributions, "minLength", null);
  }

  /**
   * Get maximum string length
   */
  get maxLength() {
    return get(this.contributions, "maxLength", null);
  }

  get operator() {
    return "";
  }

  /**
   * Get assistant message
   */
  get assistantMessage() {
    return this.contributions.assistant || null;
  }

  /**
   * Get valid status
   */
  get isValid() {
    return this.validate(this.validateValue);
  }

  /**
   * Retrieve applicable constraint for this attribute
   */
  get constraintCollection() {
    const constraints = new ConstraintCollection();

    constraints.add(this._serverConstraints);

    // Mandatory constraint
    if (this.mandatory) {
      constraints.add(new MandatoryConstraint());
    }

    if (this.minLength || this.maxLength) {
      constraints.add(
        new StringLengthConstraint(this.minLength, this.maxLength)
      );
    }

    constraints.add(this.addConstraints());

    return constraints;
  }

  /**
   * Template method for class extending this model to add extra constraints
   * @abstract
   */
  addConstraints() {
    return new ConstraintCollection();
  }

  /**
   * Validate input on client side constraint
   */
  validate(value: string) {
    // when client side validation is disabled, this attribute is always valid
    if (!getSetting("USE_CLIENTSIDE_VALIDATION")) {
      return true;
    }

    if (this.isOptionalAndEmpty(value)) {
      this._isValid = true;
    } else if (this._validatedValue !== value) {
      this._isValid = this.constraintCollection.validate(value);
    }
    this._validatedValue = value;

    return this._isValid;
  }

  /**
   * Indicates if attribute is optional and empty
   */
  isOptionalAndEmpty(value: string) {
    if (isUndefined(value)) {
      throw new IllegalArgumentException(
        "isOptionalAndEmpty method needs value argument"
      );
    }

    return !this.mandatory && value === "";
  }

  /**
   * Retrieve error messages of this attribute
   */
  get errorCollection() {
    const collection = new ErrorCollection("attribute", this._errorCollection);

    collection.addConstraints(
      this.constraintCollection.invalidConstraints(this.validateValue)
    );

    return collection;
  }

  /**
   * Check if attribute is in error
   */
  inError() {
    return !this._isValid && this.isChangedSince(0);
  }

  /**
   * Reset static error messages on attribute
   */
  resetErrors() {
    this._errorCollection = new ErrorCollection("attribute");
  }

  /**
   * Registers an error that was received from a server response
   */
  addServerError(error: FormErrorAnchor) {
    this._errorCollection.addServerError(
      error.id,
      error.message,
      error.properties
    );
  }

  removeServerError(id: string) {
    this._errorCollection.removeServerError(id);
  }

  hasServerErrors() {
    return this.errorCollection.serverErrors.length > 0;
  }

  hasErrors() {
    return this.errorCollection.hasItems;
  }

  /**
   * Registers a missing error that was received from the server
   */
  addMissingError() {
    this._errorCollection.addServerError("Constraint.Missing");
  }

  removeMissingError() {
    this.removeServerError("Constraint.Missing");
  }

  addServerConstraint(
    id: string,
    defaultMessage?: string,
    parameters?: MessageParameters
  ) {
    this._serverConstraints.addConstraint(id, null, defaultMessage, parameters);
  }

  formatParameters(parameters: Object) {
    if (isNil(parameters)) {
      return {};
    }

    const params = {};

    Object.keys(parameters).forEach((paramKey: string) => {
      const paramValue = parameters[paramKey];
      if (paramKey.endsWith("-number") || paramKey.endsWith("-date")) {
        params[paramKey] = this.formatValue(paramValue);
      } else {
        params[paramKey] = paramValue;
      }
    });

    return params;
  }

  get hasDynamicValidationData() {
    return true;
  }

  updateValidations(errors: Array<Object>) {
    if (
      errors.some((error) => error.id === "Constraint.Mandatory") ||
      this.layouthint.has(MANDATORY)
    ) {
      this.mandatory = true;
    } else if (!this.hasValue()) {
      this.mandatory = false;
    }

    this._serverConstraints = new ConstraintCollection();
    this.resetErrors();

    errors.forEach((error) => {
      if (this.hasValue()) {
        this._errorCollection.addServerError(
          error.id,
          error.message,
          this.formatParameters(error.properties)
        );
      } else {
        this.addServerConstraint(
          error.id,
          error.message,
          this.formatParameters(error.properties)
        );
      }
    });
  }

  /**
   * Set last modification to current timestamp
   */
  updateLastModification() {
    this._lastModification = Date.now();
  }

  /**
   * Inidicates if attribute is changed since a given timestamp (Date.now)
   */
  isChangedSince(timestamp: number) {
    return this._lastModification > timestamp;
  }

  /**
   * Abstract reset method which should be implemented on each attribute that has this attribute as a base class.
   * @abstract
   */
  reset() {
    throw new Error(`Reset method not implemented for ${this.type}`);
  }

  mergeAttribute(withAttribute: AttributeType) {
    this.concept = withAttribute.concept;

    if (withAttribute.isValid && withAttribute.inputvalue !== null) {
      this.update(withAttribute.inputvalue);
    }
  }

  /**
   * Abstract update method which should be implemented on each attribute that has this attribute as a base class.
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  update(value: string, changedAttribute?: AttributeType) {
    throw new Error(`Update method not implemented for ${this.type}`);
  }

  /**
   * Indicate if attribute is editable
   */
  set isEditable(isEditable: boolean) {
    this._isEditable = isEditable;
  }

  /**
   * Retrieve if attribute is editable
   */
  get isEditable() {
    return this._isEditable;
  }

  /**
   * Retrieve if the attribute has a dependent attribute layout hint
   */
  get isDependentAttribute() {
    if (this._isDependentAttribute === null) {
      this._isDependentAttribute = hasDependentAttributeHint(this);
    }

    return this._isDependentAttribute;
  }

  get isHidden() {
    return this._isHidden;
  }

  /*
   * Explicitly toggle visibility of this attribute
   */
  show() {
    this._isHidden = false;
  }

  hide() {
    this._isHidden = true;
  }

  equals(otherAttribute: AttributeType) {
    return (
      this.key === otherAttribute.key &&
      this.parentKey === otherAttribute.parentKey
    );
  }
}

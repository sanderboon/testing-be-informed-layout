// @flow
import { isArray, isString } from "lodash";

import AttributeModel from "beinformed/models/attributes/AttributeModel";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

import ChoiceAttributeOptionCollection from "beinformed/models/attributes/ChoiceAttributeOptionCollection";
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import { isDependentAttributeControl } from "beinformed/models/attributes/attributeVisibilityUtil";

import { RENDER_SECTION_LABEL } from "beinformed/constants/LayoutHints";
import type { AttributeType } from "beinformed/models";

/**
 * Model for a boolean attribute
 */
export default class BooleanAttributeModel extends AttributeModel {
  _referenceDate: string;
  _options: ChoiceAttributeOptionCollection;
  _hasContentConfiguration: boolean;

  constructor(attribute: Object, attributeContributions: Object) {
    super(attribute, attributeContributions);

    this._referenceDate = this.data.referenceDate || DateUtil.now();
    this._options = ChoiceAttributeOptionCollection.create(
      attribute,
      attributeContributions,
      this.referenceDate
    );
  }

  static isApplicableModel(contributions: Object) {
    return contributions.type === "boolean";
  }

  get type() {
    return "boolean";
  }

  /**
   * Retrieve reference date of attribute which can be used as entryDate for content
   */
  get referenceDate() {
    return this._referenceDate;
  }

  /**
   * Set reference date for concepts and content
   */
  set referenceDate(date: string) {
    this._referenceDate = date;

    this.options.referenceDate = date;
  }

  /**
   * Getting the type of choice filter. For instance checkbox, radiobutton, combobox.
   */
  get choicetype() {
    return (
      ["checkbox", "radiobutton", "combobox", "toggle"].find((hint) =>
        this.layouthint.has(hint)
      ) || "radiobutton"
    );
  }

  /**
   * Can multiple options be selected
   */
  get isMultiple() {
    return false;
  }

  /**
   * Check if options need to be rendered as tree
   */
  get isTree() {
    return false;
  }

  /**
   * Retrieve if attribute is a dependen attribute control which is used in the dependent question layout hint pattern.
   */
  get isDependentControl() {
    return isDependentAttributeControl(this);
  }

  set hasContentConfiguration(hasContentConfiguration: boolean = false) {
    this._hasContentConfiguration =
      this.contentConfiguration !== null || hasContentConfiguration;
  }

  get hasContentConfiguration() {
    return this._hasContentConfiguration;
  }

  /**
   * Get content configuration configured on the attribute.
   * Only applicable for taxonomy element and knowledge codemaps,
   * content configuration for instrument questions is available on the form object
   */
  get contentConfiguration() {
    if (
      !this.contributions.content ||
      !this.contributions.content.optionElements
    ) {
      return null;
    }

    // Add RENDER_SECTION_LABEL to all content configuration to make sure the label of a section is always rendered on taxonomy and knowlege codemaps
    const optionElementConfig = this.contributions.content.optionElements.map(
      (optionElement) => {
        if ("contentElement" in optionElement) {
          return {
            contentElement: {
              ...optionElement.contentElement,
              layouthint: [RENDER_SECTION_LABEL],
            },
          };
        }

        return optionElement;
      }
    );

    return new ContentConfigurationElements(optionElementConfig);
  }

  /**
   * Retrieve available choice options
   */
  get options() {
    return this._options;
  }

  /**
   * Getting all enabled options
   */
  get selected() {
    return this.options.selected.map<ChoiceAttributeOptionModel>(
      (option) => option.code
    );
  }

  /**
   * Flatten options and filter out the options that are not selected
   */
  get readonlyvalue() {
    return this.options.selected.map((option) => option.label).join(", ");
  }

  get initvalue() {
    if (Array.isArray(this._initvalue) && this._initvalue.length === 0) {
      return null;
    }

    return this._initvalue;
  }

  /**
   * Retrieve list of selected options, joined with comma
   */
  getValue() {
    return this.options.selected.length > 0
      ? this.options.selected.map((option) => option.code).join(",")
      : null;
  }

  hasValue() {
    return this.options.selected.length > 0;
  }

  /**
   * Get input value of attribute
   */
  getInputValue() {
    return this.selected.join(",");
  }

  /**
   * Setting an option selected or unselected based on the current state
   */
  toggleOption(code: string) {
    if (this.selected.includes(code)) {
      this.disableOption(code);
    } else {
      this.enableOption(code);
    }
  }

  /**
   * Enable a option
   */
  enableOption(code: string) {
    this.options.deselectAll();
    this.options.select(code);
    this.inputvalue = this.getInputValue();
  }

  /**
   * Disable a option
   */
  disableOption(code: string) {
    this.options.deselect(code);
    this.inputvalue = this.getInputValue();
  }

  /**
   * Reset boolean attribute to unselected list
   */
  reset() {
    this.options.deselectAll();
  }

  mergeAttribute(withAttribute: AttributeType) {
    // when attribute is readonly, don't merge the options no modifications necessary
    if (!this.readonly && withAttribute instanceof BooleanAttributeModel) {
      this.concept = withAttribute.concept;
      this.options.deselectAll();

      if (withAttribute.isValid && withAttribute.inputvalue !== null) {
        this.update(withAttribute.inputvalue);
      }
    }
  }

  /**
   * Update attribute by name and value
   */
  update(value: any) {
    if (this.readonly) {
      return this;
    }

    this.updateLastModification();

    let values = [];

    if (isArray(value)) {
      values = value;
    } else if (isString(value) && this.isMultiple) {
      values = value.split(",");
    } else {
      values = [value];
    }

    values.forEach((val) => {
      if (val instanceof ChoiceAttributeOptionModel) {
        this.toggleOption(val.code);
      } else if (
        isString(val) &&
        this.options.some((option) => option.code.toString() === val)
      ) {
        this.toggleOption(val);
      }
    });

    return this;
  }

  getFormData() {
    if (this.inError()) {
      return null;
    }

    if (!this.hasValue()) {
      // no value for checkbox and toggle is same as a false value
      if (this.choicetype === "checkbox" || this.choicetype === "toggle") {
        return { [this.name]: false };
      }

      return { [this.name]: null };
    }

    return { [this.name]: this.value === "true" };
  }
}

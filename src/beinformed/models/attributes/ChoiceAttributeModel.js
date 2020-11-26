// @flow
import { has, get, isString, isArray } from "lodash";

import AttributeModel from "beinformed/models/attributes/AttributeModel";
import ChoiceAttributeOptionCollection from "beinformed/models/attributes/ChoiceAttributeOptionCollection";
import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

import {
  RENDER_SECTION_LABEL,
  SORT_OPTIONS,
} from "beinformed/constants/LayoutHints";
import { isDependentAttributeControl } from "beinformed/models/attributes/attributeVisibilityUtil";
import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

import type { ModularUIModel, AttributeType } from "beinformed/models";

/**
 * Model for a choice attribute
 */
export default class ChoiceAttributeModel extends AttributeModel {
  _referenceDate: string;
  _options: ChoiceAttributeOptionCollection;
  _hasContentConfiguration: boolean;

  /**
   * Constructs a choice attribute
   */
  constructor(attribute: Object, attributeContributions: Object) {
    super(attribute, attributeContributions);

    this._referenceDate = this.data.referenceDate || DateUtil.now();
    this._options = ChoiceAttributeOptionCollection.create(
      attribute,
      attributeContributions,
      this.referenceDate
    );

    if (this.layouthint.has(SORT_OPTIONS)) {
      this._options.sortOptions = true;
    }
  }

  static isApplicableModel(contributions: Object) {
    return (
      contributions.type !== "composite" &&
      contributions.type !== "boolean" &&
      (contributions.type === "choice" ||
        contributions.type === "array" ||
        has(contributions, "enumerated") ||
        has(contributions, "options"))
    );
  }

  get type() {
    const optionMode = get(this.contributions, "optionMode", "");
    const hasLookupLink = this.lookupLink || this.lookupListLink;

    if (
      optionMode === "lookup" ||
      (optionMode === "dynamicWithThreshold" && hasLookupLink)
    ) {
      return "lookup";
    }

    return "choice";
  }

  getInitialChildModelLinks() {
    const links = [];

    if (this.hasContentConfiguration) {
      if (this.conceptLink) {
        links.push(this.conceptLink);
      }

      links.push(...this.options.getInitialChildModelLinks());
    }

    return links;
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.concept = models.find(
      (model) =>
        model.type === "ConceptDetail" &&
        model.selfhref.equalsWithParameters(get(this.conceptLink, "href"))
    );

    this.options.setChildModels(models);
  }

  /**
   * Retrieve lookup service link
   */
  get lookupLink() {
    return this.links.getLinkByKey("lookupOptions");
  }

  /**
   * Retrieve lookup service as list link
   */
  get lookupListLink() {
    return this.links.getLinkByKey("lookupList");
  }

  get lookupListLabel() {
    return get(this.contributions, "lookupList.label", "");
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
    if (!this.isMultiple) {
      this.options.deselectAll();
    }

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
   * Add a new option to the collection of lookup options
   */
  addOption(option: Object) {
    if (!this.isMultiple) {
      this.options.deselectAll();
    }

    if (this.options.find((opt) => opt.code === option.code) === null) {
      this.options.addOption(option.code, option);
    }
  }

  /**
   * Getting the type of choice filter. For instance checkbox, radiobutton, combobox.
   */
  get choicetype() {
    return (
      [
        "checkbox",
        "radiobutton",
        "combobox",
        "list",
        "listview",
        "table",
        "longlist",
        "toggle",
      ].find((hint) => this.layouthint.has(hint)) || "checkbox"
    );
  }

  /**
   * Can multiple options be selected
   */
  get isMultiple() {
    return this.contributions.multiplechoice || this.choicetype === "checkbox";
  }

  /**
   * Check if options need to be rendered as tree
   */
  get isTree() {
    return (
      has(this.contributions, "options") &&
      this.contributions.options.some((option) => has(option, "children"))
    );
  }

  /**
   * Reset choice attribute to unselected list
   */
  reset() {
    this.options.deselectAll();
  }

  mergeAttribute(withAttribute: AttributeType) {
    // when attribute is readonly, don't merge the options no modifications necessary
    if (!this.readonly && withAttribute instanceof ChoiceAttributeModel) {
      this.concept = withAttribute.concept;
      this.options.mergeOptions(withAttribute.options, this.type === "lookup");
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
        if (!this.options.some((option) => option.equals(val))) {
          this.options.add(val);
        }

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
   * Get placeholder text
   */
  get placeholder() {
    return this.contributions.placeholder || "";
  }

  /**
   * Registers an error that was received from a server response
   */
  addServerError(error: FormErrorAnchor) {
    const { id, message, properties } = error;

    if (has(properties, "answer-option-key")) {
      const optionKey = get(properties, "answer-option-key");

      const foundOption = this.options.find(
        (option) => option.code === optionKey
      );
      if (foundOption) {
        properties["answer-option-key"] = foundOption.getContentConfiguredLabel(
          this.contentConfiguration
        );
      }
    }

    this._errorCollection.addServerError(id, message, properties);
  }
}

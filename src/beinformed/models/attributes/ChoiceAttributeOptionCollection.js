// @flow
import { get, isNil, isBoolean } from "lodash";

import ResourceCollection from "beinformed/models/base/ResourceCollection";
import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import ListHeaderModel from "beinformed/models/list/ListHeaderModel";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

class ChoiceAttributeOptionCollection extends ResourceCollection<ChoiceAttributeOptionModel> {
  _headers: Array<ListHeaderModel> = [];
  _sortOptions: boolean = false;

  set sortOptions(sortOptions: boolean) {
    this._sortOptions = sortOptions;

    this.collection.forEach((option) => {
      if (option.children) {
        option.children.sortOptions = sortOptions;
      }
    });
  }

  get sortOptions() {
    return this._sortOptions;
  }

  static create(
    data: Object = {},
    contributions: Object = {},
    referenceDate: ISO_DATE = DateUtil.now()
  ) {
    const collection = new ChoiceAttributeOptionCollection();

    if (get(contributions, "type", "") === "boolean") {
      collection.addBooleanOptions(data.value, contributions);
    } else if (!isNil(data.dynamicschema)) {
      collection.addDynamicSchema(data, contributions, referenceDate);
    } else if (!isNil(contributions.options)) {
      collection.addOptions(data, contributions, referenceDate);
    }

    if (!isNil(contributions.children)) {
      collection.addHeaders(contributions.children);
    }

    return collection;
  }

  /**
   * Retrieve all items in collection
   */
  get all(): Array<ChoiceAttributeOptionModel> {
    return this.sortOptions
      ? this.collection.sort((a, b) => a.label.localeCompare(b.label))
      : this.collection;
  }

  getSelectedOptions(data: Object) {
    const selectedOptions = [];

    if (Array.isArray(data.options)) {
      selectedOptions.push(
        ...data.options
          .filter((option) => option.selected)
          .map((option) => option.key)
      );
    } else if (Array.isArray(data.value)) {
      selectedOptions.push(...data.value);
    } else if (isBoolean(data.value)) {
      selectedOptions.push(data.value.toString());
    } else {
      selectedOptions.push(data.value);
    }

    return selectedOptions;
  }

  getOptionCount(code: string, options: Array<Object>) {
    if (Array.isArray(options)) {
      const foundOption = options.find((option) => option.key === code);
      if (foundOption) {
        return foundOption.count;
      }
    }

    return null;
  }

  addOptions(
    data: Object,
    contributions: Object,
    referenceDate: ISO_DATE = DateUtil.now()
  ) {
    const selectedValues = this.getSelectedOptions(data);

    contributions.options.forEach((optionContributions) => {
      const optionCode = optionContributions.code || optionContributions.key;

      this.addOption(
        selectedValues,
        {
          ...optionContributions,
          count: this.getOptionCount(optionCode, data.options),
        },
        referenceDate
      );
    });

    return this;
  }

  /**
   * Create options based on data and dynamischema
   */
  addDynamicSchema(
    data: Object,
    contributions: Object,
    referenceDate: ISO_DATE = DateUtil.now()
  ) {
    const selectedValues = this.getSelectedOptions(data);
    data.dynamicschema.forEach((optionDynamicschema) => {
      this.addOption(
        selectedValues,
        {
          ...optionDynamicschema,
          count: this.getOptionCount(optionDynamicschema.code, data.options),
          elementsContributions: contributions.children,
        },
        referenceDate
      );
    });

    return this;
  }

  addBooleanOption(
    code: "true" | "false",
    defaultLabel: string,
    data: string | Array<string>,
    options: Array<Object> = []
  ) {
    const foundOption = options.find((option) => option.code === code);

    const label = foundOption ? foundOption.label : defaultLabel;

    this.addOption(data, {
      code,
      label,
      isBooleanType: true,
      hasAlternativeLabel: !isNil(foundOption),
    });
  }

  getDefaultValueForOption(value: any, contributions: Object) {
    const layouthints = get(contributions, "layouthint", []);

    const requireDefaultValue =
      layouthints.includes("checkbox") || layouthints.includes("toggle");

    return requireDefaultValue ? "false" : "";
  }

  /**
   * Create two static options for true and false,
   * there might be alternative labels configured for each option value
   */
  addBooleanOptions(value: any, contributions: Object) {
    const optionValue = isNil(value)
      ? this.getDefaultValueForOption(value, contributions)
      : value.toString();

    this.addBooleanOption("true", "Yes", [optionValue], contributions.options);
    this.addBooleanOption("false", "No", [optionValue], contributions.options);

    return this;
  }

  addOption(
    data: string | Array<string>,
    contributions: Object,
    referenceDate?: ISO_DATE = DateUtil.now()
  ) {
    const optionModel = new ChoiceAttributeOptionModel(
      Array.isArray(data) ? data : [data],
      contributions,
      referenceDate
    );

    this.add(optionModel);

    return this;
  }

  /**
   * Get all options that have selected property true
   */
  get selected() {
    const selectedOptions = [];

    this.collection.forEach((option) => {
      if (option.selected && option.selected === true) {
        selectedOptions.push(option);
      }

      if (option.children) {
        selectedOptions.push(...option.children.selected);
      }
    });

    return selectedOptions;
  }

  /**
   * Deselect all options
   */
  deselectAll() {
    this.collection = this.collection.map((option) => {
      const newOption = option.clone();

      newOption.selected = false;

      if (newOption.children) {
        newOption.children.deselectAll();
      }

      return newOption;
    });
  }

  /**
   * Select an option by it's code
   */
  select(optionCode: string) {
    return this.toggle(optionCode, "select");
  }

  /**
   * Deselect an option by it's code
   */
  deselect(optionCode: string) {
    return this.toggle(optionCode, "deselect");
  }

  /**
   * Toggle an option by it's code
   */
  toggle(optionCode: string, action: "select" | "deselect") {
    this.collection = this.collection.map((option) => {
      const newOption = option.clone();

      if (newOption.code === optionCode) {
        newOption.selected = action === "select";
      } else if (newOption.children) {
        newOption.children.toggle(optionCode, action);
      }

      return newOption;
    });
  }

  setReferenceDate(date: ISO_DATE) {
    return this.collection.map((option) => {
      option.referenceDate = date;
      if (option.children) {
        option.children.referenceDate = date;
      }

      return option;
    });
  }

  set referenceDate(date: ISO_DATE) {
    this.collection = this.setReferenceDate(date);
  }

  addHeaders(headers: Array<Object>) {
    this._headers = headers.map((child) => new ListHeaderModel(child));
  }

  get headers() {
    if (this._headers) {
      return this._headers;
    }

    return [];
  }

  mergeOptions(
    withOptions: ChoiceAttributeOptionCollection,
    addNotExistingOptions: boolean = false
  ) {
    if (addNotExistingOptions) {
      this.collection = [
        ...this.collection,
        ...withOptions.filter(
          (option) => !this.collection.some((opt) => opt.code === option.code)
        ),
      ];
    }

    this.collection.forEach((option) => {
      const foundOption = withOptions.find(
        (withOption) => withOption.code === option.code
      );
      if (foundOption) {
        option.mergeOption(foundOption);
      }
    });
  }
}

export default ChoiceAttributeOptionCollection;

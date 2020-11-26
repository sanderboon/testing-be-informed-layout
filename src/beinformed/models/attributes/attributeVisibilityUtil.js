// @flow
import { get } from "lodash";
import {
  DEPENDENT_ATTRIBUTE_CONTROL,
  DEPENDENT_ATTRIBUTE,
  DEPENDENT_ATTRIBUTE_ACTION_SHOW,
  DEPENDENT_ATTRIBUTE_ACTION_HIDE,
  DEPENDENT_ATTRIBUTE_OPERATOR_EQUALS,
  DEPENDENT_ATTRIBUTE_OPERATOR_INCLUDES,
  DEPENDENT_ATTRIBUTE_OPERATOR_NOT_EQUALS,
  DEPENDENT_ATTRIBUTE_OPERATOR_NOT_INCLUDES,
  DEPENDENT_ATTRIBUTE_OPTIONS_SEPARATOR,
} from "beinformed/constants/LayoutHints";

import { ConfigurationException } from "beinformed/exceptions";

import type {
  AttributeCollection,
  AttributeType,
  AttributeModel,
} from "beinformed/models";

const checkIsDependentAttributeHint = (attributeName: string, hint: string) => {
  const hasHint =
    hint.includes(
      `${DEPENDENT_ATTRIBUTE_ACTION_SHOW} when ${DEPENDENT_ATTRIBUTE_CONTROL}`
    ) ||
    hint.includes(
      `${DEPENDENT_ATTRIBUTE_ACTION_HIDE} when ${DEPENDENT_ATTRIBUTE_CONTROL}`
    );

  // inform that layout hint is missing new prefix
  if (hasHint && !hint.includes(DEPENDENT_ATTRIBUTE)) {
    throw new ConfigurationException(
      `Attribute '${attributeName}' is missing prefix '${DEPENDENT_ATTRIBUTE}' in dependent attribute pattern: '${hint}'.`
    );
  }

  return hasHint;
};

export const hasDependentAttributeHint = (attribute: AttributeModel) =>
  attribute.layouthint.some((hint) =>
    checkIsDependentAttributeHint(attribute.name, hint)
  );
/**
 * Retrieve dependent attribute formatted layout hint
 */
export const getDependentAttributeHints = (attribute: AttributeModel) =>
  attribute.layouthint.filter((hint) =>
    checkIsDependentAttributeHint(attribute.name, hint)
  );

/**
 * Check if an attribute is an attribute that acts as control element for the dependent attributes
 */
export const isDependentAttributeControl = (attribute: AttributeType) =>
  attribute.layouthint.has(DEPENDENT_ATTRIBUTE_CONTROL);

/**
 * Parse the dependent attribute layout hint for use in other methods
 */
export const parseDependentHint = (hint: string) => {
  if (hint === null) {
    throw new ConfigurationException("Cannot parse hint that is null");
  }

  /*
   * regex being constructed:
   * pattern = /dependent-attribute:\s?(show|hide) when dependent-control:\s?(.*)(\s(equals|includes|notEquals|notIncludes)\s)(.*)/gi;
   */
  const ACTIONS = `${DEPENDENT_ATTRIBUTE_ACTION_SHOW}|${DEPENDENT_ATTRIBUTE_ACTION_HIDE}`;
  const OPERATORS = `${DEPENDENT_ATTRIBUTE_OPERATOR_EQUALS}|${DEPENDENT_ATTRIBUTE_OPERATOR_INCLUDES}|${DEPENDENT_ATTRIBUTE_OPERATOR_NOT_EQUALS}|${DEPENDENT_ATTRIBUTE_OPERATOR_NOT_INCLUDES}`;
  const pattern = `${DEPENDENT_ATTRIBUTE}\\s?(${ACTIONS}) when ${DEPENDENT_ATTRIBUTE_CONTROL}:\\s?(.*?)\\s(${OPERATORS})\\s(.*)`;

  const result = hint.match(new RegExp(pattern));

  if (result) {
    const ACTION_POSITION = 1;
    const CONTROL_POSITION = 2;
    const OPERATOR_POSITION = 3;
    const OPTIONS_POSITION = 4;

    const options = result[OPTIONS_POSITION].split(
      DEPENDENT_ATTRIBUTE_OPTIONS_SEPARATOR
    ).map<string>((option) => option.trim());

    return {
      action: result[ACTION_POSITION],
      control: result[CONTROL_POSITION],
      operator: result[OPERATOR_POSITION],
      options,
    };
  }

  throw new ConfigurationException(
    `No dependent information found on layout hint: ${hint}, with pattern: ${pattern}`
  );
};

const handleHint = (attributes, dependentAttributeHint) => {
  const hint = parseDependentHint(dependentAttributeHint);

  const controlAttribute = attributes.getDependentChoiceAttribute(hint.control);

  // control attribute does not exist
  if (controlAttribute === null) {
    return true;
  }

  // prettier-ignore
  if (!isVisibleAttribute(attributes, controlAttribute)) { // NOSONAR
    return false;
  }

  /**
   * Retrieve controls that have the hint 'control equals option'
   */
  const dependentControlEqualsOptions = (hintOptions = []) =>
    hintOptions.every(
      (option) =>
        controlAttribute.selected &&
        Array.isArray(controlAttribute.selected) &&
        controlAttribute.selected.includes(option)
    );

  /**
   * Retrieve controls that have the hint 'control includes option'
   */
  const dependentControlIncludesOptions = (hintOptions = []) =>
    hintOptions.some((option) => controlAttribute.selected.includes(option));

  const actions = {
    [`${DEPENDENT_ATTRIBUTE_ACTION_SHOW}#${DEPENDENT_ATTRIBUTE_OPERATOR_EQUALS}`]: dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_ATTRIBUTE_ACTION_SHOW}#${DEPENDENT_ATTRIBUTE_OPERATOR_INCLUDES}`]: dependentControlIncludesOptions(
      hint.options
    ),
    [`${DEPENDENT_ATTRIBUTE_ACTION_SHOW}#${DEPENDENT_ATTRIBUTE_OPERATOR_NOT_EQUALS}`]: !dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_ATTRIBUTE_ACTION_SHOW}#${DEPENDENT_ATTRIBUTE_OPERATOR_NOT_INCLUDES}`]: !dependentControlIncludesOptions(
      hint.options
    ),
    [`${DEPENDENT_ATTRIBUTE_ACTION_HIDE}#${DEPENDENT_ATTRIBUTE_OPERATOR_EQUALS}`]: !dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_ATTRIBUTE_ACTION_HIDE}#${DEPENDENT_ATTRIBUTE_OPERATOR_INCLUDES}`]: !dependentControlIncludesOptions(
      hint.options
    ),
    [`${DEPENDENT_ATTRIBUTE_ACTION_HIDE}#${DEPENDENT_ATTRIBUTE_OPERATOR_NOT_EQUALS}`]: dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_ATTRIBUTE_ACTION_HIDE}#${DEPENDENT_ATTRIBUTE_OPERATOR_NOT_INCLUDES}`]: dependentControlIncludesOptions(
      hint.options
    ),
  };

  return get(actions, `${hint.action}#${hint.operator}`, false);
};

/**
 * Retrieve if depending control is enabled for a dependent attribute
 */
export const isDependingOnOtherAttribute = (
  attributes: AttributeCollection,
  attribute: AttributeType
) =>
  getDependentAttributeHints(attribute).every((hint) =>
    handleHint(attributes, hint)
  );

/**
 * Checks if an attribute should be visible based on layout hints
 */
export const isVisibleAttribute = (
  attributes: AttributeCollection,
  attribute: AttributeType
) => {
  // if attribute is explicitly hidden, then hide attribute
  if (attribute.isHidden) {
    return false;
  }

  // check if other attributes depend on this attribute
  if (attribute.isDependentAttribute) {
    return isDependingOnOtherAttribute(attributes, attribute);
  }

  return true;
};

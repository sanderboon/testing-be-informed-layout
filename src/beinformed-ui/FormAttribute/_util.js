// @flow
import { COMPACT, UNIT_AS_PREFIX } from "beinformed/constants/LayoutHints";
import type { AttributeType } from "beinformed/models";

const getPrependValue = (attribute: AttributeType) => {
  if (attribute.unit && attribute.layouthint.has(UNIT_AS_PREFIX)) {
    return attribute.unit;
  }

  if (attribute.prefix) {
    return attribute.prefix;
  }

  return null;
};

const getAppendValue = (attribute: AttributeType) => {
  if (attribute.unit && !attribute.layouthint.has(UNIT_AS_PREFIX)) {
    return attribute.unit;
  }

  if (attribute.postfix) {
    return attribute.postfix;
  }

  return null;
};

const isCompactRendering = (attribute: AttributeType) => {
  return (
    attribute.layouthint.has(COMPACT) ||
    (attribute.type === "boolean" &&
      attribute.choicetype &&
      attribute.choicetype === "checkbox")
  );
};

export { getPrependValue, getAppendValue, isCompactRendering };

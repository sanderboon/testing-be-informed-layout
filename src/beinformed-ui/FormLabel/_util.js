// @flow
import { getSetting } from "beinformed/constants/Settings";
import { CompositeAttributeModel } from "beinformed/models";

import type { FormLayoutType } from "beinformed/constants";
import type { AttributeType } from "beinformed/models";

const shouldRenderOptionalIndication = (
  attribute: AttributeType,
  isMandatory?: boolean
) => {
  const RENDER_OPTIONAL_ATTRIBUTE_INDICATION = getSetting(
    "RENDER_OPTIONAL_ATTRIBUTE_INDICATION",
    false
  );

  if (attribute.readonly || !RENDER_OPTIONAL_ATTRIBUTE_INDICATION) {
    return false;
  }

  if (
    attribute.type === "boolean" &&
    (attribute.choicetype === "toggle" || attribute.choicetype === "checkbox")
  ) {
    return false;
  }

  if (
    attribute instanceof CompositeAttributeModel &&
    attribute.children.some((child) => child.mandatory)
  ) {
    return false;
  }

  return !isMandatory && !attribute.mandatory;
};

const shouldRenderMandatoryIndication = (
  attribute: AttributeType,
  isMandatory?: boolean
) => {
  const RENDER_MANDATORY_ATTRIBUTE_INDICATION = getSetting(
    "RENDER_MANDATORY_ATTRIBUTE_INDICATION",
    true
  );

  if (attribute.readonly || !RENDER_MANDATORY_ATTRIBUTE_INDICATION) {
    return false;
  }

  if (
    attribute.type === "boolean" &&
    (attribute.choicetype === "toggle" || attribute.choicetype === "checkbox")
  ) {
    return false;
  }

  if (
    attribute instanceof CompositeAttributeModel &&
    attribute.children.some((child) => child.mandatory)
  ) {
    return false;
  }

  return isMandatory || attribute.mandatory;
};

const getColSize = (formLayout?: FormLayoutType, size?: string | number) => {
  switch (formLayout) {
    case "compact":
      return "auto";
    case "horizontal":
      return size;
    default:
      return 12;
  }
};

const getHtmlElement = (
  formLayout?: FormLayoutType,
  choicetype: "checkbox" | "radiobutton" | "toggle" | "list"
) => {
  if (
    choicetype === "radiobutton" ||
    (choicetype === "checkbox" && formLayout !== "compact")
  ) {
    return "div";
  }

  return "label";
};

export {
  shouldRenderOptionalIndication,
  shouldRenderMandatoryIndication,
  getColSize,
  getHtmlElement,
};

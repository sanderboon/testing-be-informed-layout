// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

// model dependency
import { StringAttributeModel } from "beinformed/models";

// use _component registry
import {
  StringAttribute,
  AttributeRenderer,
} from "_component-registry/attributes";
import { layoutHintKnob, formLayoutKnob } from "_storybook/utils";

export default {
  title: "Attributes/String attribute/Form",
  component: StringAttribute,
};

const data = {
  key: "FavouritePet",
  value: "Ziggy",
};
const contributions = {
  type: "string",
  label: "What is the name of your favourite pet",
  mandatory: true,
  assistant: "Use the security question to verify your identity",
  layouthint: [],
};

/**
 * Interactive
 */
export const interactive = () => {
  const attribute = new StringAttributeModel(
    {
      ...data,
      value: text("Value", data.value, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      mandatory: boolean(
        "Mandatory",
        contributions.mandatory,
        KNOB_GROUPS.MODULARUI
      ),
      regexp: text(
        "Regular expression",
        contributions.regexp,
        KNOB_GROUPS.MODULARUI
      ),
      regexpValidationMessage: text(
        "Regular expression validation message",
        contributions.regexpValidationMessageKey,
        KNOB_GROUPS.MODULARUI
      ),
      assistant: text(
        "Assistant",
        contributions.assistant,
        KNOB_GROUPS.MODULARUI
      ),
      placeholder: text(
        "Placeholder",
        contributions.placeholder,
        KNOB_GROUPS.MODULARUI
      ),
      postfix: text("Post fix", contributions.postfix, KNOB_GROUPS.MODULARUI),
      displaysize: number(
        "Size",
        contributions.displaysize,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      minLength: number(
        "Minimum length",
        contributions.minLength,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      maxLength: number(
        "Maximum length",
        contributions.maxLength,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      readonly: boolean("Readonly", false, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute", "attribute/string"]),
    }
  );

  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
      formLayout={formLayoutKnob()}
    />
  );
};

export const string = () => {
  const attribute = new StringAttributeModel(data, contributions);
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const readonly = () => {
  const attribute = new StringAttributeModel(data, {
    contributions,
    readonly: true,
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

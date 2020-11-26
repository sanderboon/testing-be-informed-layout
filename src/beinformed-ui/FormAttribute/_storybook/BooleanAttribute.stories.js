// @flow
import { KNOB_GROUPS } from "_storybook/constants";
import { layoutHintKnob, formLayoutKnob } from "_storybook/utils";

import { text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

// model dependency
import { BooleanAttributeModel } from "beinformed/models";

// use _component registry
import {
  AttributeRenderer,
  BooleanAttribute,
} from "_component-registry/attributes";

export default {
  title: "Attributes/Boolean attribute/Form",
  component: BooleanAttribute,
};

const data = {
  key: "SubscribeNewspaper",
  value: false,
};

const contributions = {
  type: "boolean",
  label: "Would you like to subscribe to the newspaper",
  mandatory: true,
  assistant:
    "The newsletter is published every weekday and saturday in the morning",
  layouthint: [],
  options: [
    { code: "true", label: "Yes, I'd like to subscribe to the newsletter" },
    { code: "false", label: "No, I am not interested" },
  ],
  placeholder: "Select an option",
};

/**
 * Interactive
 */
export const interactive = () => {
  const choiceType = select(
    "Choice type",
    ["checkbox", "radio", "combobox", "toggle"],
    "checkbox",
    KNOB_GROUPS.MODULARUI
  );

  const layoutHints = [
    choiceType,
    ...layoutHintKnob(["attribute", "attribute/boolean"]),
  ];

  const attribute = new BooleanAttributeModel(
    {
      ...data,
      value: select("Value", [true, false], data.value, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      mandatory: boolean(
        "Mandatory",
        contributions.mandatory,
        KNOB_GROUPS.MODULARUI
      ),
      layouthint: layoutHints,
      assistant: text(
        "Assistant",
        contributions.assistant,
        KNOB_GROUPS.MODULARUI
      ),
      options: [
        {
          code: "true",
          label: text(
            "Alternative true label",
            contributions.options[0].label,
            KNOB_GROUPS.MODULARUI
          ),
        },
        {
          code: "false",
          label: text(
            "Alternative false label",
            contributions.options[1].label,
            KNOB_GROUPS.MODULARUI
          ),
        },
      ],
      placeholder: text(
        "Placeholder",
        contributions.placeholder,
        KNOB_GROUPS.MODULARUI
      ),
      readonly: boolean("Readonly", false, KNOB_GROUPS.MODULARUI),
    }
  );

  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      formLayout={formLayoutKnob()}
      onChange={action("onChange")}
    />
  );
};

/**
 * Checkbox BooleanAttribute
 */
export const checkbox = () => {
  const attribute = new BooleanAttributeModel(data, {
    ...contributions,
    layouthint: ["checkbox"],
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

/**
 * Radio BooleanAttribute
 */
export const radio = () => {
  const attribute = new BooleanAttributeModel(data, {
    ...contributions,
    layouthint: ["radio"],
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

/**
 * Combo BooleanAttribute
 */
export const combobox = () => {
  const attribute = new BooleanAttributeModel(data, {
    ...contributions,
    layouthint: ["combobox"],
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

/**
 * Toggle BooleanAttribute
 */
export const toggle = () => {
  const attribute = new BooleanAttributeModel(data, {
    ...contributions,
    layouthint: ["toggle"],
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const readonly = () => {
  const attribute = new BooleanAttributeModel(data, {
    ...contributions,
    layouthint: ["toggle"],
    readonly: true,
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

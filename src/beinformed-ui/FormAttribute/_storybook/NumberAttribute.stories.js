// @flow
import { KNOB_GROUPS } from "_storybook/constants";
import { layoutHintKnob, formLayoutKnob } from "_storybook/utils";

import { text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

// model dependency
import { NumberAttributeModel } from "beinformed/models";

// use _component registry
import {
  AttributeRenderer,
  NumberAttribute,
} from "_component-registry/attributes";

export default {
  title: "Attributes|Number attribute/Form",
  component: NumberAttribute,
};

const data = {
  key: "DistanceToSun",
  value: 149597870.34,
};

const contributions = {
  type: "number",
  label: "How far is earth from the sun?",
  mandatory: false,
  decimalSeparator: ",",
  assistant:
    "The distance from Earth to the sun is called an astronomical unit, or AU, which is used to measure distances throughout the solar system. ",
  format: "#,###.###",
  placeholder: "e.g. 1234",
  groupingSeparator: ".",
  layouthint: [],
  minimum: 1,
  maximum: 10,
  unit: "km",
};

export const interactive = () => {
  const attribute = new NumberAttributeModel(
    {
      ...data,
      value: number("Value", data.value, {}, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      unit: text("Unit", contributions.unit, KNOB_GROUPS.MODULARUI),
      format: text("Format", contributions.format, KNOB_GROUPS.MODULARUI),
      minimum: number(
        "Minimum value",
        contributions.minimum,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      maximum: number(
        "Maximum value",
        contributions.maximum,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      decimalSeparator: text(
        "External decimal symbol",
        contributions.decimalSeparator,
        KNOB_GROUPS.MODULARUI
      ),
      groupingSeparator: text(
        "External digit grouping symbol",
        contributions.groupingSeparator,
        KNOB_GROUPS.MODULARUI
      ),
      mandatory: boolean(
        "Mandatory",
        contributions.mandatory,
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
      readonly: boolean("Readonly", false, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute", "attribute/number"]),
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

export const europeanFormat = () => {
  const attribute = new NumberAttributeModel(data, contributions);

  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

export const britishFormat = () => {
  const attribute = new NumberAttributeModel(data, {
    ...contributions,
    decimalSeparator: ".",
    groupingSeparator: ",",
  });

  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

export const readonly = () => {
  const attribute = new NumberAttributeModel(data, {
    ...contributions,
    readonly: true,
  });

  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

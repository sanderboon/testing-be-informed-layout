// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select, number } from "@storybook/addon-knobs";

// model dependency
import { NumberAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Number attribute/Readonly",
  component: ReadonlyAttribute,
};

const data = { key: "DistanceToALessIsMoreBandGig", value: 400 };

const contributions = {
  type: "number",
  label: "Players in the Less is More Band",
  mandatory: true,
  unit: "players",
  decimalSeparator: ",",
  assistant: "The number of players in the band",
  format: "0.0",
  placeholder: "e.g. 1",
  groupingSeparator: ".",
  minimum: 1,
  maximum: 10,
};

/**
 * Interactive
 */
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
      layouthint: layoutHintKnob(["attribute", "attribute/number"]),
    }
  );

  return (
    <ReadonlyAttribute
      attribute={attribute}
      direction={select(
        "Direction",
        ["vertical", "horizontal"],
        null,
        KNOB_GROUPS.COMPONENT
      )}
      emptyValue={text("Empty value placeholder", "", KNOB_GROUPS.COMPONENT)}
      renderLabel={boolean("Render label", true, KNOB_GROUPS.COMPONENT)}
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
    <ReadonlyAttribute
      attribute={attribute}
      direction={select(
        "Direction",
        ["vertical", "horizontal"],
        null,
        KNOB_GROUPS.COMPONENT
      )}
      emptyValue={text("Empty value placeholder", "", KNOB_GROUPS.COMPONENT)}
      renderLabel={boolean("Render label", true, KNOB_GROUPS.COMPONENT)}
    />
  );
};

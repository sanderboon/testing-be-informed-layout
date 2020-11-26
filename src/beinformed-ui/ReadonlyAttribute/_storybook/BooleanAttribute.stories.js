// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { BooleanAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Boolean attribute/Readonly",
  component: ReadonlyAttribute,
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
  const attribute = new BooleanAttributeModel(
    {
      ...data,
      value: select("Value", [true, false], data.value, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      layouthint: [
        "toggle",
        ...layoutHintKnob(["attribute", "attribute/boolean"]),
      ],
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
interactive.story = {
  name: "interactive",
};

// Value TRUE
export const trueValue = () => {
  const attribute = new BooleanAttributeModel(
    { ...data, value: true },
    contributions
  );
  return <ReadonlyAttribute attribute={attribute} />;
};
trueValue.story = {
  name: "true",
};

// Value FALSE
export const falseValue = () => {
  const attribute = new BooleanAttributeModel(
    { ...data, value: false },
    contributions
  );
  return <ReadonlyAttribute attribute={attribute} />;
};
falseValue.story = {
  name: "false",
};

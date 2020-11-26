// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import {
  text,
  boolean,
  select,
  optionsKnob as options,
} from "@storybook/addon-knobs";

// model dependency
import { ChoiceAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Choice attribute/Readonly",
  component: ReadonlyAttribute,
};

const data = {
  key: "FavoriteCar",
  value: ["AudiQ5", "BMW5Series"],
};

const contributions = {
  type: "string",
  label: "Favorite car",
  mandatory: true,
  optionMode: "static",
  multiplechoice: false,
  assistant: "This includes your current favorite car",
  layouthint: ["checkbox"],
  enumerated: true,
  options: [
    {
      code: "AudiQ5",
      label: "Audi Q5",
    },
    {
      code: "BMW5Series",
      label: "BMW 5 Series",
    },
    {
      code: "ChevroletSilverado",
      label: "Chevrolet Silverado",
    },
    {
      code: "ChryslerPacifica",
      label: "Chrysler Pacifica",
    },
    {
      code: "FiatPanda",
      label: "Fiat Panda",
    },
    {
      code: "FerrariGTO",
      label: "Ferrari GTO",
    },
  ],
};

const getSelectableOptionCodes = (options) => {
  const allOptions = {};
  for (const [, value] of Object.entries(options)) {
    allOptions[value.code] = value.code;
  }

  return allOptions;
};

/**
 * Interactive
 */
export const interactive = () => {
  const selectedValues = options(
    "Selected",
    getSelectableOptionCodes(contributions.options),
    "FerrariGTO",
    { display: "multi-select" },
    KNOB_GROUPS.MODULARUI
  );

  const attribute = new ChoiceAttributeModel(
    { ...data, value: selectedValues },
    {
      ...contributions,
      layouthint: [
        "toggle",
        ...layoutHintKnob(["attribute", "attribute/choice"]),
      ],
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
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

/**
 * No value with emptyValue
 */
export const noValue = () => {
  const attribute = new ChoiceAttributeModel(
    { ...data, value: [] },
    contributions
  );

  return <ReadonlyAttribute attribute={attribute} emptyValue={"-"} />;
};

noValue.story = {
  name: "no value",
};

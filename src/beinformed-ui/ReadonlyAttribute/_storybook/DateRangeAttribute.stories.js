// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { boolean, select, text } from "@storybook/addon-knobs";

// model dependency
import { CompositeAttributeModel } from "beinformed/models";

// use _component registry
import { RangeAttribute } from "_component-registry/attributes";
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";

import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Daterange attribute/Readonly",
  component: RangeAttribute,
};

const data = {
  key: "PeriodTravelingWithFamily",
  children: [
    {
      key: "Begin",
      value: "2018-07-29",
    },
    {
      key: "End",
      value: "2018-08-02",
    },
  ],
};
const contributions = {
  type: "range",
  label: "Period traveling with family",
  mandatory: false,
  assistant: "The period of the holiday period",
  children: [
    {
      Begin: {
        type: "date",
        label: "Begin",
        mandatory: true,
        formatlabel: "dd-mm-yyyy",
        assistant: "The first day",
        format: "dd-MM-yyyy",
        placeholder: "enter a date",
      },
    },
    {
      End: {
        type: "date",
        label: "End",
        mandatory: true,
        formatlabel: "dd-mm-yyyy",
        assistant: "The last day",
        format: "dd-MM-yyyy",
        placeholder: "enter a date",
      },
    },
  ],
};

/**
 * Interactive
 */
export const interactive = () => {
  const childKnobs = (childContributions, group) => ({
    ...childContributions,
    label: text("Label", childContributions.label, group),
    format: text("Format", childContributions.format, group),
    assistant: text("Assistant", childContributions.assistant, group),
    layouthint: layoutHintKnob(
      ["attribute", "attribute/date"],
      "Layout hint",
      group
    ),
  });

  const rangeContributions = {
    ...contributions,
    label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
    assistant: text(
      "Assistant",
      contributions.assistant,
      KNOB_GROUPS.MODULARUI
    ),
    layouthint: layoutHintKnob(["attribute", "attribute/range"]),
    children: [
      {
        Begin: childKnobs(
          contributions.children[0].Begin,
          `${KNOB_GROUPS.MODULARUI} - Start attribute`
        ),
      },
      {
        End: childKnobs(
          contributions.children[1].End,
          `${KNOB_GROUPS.MODULARUI} - End attribute`
        ),
      },
    ],
  };

  const attribute = new CompositeAttributeModel(
    {
      ...data,
      children: [
        {
          ...data.children[0],
          value: text(
            "Value",
            data.children[0].value,
            `${KNOB_GROUPS.MODULARUI} - Start attribute`
          ),
        },
        {
          ...data.children[1],
          value: text(
            "Value",
            data.children[1].value,
            `${KNOB_GROUPS.MODULARUI} - End attribute`
          ),
        },
      ],
    },
    rangeContributions
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

export const range = () => {
  const attribute = new CompositeAttributeModel(data, contributions);
  return <ReadonlyAttribute name={attribute.name} attribute={attribute} />;
};

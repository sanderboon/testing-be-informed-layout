// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { CompositeAttributeModel } from "beinformed/models";

// use _component registry
import { RangeAttribute } from "_component-registry/attributes";
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";

import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Timestamprange attribute/Readonly",
  component: RangeAttribute,
};

const data = {
  key: "ExactPeriodFormula1Race",
  children: [
    {
      key: "Start",
      value: "2018-08-05T15:10:01.123",
    },
    {
      key: "Finish",
      value: "2018-12-15T16:25:52.123",
    },
  ],
};
const contributions = {
  type: "range",
  label: "Exact period formula 1 race",
  mandatory: false,
  assistant: "Start and finish time of the race",
  children: [
    {
      Start: {
        type: "timestamp",
        label: "Start",
        mandatory: true,
        formatlabel: "dd-mm-yyyy hh:mm:ss.sss",
        assistant: "This is the time the race started",
        format: "dd-MM-yyyy HH:mm:ss.SSS",
        placeholder: "enter a start time",
      },
    },
    {
      Finish: {
        type: "timestamp",
        label: "Finish",
        mandatory: true,
        formatlabel: "dd-mm-yyyy hh:mm:ss.sss",
        assistant: "This is the time the race ended",
        format: "dd-MM-yyyy HH:mm:ss.SSS",
        placeholder: "enter a finish time",
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
        Start: childKnobs(
          contributions.children[0].Start,
          `${KNOB_GROUPS.MODULARUI} - Start attribute`
        ),
      },
      {
        Finish: childKnobs(
          contributions.children[1].Finish,
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

export const rangeSameDate = () => {
  const sameDayDates = [
    {
      key: "Start",
      value: "2018-08-05T15:10:01.123",
    },
    {
      key: "Finish",
      value: "2018-08-05T16:25:52.123",
    },
  ];

  const attribute = new CompositeAttributeModel(
    { ...data, children: sameDayDates },
    contributions
  );
  return <ReadonlyAttribute name={attribute.name} attribute={attribute} />;
};

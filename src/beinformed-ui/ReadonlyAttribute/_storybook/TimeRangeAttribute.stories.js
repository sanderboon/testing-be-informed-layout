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
  title: "Attributes/Timerange attribute/Readonly",
  component: RangeAttribute,
};

const data = {
  key: "RunningMarathonTime",
  children: [
    {
      key: "Start",
      value: "11:01:02",
    },
    {
      key: "Finish",
      value: "14:11:05",
    },
  ],
};
const contributions = {
  type: "range",
  label: "Running marathon time",
  mandatory: false,
  assistant: "Start and finish time of the marathon",
  children: [
    {
      Start: {
        type: "time",
        label: "Start",
        mandatory: true,
        formatlabel: "hh:mm:ss",
        assistant: "This is the time the marathon started",
        format: "HH:mm:ss",
        placeholder: "enter a start time",
      },
    },
    {
      Finish: {
        type: "time",
        label: "Finish",
        mandatory: true,
        formatlabel: "hh:mm:ss",
        assistant: "This is the time the marathon ended",
        format: "HH:mm:ss",
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

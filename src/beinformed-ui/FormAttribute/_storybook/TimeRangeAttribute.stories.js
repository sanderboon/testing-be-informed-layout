// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

// model dependency
import { CompositeAttributeModel } from "beinformed/models";

// use _component registry
import {
  RangeAttribute,
  AttributeRenderer,
} from "_component-registry/attributes";
import { layoutHintKnob, formLayoutKnob } from "_storybook/utils";

export default {
  title: "Attributes/Timerange attribute/Form",
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
    mandatory: boolean("Mandatory", childContributions.mandatory, group),
    format: text("Format", childContributions.format, group),
    formatlabel: text("Format label", childContributions.formatlabel, group),
    assistant: text("Assistant", childContributions.assistant, group),
    placeholder: text("Placeholder", childContributions.placeholder, group),
    displaysize: number("Size", childContributions.displaysize, {}, group),
    readonly: boolean("Readonly", false, group),
    layouthint: layoutHintKnob(
      ["attribute", "attribute/date"],
      "Layout hint",
      group
    ),
  });

  const rangeContributions = {
    ...contributions,
    label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
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
    readonly: boolean("Readonly", false, KNOB_GROUPS.MODULARUI),
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
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
      formLayout={formLayoutKnob()}
    />
  );
};

export const range = () => {
  const attribute = new CompositeAttributeModel(data, contributions);
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const readonly = () => {
  const attribute = new CompositeAttributeModel(data, {
    ...contributions,
    readonly: true,
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

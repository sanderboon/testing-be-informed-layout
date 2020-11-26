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
  title: "Attributes/Timestamprange attribute/Form",
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

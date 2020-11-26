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
  title: "Attributes/Datetimerange attribute/Form",
  component: RangeAttribute,
};

const data = {
  key: "PeriodTravelingWithFamilyWithTime",
  children: [
    {
      key: "Begin",
      value: "2020-08-06T01:00:00",
    },
    {
      key: "End",
      value: "2020-08-09T02:30:00",
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
        assistant: "The first day",
        format: "dd-MM-yyyy HH:mm",
        formatlabel: "dd-mm-yyyy hh:mm",
        label: "Begin",
        mandatory: true,
        placeholder: "enter a date",
        type: "datetime",
      },
    },
    {
      End: {
        assistant: "The last day",
        format: "dd-MM-yyyy HH:mm",
        formatlabel: "dd-mm-yyyy hh:mm",
        label: "End",
        mandatory: true,
        placeholder: "enter a date",
        type: "datetime",
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
    mindate: number("Minimum length", childContributions.mindate, {}, group),
    maxdate: number("Maximum length", childContributions.maxdate, {}, group),
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
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      formLayout={formLayoutKnob()}
      onChange={action("onChange")}
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

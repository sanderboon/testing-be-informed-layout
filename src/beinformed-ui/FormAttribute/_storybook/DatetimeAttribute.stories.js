// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

// model dependency
import { DatetimeAttributeModel } from "beinformed/models";

// use _component registry
import {
  DatetimeAttribute,
  AttributeRenderer,
} from "_component-registry/attributes";
import { layoutHintKnob, formLayoutKnob } from "_storybook/utils";

export default {
  title: "Attributes/Datetime attribute/Form",
  component: DatetimeAttribute,
};

const data = { key: "StartDateAndTimeAtCompany", value: "2017-07-29T18:41:21" };

const contributions = {
  assistant: "The date and time of the first working day",
  format: "dd-MM-yyyy HH:mm:ss",
  formatlabel: "dd-mm-yyyy hh:mm:ss",
  label: "Start date and time at company",
  placeholder: "enter a date with time",
  type: "datetime",
};

/**
 * Interactive
 */
export const interactive = () => {
  const attribute = new DatetimeAttributeModel(
    {
      ...data,
      value: text("Value", data.value, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      mandatory: boolean(
        "Mandatory",
        contributions.mandatory,
        KNOB_GROUPS.MODULARUI
      ),
      format: text("Format", contributions.format, KNOB_GROUPS.MODULARUI),
      formatlabel: text(
        "Format label",
        contributions.formatlabel,
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
      displaysize: number(
        "Size",
        contributions.displaysize,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      mindate: number(
        "Minimum length",
        contributions.mindate,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      maxdate: number(
        "Maximum length",
        contributions.maxdate,
        {},
        KNOB_GROUPS.MODULARUI
      ),
      readonly: boolean("Readonly", false, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute", "attribute/date"]),
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

export const timePrecisionInMinutes = () => {
  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: "dd-MM-yyyy HH:mm",
    formatlabel: "dd-MM-yyyy HH:mm",
  });

  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const timePrecisionInSeconds = () => {
  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: "dd-MM-yyyy HH:mm:ss",
    formatlabel: "dd-MM-yyyy HH:mm:ss",
  });

  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const readonly = () => {
  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    readonly: true,
  });

  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

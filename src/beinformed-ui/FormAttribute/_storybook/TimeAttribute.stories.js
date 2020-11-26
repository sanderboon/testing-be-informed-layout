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
  title: "Attributes/Time attribute/Form",
  component: DatetimeAttribute,
};

const data = { key: "ArrivalTrain", value: "10:13:29" };
const contributions = {
  type: "time",
  label: "Arrival train",
  mandatory: false,
  formatlabel: "hh:mm:ss",
  assistant: "Arrival time of this train",
  format: "HH:mm:ss",
  placeholder: "enter a time",
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
      readonly: boolean("Readonly", false, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute", "attribute/time"]),
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

export const time = () => {
  const attribute = new DatetimeAttributeModel(data, contributions);
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const minutes = () => {
  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: "HH:mm",
    formatlabel: "hh:mm",
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const hours = () => {
  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: "HH",
    formatlabel: "hh",
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const readonly = () => {
  const attribute = new DatetimeAttributeModel(data, {
    contributions,
    readonly: true,
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

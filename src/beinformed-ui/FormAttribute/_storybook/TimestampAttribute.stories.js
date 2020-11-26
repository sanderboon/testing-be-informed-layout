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
  title: "Attributes/Timestamp attribute/Form",
  component: DatetimeAttribute,
};

const data = {
  key: "ExactLaunchTimeApollo14",
  value: "1971-01-31T04:03:02.123",
};
const contributions = {
  type: "timestamp",
  label: "Exact launch time Apollo 14",
  mandatory: false,
  formatlabel: "dd-mm-yyyy hh:mm:ss.fff",
  assistant: "This is the exact launch time of the Apollo 14",
  format: "dd-MM-yyyy HH:mm:ss.SSS",
  placeholder: "enter an exact date time",
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
      layouthint: layoutHintKnob(["attribute", "attribute/timestamp"]),
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

export const readonly = () => {
  const attribute = new DatetimeAttributeModel(data, {
    contributions,
    readonly: true,
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

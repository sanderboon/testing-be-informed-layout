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
  title: "Attributes/Date attribute/Form",
  component: DatetimeAttribute,
};

const data = { key: "StartedAtCompany", value: "2019-10-23" };
const contributions = {
  type: "date",
  label: "Started at company",
  mandatory: false,
  formatlabel: "dd-mm-yyyy",
  assistant: "The date is the first working day",
  format: "dd-MM-yyyy",
  placeholder: "enter a date",
  mindate: "1978-09-01",
  maxdate: "2099-10-01",
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

export const date = () => {
  const attribute = new DatetimeAttributeModel(data, contributions);
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const month = () => {
  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: "MM-yyyy",
    formatlabel: "mm-yyyy",
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const year = () => {
  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: "yyyy",
    formatlabel: "yyyy",
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

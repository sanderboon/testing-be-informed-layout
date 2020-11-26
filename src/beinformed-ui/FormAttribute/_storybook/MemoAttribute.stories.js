// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

// model dependency
import { MemoAttributeModel } from "beinformed/models";

// use _component registry
import {
  MemoAttribute,
  AttributeRenderer,
} from "_component-registry/attributes";

import { layoutHintKnob, formLayoutKnob } from "_storybook/utils";

export default {
  title: "Attributes/Memo attribute/Form",
  component: MemoAttribute,
};

const data = { key: "MemoAttribute_Mandatory", value: "Mandatory text" };

const contributions = {
  columns: 50,
  formatted: false,
  label: "Memo attribute - Mandatory",
  rows: 5,
  type: "string",
};

/**
 * Interactive
 */
export const interactive = () => {
  const attribute = new MemoAttributeModel(
    {
      ...data,
      value: text("Value", data.value, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("label", contributions.label, KNOB_GROUPS.MODULARUI),
      formatted: boolean(
        "Formatted input",
        contributions.formatted,
        KNOB_GROUPS.MODULARUI
      ),
      layouthint: layoutHintKnob(["attribute", "attribute/memo"]),
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

export const formatted = () => {
  const attribute = new MemoAttributeModel(data, {
    ...contributions,
    formatted: true,
  });

  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

export const readonly = () => {
  const attribute = new MemoAttributeModel(data, {
    contributions,
    readonly: true,
  });
  return <AttributeRenderer name={attribute.name} attribute={attribute} />;
};

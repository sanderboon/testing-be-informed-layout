// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { MemoAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Memo attribute/Readonly",
  component: ReadonlyAttribute,
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
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute", "attribute/memo"]),
    }
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

interactive.story = {
  name: "interactive",
};

export const string = () => {
  const attribute = new MemoAttributeModel(data, contributions);
  return <ReadonlyAttribute attribute={attribute} />;
};

string.story = {
  name: "string",
};

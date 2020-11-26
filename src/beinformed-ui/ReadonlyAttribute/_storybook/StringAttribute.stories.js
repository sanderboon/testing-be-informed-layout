// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { StringAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/String attribute/Readonly",
  component: ReadonlyAttribute,
};

const data = {
  key: "FavouritePet",
  value: "Ziggy",
};
const contributions = {
  type: "string",
  label: "What is the name of your favourite pet",
  mandatory: true,
  assistant: "Use the security question to verify your identity",
  layouthint: [],
};

/**
 * Interactive
 */
export const interactive = () => {
  const attribute = new StringAttributeModel(
    {
      ...data,
      value: text("Value", data.value, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      postfix: text("Post fix", contributions.postfix, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute", "attribute/string"]),
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

// Standard
export const string = () => {
  const attribute = new StringAttributeModel(data, contributions);
  return <ReadonlyAttribute attribute={attribute} />;
};
string.story = {
  name: "string",
};

// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { DatetimeAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Time attribute/Readonly",
  component: ReadonlyAttribute,
};

const data = { key: "ArrivalTrain", value: "22:13:29" };
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
      format: text("Format", contributions.format, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute", "attribute/date"]),
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

// Standard
export const time = () => {
  const attribute = new DatetimeAttributeModel(data, contributions);
  return <ReadonlyAttribute attribute={attribute} />;
};

export const formats = () => {
  const formatVariations = ["HH:mm:ss", "hh:mm a", "HH:mm"];

  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: select(
      "Format",
      formatVariations,
      "dd-MM-yyyy",
      KNOB_GROUPS.MODULARUI
    ),
  });
  return <ReadonlyAttribute attribute={attribute} />;
};

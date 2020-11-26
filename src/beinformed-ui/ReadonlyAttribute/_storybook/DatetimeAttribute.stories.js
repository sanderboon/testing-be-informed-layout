// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { DatetimeAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

const data = { key: "StartDateAndTimeAtCompany", value: "2017-07-29T18:41:21" };

const contributions = {
  assistant: "The date and time of the first working day",
  format: "dd-MM-yyyy HH:mm:ss",
  formatlabel: "dd-mm-yyyy hh:mm:ss",
  label: "Start date and time at company",
  placeholder: "enter a date with time",
  type: "datetime",
};

export default {
  title: "Attributes/Datetime attribute/Readonly",
  component: ReadonlyAttribute,
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
      assistant: text(
        "Assistant",
        contributions.assistant,
        KNOB_GROUPS.MODULARUI
      ),
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
export const date = () => {
  const attribute = new DatetimeAttributeModel(data, contributions);
  return <ReadonlyAttribute attribute={attribute} />;
};

export const formats = () => {
  const formatVariations = [
    "dd-M-yyyy hh:mm:ss",
    "dd-MM-yyyy hh:mm:ss a",
    "E, dd MMM yyyy HH:mm:ss z",
    "EEEE dd MMMM yyyy HH:mm:ss",
  ];

  const attribute = new DatetimeAttributeModel(data, {
    ...contributions,
    format: select(
      "Format",
      formatVariations,
      "dd-MM-yyyy hh:mm",
      KNOB_GROUPS.MODULARUI
    ),
  });
  return <ReadonlyAttribute attribute={attribute} />;
};

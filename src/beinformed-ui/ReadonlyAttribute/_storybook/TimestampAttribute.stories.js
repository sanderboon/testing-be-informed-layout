// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { DatetimeAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Timestamp attribute/Readonly",
  component: ReadonlyAttribute,
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
export const timestamp = () => {
  const attribute = new DatetimeAttributeModel(data, contributions);
  return <ReadonlyAttribute attribute={attribute} />;
};

export const formats = () => {
  const formatVariations = [
    "dd-MM-yyyy hh:mm:ss.SSS",
    "MM/dd/yy hh:mm",
    "EE, MMMM d, yyyy HH:mm",
    "dd-M-yyyy hh:mm:ss",
    "EEEE, MMMM yyyy HH:mm:ss.SSS z",
    "E, dd MMM yyyy HH:mm:ss z",
  ];

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

// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { DatetimeAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { layoutHintKnob } from "_storybook/utils";

export default {
  title: "Attributes/Date attribute/Readonly",
  component: ReadonlyAttribute,
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
    "dd-MM-yyyy",
    "MM/dd/yy",
    "EE, MMMM d, yyyy",
    "dd-M-yyyy hh:mm:ss",
    "dd MMMM yyyy",
    "dd MMMM yyyy zzzz",
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

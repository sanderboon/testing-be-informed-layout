import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { formLayoutKnob, layoutHintKnob } from "_storybook/utils";

// model dependency
import { MoneyAttributeModel } from "beinformed/models";

// use _component registry
import {
  AttributeRenderer,
  MoneyAttribute,
} from "_component-registry/attributes";

export default {
  title: "Attributes|Money attribute/Form",
  component: MoneyAttribute,
};

const data = { key: "TicketForTheLessIsMoreBand", value: 1200.4 };

const contributions = {
  type: "number",
  label: "Ticket for the Less is More Band concert",
  decimalSeparator: ",",
  assistant:
    "The price for a ticket to this beautifull concert. The price of a ticket is from € 5 to € 50",
  layouthint: ["money"],
  format: "#,##0.00",
  currencySymbol: "€",
  placeholder: "e.g. 12,50",
  groupingSeparator: ".",
  minimum: 5,
  maximum: 50,
};

export const interactive = () => {
  const attribute = new MoneyAttributeModel(
    {
      ...data,
      value: text("Value", data.value, KNOB_GROUPS.MODULARUI),
    },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
      format: text("Mask", contributions.format, KNOB_GROUPS.MODULARUI),
      minimum: text(
        "Minimum value",
        contributions.minimum,
        KNOB_GROUPS.MODULARUI
      ),
      maximum: text(
        "Maximum value",
        contributions.maximum,
        KNOB_GROUPS.MODULARUI
      ),
      decimalSeparator: text(
        "External decimal symbol",
        contributions.decimalSeparator,
        KNOB_GROUPS.MODULARUI
      ),
      groupingSeparator: text(
        "External digit grouping symbol",
        contributions.groupingSeparator,
        KNOB_GROUPS.MODULARUI
      ),
      mandatory: boolean(
        "Mandatory",
        contributions.mandatory,
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
      currencySymbol: select(
        "Currency symbol",
        ["£", "€", "$", "￥"],
        "$",
        KNOB_GROUPS.MODULARUI
      ),
      readonly: boolean("Readonly", false, KNOB_GROUPS.MODULARUI),
      layouthint: layoutHintKnob(["attribute"]),
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

export const dollar = () => {
  const attribute = new MoneyAttributeModel(data, {
    ...contributions,
    currencySymbol: "$",
    groupingSeparator: ",",
    decimalSeparator: ".",
    format: "#,###.##",
  });
  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

export const pound = () => {
  const attribute = new MoneyAttributeModel(data, {
    ...contributions,
    currencySymbol: "£",
    groupingSeparator: ",",
    decimalSeparator: ".",
    format: "#,##0.000", // ?
  });
  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

export const yen = () => {
  const attribute = new MoneyAttributeModel(data, {
    ...contributions,
    currencySymbol: "￥",
    groupingSeparator: ".",
    decimalSeparator: ",",
    format: "#,##0",
  });
  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

export const euro = () => {
  const attribute = new MoneyAttributeModel(data, {
    ...contributions,
    currencySymbol: "€",
    format: "#,###.00",
  });
  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

// Readonly
export const readonly = () => {
  const attribute = new MoneyAttributeModel(data, {
    ...contributions,
    readonly: true,
  });

  return (
    <AttributeRenderer
      name={attribute.name}
      attribute={attribute}
      onChange={action("onChange")}
    />
  );
};

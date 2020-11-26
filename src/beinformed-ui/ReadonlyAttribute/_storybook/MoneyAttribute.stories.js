import { KNOB_GROUPS } from "_storybook/constants";

import { text, boolean, select } from "@storybook/addon-knobs";

// model dependency
import { MoneyAttributeModel } from "beinformed/models";

// use _component registry
import { ReadonlyAttribute } from "_component-registry/attributes-readonly";

export default {
  title: "Attributes/Money attribute/Read only",
  component: ReadonlyAttribute,
};

const data = { key: "TicketForTheLessIsMoreBand", value: 12 };

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

/**
 * Interactive
 */
export const interactive = () => {
  const attribute = new MoneyAttributeModel(
    { ...data, value: text("Value", data.value, KNOB_GROUPS.MODULARUI) },
    {
      ...contributions,
      label: text("Label", contributions.label, KNOB_GROUPS.MODULARUI),
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

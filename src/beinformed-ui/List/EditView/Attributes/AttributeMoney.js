// @flow
import { AttributeNumber } from "_component-registry/inline-edit";

import type { MoneyAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: MoneyAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Renders number widget, same as text widget with different css class
 */
const AttributeMoney = (props: Props) => <AttributeNumber {...props} />;

AttributeMoney.displayName = "BI.AttributeMoney";

export default AttributeMoney;

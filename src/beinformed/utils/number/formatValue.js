// @flow
import { isNil, isNumber } from "lodash";

import { IllegalArgumentException } from "beinformed/exceptions";

import DecimalFormat from "beinformed/utils/number/DecimalFormat";
import parseToNumber from "beinformed/utils/number/parseToNumber";

const updateGroupingSeparator = (input: string, groupingSeparator: string) => {
  if (isNil(groupingSeparator)) {
    return input;
  }

  return input.replace(/,/g, groupingSeparator);
};

const formatValue = (
  value: ?number | ?string,
  format: string = "0",
  groupingSeparator: string = ",",
  decimalSeparator: string = "."
) => {
  if (isNil(value)) {
    return "";
  }

  const numberValue = isNumber(value)
    ? value
    : parseToNumber(value, groupingSeparator, decimalSeparator);

  if (!isNumber(numberValue)) {
    throw new IllegalArgumentException(
      `Not a valid number: ${value} for formatValue`
    );
  }

  const stringValue = numberValue.toString();

  if (format !== null) {
    const formattedValue = new DecimalFormat(format).format(stringValue);

    const [integer, decimal] = formattedValue.split(".");

    const integerPart = updateGroupingSeparator(integer, groupingSeparator);

    if (decimal) {
      return `${integerPart}${decimalSeparator}${decimal}`;
    }

    return integerPart;
  }

  return stringValue;
};

export default formatValue;

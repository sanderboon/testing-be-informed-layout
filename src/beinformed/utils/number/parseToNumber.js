// @flow
import { toNumber, isNil, isNumber } from "lodash";

const removeGroupingSeparator = (input, groupingSeparator) => {
  if (isNumber(input)) {
    return input;
  }

  if (isNil(groupingSeparator)) {
    return input;
  }

  const escapedGroupingSeparator = groupingSeparator.replace(
    /[$()*+.?[\\\]^{|}]/g,
    "\\$&"
  );

  return input.replace(new RegExp(escapedGroupingSeparator, "g"), "");
};

const updateDecimalSeparator = (input, decimalSeparator) => {
  if (isNumber(input)) {
    return input;
  }

  if (isNil(decimalSeparator) || decimalSeparator === "") {
    return input;
  }

  return input.replace(decimalSeparator, ".");
};

/**
 * Parses input into a number, removes the grouping separator from the input and
 * replaces the decimapseparator with a dot to make it a JavaScript parseable number
 */
const parseToNumber = (
  input: ?string | ?number,
  groupingSeparator: ?string = ",",
  decimalSeparator: ?string = "."
) => {
  if (isNil(input) || input === "") {
    return NaN;
  }

  const inputNoGrouping = removeGroupingSeparator(input, groupingSeparator);

  const inputCorrectDecimalSeparator = updateDecimalSeparator(
    inputNoGrouping,
    decimalSeparator
  );

  return toNumber(inputCorrectDecimalSeparator);
};

export default parseToNumber;

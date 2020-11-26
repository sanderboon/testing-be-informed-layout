// @flow
// @see: https://docs.oracle.com/javase/tutorial/i18n/format/decimalFormat.html
class DecimalFormat {
  _prefix: string;
  _suffix: string;

  // Grouping size
  _comma: number;
  // Minimum integer digits to be displayed
  _minInt: number;

  // Minimum fractional digits to be displayed
  _minFrac: number;
  // Maximum fractional digits to be displayed
  _maxFrac: number;

  _isPercentage: boolean;

  constructor(format: string) {
    this.setAffix(format);
    this.setFractionLengths(format);
    this.setGroupLength(format);
    this.setMinLength(format);

    this.setPercentage();
  }

  get prefix() {
    return this._prefix;
  }

  get suffix() {
    return this._suffix;
  }

  get comma() {
    return this._comma;
  }

  get minInt() {
    return this._minInt;
  }

  get minFrac() {
    return this._minFrac;
  }

  get maxFrac() {
    return this._maxFrac;
  }

  get isPercentage() {
    return this._isPercentage;
  }

  setAffix(format: string) {
    const beforeDigit = format.includes("#")
      ? format.substring(0, format.indexOf("#"))
      : format;

    this._prefix = beforeDigit.includes("0")
      ? beforeDigit.substring(0, beforeDigit.indexOf("0"))
      : beforeDigit;
    this._suffix = format
      .substring(this._prefix.length)
      .replace(/[#,.0]/gu, "");
  }

  setFractionLengths(format: string) {
    this._minFrac = 0;
    this._maxFrac = 0;

    const numberStr = format.replace(/[^#,.0]/gu, "");
    if (numberStr.includes(".")) {
      const fracStr = numberStr.substring(numberStr.indexOf(".") + 1);

      const maxFrac = fracStr.replace(/,|\.+/g, "");
      this._maxFrac = maxFrac.length;

      // replace all but zeros
      const minFrac = maxFrac.replace(/[^0]/gu, "");
      this._minFrac = minFrac.length;
    }
  }

  setGroupLength(format: string) {
    this._comma = 0;

    const numberStr = format.replace(/[^#,.0]/gu, "");
    const intStr = numberStr.includes(".")
      ? numberStr.substring(0, numberStr.indexOf("."))
      : numberStr;

    if (intStr.includes(",")) {
      this._comma = intStr.length - 1 - intStr.lastIndexOf(",");
    }
  }

  setMinLength(format: string) {
    const intFormatStr = format.includes(".")
      ? format.substring(0, format.indexOf("."))
      : format;
    const intStr = intFormatStr.replace(/[^0]/gu, "");

    this._minInt = intStr.length > 1 ? intStr.length : 1;
  }

  setPercentage() {
    this._isPercentage = this.suffix.charAt(0) === "%";
  }

  /**
   * Solves problem where big numbers loose the precision:
   * e.g. Number(23423423423342234.34) => 23423423423342236
   */
  static getNumericString(stringNumber: string) {
    const number = Number(stringNumber);
    const string = String(number);

    if (!string.includes(".") && stringNumber.includes(".")) {
      // check if original string has all zeros after dot or not
      const precision = stringNumber.substring(stringNumber.indexOf(".") + 1);
      if (precision.replace(/0/gu, "").length > 0) {
        return stringNumber;
      }

      return string;
    }

    return stringNumber;
  }

  /**
   * Converts formatted value back to non-formatted value
   * e.g. $1,223.06 --> 1223.06
   */
  formatBack(formattedNumber: string) {
    const stringNumber = String(formattedNumber);

    if (!stringNumber) {
      return "";
    }

    if (!isNaN(stringNumber)) {
      return DecimalFormat.getNumericString(stringNumber);
    }

    let tempNumber = formattedNumber;

    let negative = false;
    if (formattedNumber.charAt(0) === "-") {
      tempNumber = formattedNumber.substr(1);
      negative = true;
    }

    const hasPrefix = formattedNumber.startsWith(this.prefix);

    const suffixIndex =
      this.suffix === ""
        ? formattedNumber.length
        : formattedNumber.indexOf(this.suffix, this.prefix.length + 1);

    if (hasPrefix && suffixIndex > 0) {
      tempNumber = tempNumber.substr(0, suffixIndex);
      tempNumber = tempNumber.substr(this.prefix.length);
      tempNumber = tempNumber.replace(/,/gu, "");

      if (negative) {
        tempNumber = `-${tempNumber}`;
      }

      if (!isNaN(tempNumber)) {
        return DecimalFormat.getNumericString(tempNumber);
      }
    }

    return tempNumber;
  }

  static scientificNumber(stringNumber: string) {
    if (stringNumber.includes("e")) {
      const number = Number(stringNumber);
      if (number === Infinity || number === -Infinity) {
        return stringNumber;
      }

      return String(number);
    }

    return stringNumber;
  }

  getFracAsNumber(fracStr: string) {
    const number = Number(`0.${fracStr}`);
    const DECIMAL_RADIX = 10;

    return this.maxFrac === 0
      ? Math.round(number).toString(DECIMAL_RADIX)
      : number.toFixed(this.maxFrac);
  }

  getRoundedFrac(fracStr: string) {
    const num = this.getFracAsNumber(fracStr);

    // toFixed method has bugs on IE (0.7 --> 0)
    return num.substr(2);
  }

  static getFraction(number: string) {
    let fracStr = number.includes(".")
      ? number.substring(number.indexOf(".") + 1)
      : "";

    fracStr = fracStr.replace(/\./, "");

    return fracStr;
  }

  getFracCorrectLength(frac: string) {
    let fracStr = frac;

    if (fracStr.length > this.maxFrac) {
      fracStr = this.getRoundedFrac(fracStr);
    }

    for (let i = fracStr.length; i < this.minFrac; i++) {
      // if minFrac=4 then 1.12 --> 1.1200
      fracStr = `${fracStr}0`;
    }

    while (
      fracStr.length > this.minFrac &&
      fracStr.charAt(fracStr.length - 1) === "0"
    ) {
      // if minInt=4 then 00034 --> 0034)
      fracStr = fracStr.substring(0, fracStr.length - 1);
    }

    return fracStr;
  }

  getInteger(number: string) {
    let intStr = number.includes(".")
      ? number.substring(0, number.indexOf("."))
      : number;

    let doCarry = Number(this.getFracAsNumber(number)) > 1;
    let i = intStr.length - 1;

    while (doCarry) {
      if (i === -1) {
        intStr = `1${intStr}`;
        break;
      }

      let x = intStr.charAt(i);
      if (x === "9") {
        x = "0";
      } else {
        x = `${x + 1}`;
        doCarry = false;
      }

      intStr =
        intStr.substring(0, i) + x + intStr.substring(i + 1, intStr.length);

      i -= 1;
    }

    for (let j = intStr.length; j < this.minInt; j++) {
      // if minInt=4 then 034 --> 0034
      intStr = `0${intStr}`;
    }

    while (intStr.length > this.minInt && intStr.charAt(0) === "0") {
      // if minInt=4 then 00034 --> 0034)
      intStr = intStr.substring(1);
    }

    return intStr;
  }

  addGrouping(intStr: string) {
    let groupedIntStr = intStr;

    let j = 0;
    for (let i = groupedIntStr.length; i > 0; i--) {
      // add commas
      if (j !== 0 && j % this.comma === 0) {
        groupedIntStr = `${groupedIntStr.substring(
          0,
          i
        )},${groupedIntStr.substring(i)}`;
        j = 0;
      }

      j += 1;
    }

    return groupedIntStr;
  }

  getFormattedValue(intStr: string, fracStr: string, isNegative: boolean) {
    let formattedValue = "";
    if (fracStr.length > 0)
      formattedValue = `${this.prefix + intStr}.${fracStr}${this.suffix}`;
    else formattedValue = this.prefix + intStr + this.suffix;

    if (isNegative) {
      formattedValue = `-${formattedValue}`;
    }

    return formattedValue;
  }

  /**
   * Formats given value, using the pattern
   * e.g. $#,###.00: 1223.06 --> $1,223.06
   */
  format(stringNumber: string = "") {
    if (stringNumber === null) {
      return "";
    }

    let formattedNumber = this.formatBack(stringNumber).toLowerCase();

    if (isNaN(formattedNumber) || formattedNumber.length === 0) {
      return stringNumber;
    }

    formattedNumber = DecimalFormat.scientificNumber(formattedNumber);
    if (formattedNumber.includes("e")) {
      return formattedNumber;
    }

    const isNegative = formattedNumber.charAt(0) === "-";
    if (isNegative || formattedNumber.charAt(0) === "+") {
      formattedNumber = formattedNumber.substring(1);
    }

    let fracStr = DecimalFormat.getFraction(formattedNumber);
    let intStr = this.getInteger(formattedNumber);
    if (this.isPercentage) {
      // Add zeros behind fraction to make sure we have at least two characters and take first two character:
      // 1 --> 100 --> 10
      const addZeroToFrac = `${fracStr}00`.substr(0, 2);
      // Add zeros in front of frac and get last two characters
      const lastTwoFrac = `00${addZeroToFrac}`.substr(-2);

      intStr = `${intStr}${lastTwoFrac}`;
      fracStr = fracStr.substr(2);
    }

    fracStr = this.getFracCorrectLength(fracStr);

    intStr = this.addGrouping(intStr);

    return this.getFormattedValue(intStr, fracStr, isNegative);
  }
}

export default DecimalFormat;

// @flow
import { get, has, isString, isNil } from "lodash";

import {
  DateUtil,
  DateTimeUtil,
  TimeUtil,
  TimestampUtil,
  ISO_DATE_FORMAT,
} from "beinformed/utils/datetime/DateTimeUtil";

import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import DateTimeDateFormatConstraint from "beinformed/models/constraints/DateTimeDateFormatConstraint";
import DateTimeTimeFormatConstraint from "beinformed/models/constraints/DateTimeTimeFormatConstraint";
import DatetimeFormatConstraint from "beinformed/models/constraints/DatetimeFormatConstraint";
import DateBoundaryConstraint from "beinformed/models/constraints/DateBoundaryConstraint";

import { getSetting } from "beinformed/constants/Settings";

// date format of default
const PRODUCT_DEFAULT_DATE_FORMAT = "dd-MM-yyyy";

class DatetimeAttributeModel extends StringAttributeModel {
  constructor(attribute: Object, attributeContributions: Object) {
    super(attribute, attributeContributions);

    this.updateInitValue();
  }

  static isApplicableModel(contributions: Object) {
    return ["date", "time", "datetime", "timestamp"].includes(
      contributions.type
    );
  }

  get formatUtil() {
    switch (this.type) {
      case "time":
        return TimeUtil;
      case "timestamp":
        return TimestampUtil;
      case "datetime":
        return DateTimeUtil;
      default:
        return DateUtil;
    }
  }

  /**
   * Set time in the correct value based on available elements in the time format
   */
  updateInitValue() {
    let value = this.data.value;
    if (!isNil(value)) {
      if (this.type === "time" && value.length === 5) {
        value = `${value}:00`;
      }

      if (this.hasTime) {
        if (!this.timeInputFormat.toLowerCase().includes("h")) {
          value = this.formatUtil.setHour(value, 0);
        }
        if (!this.timeInputFormat.includes("m")) {
          value = this.formatUtil.setMinute(value, 0);
        }
        if (!this.timeInputFormat.includes("s")) {
          value = this.formatUtil.setSecond(value, 0);
        }
        if (this.type === "timestamp" && !this.timeInputFormat.includes("S")) {
          value = this.formatUtil.setMilliseconds(value, 0);
        }
      }

      this._initvalue = value;
      this._inputvalue = this.getInitialInputValue(value);
      this._value = value;
    }
  }

  /**
   * Get initial user input value
   */
  getInitialInputValue(value?: string) {
    if (!value) {
      return "";
    }

    let initValue = value;
    if (this.type === "time" && value.length === 5) {
      initValue = `${value}:00`;
    }

    return this.formatUtil.toFormat(initValue, this.inputFormat);
  }

  /**
   * Set type to date
   */
  get type() {
    return this.contributions.type || "date";
  }

  /**
   * Returns the value as entered by the user. This can differ from the internal iso value that is stored
   * @return {string} value
   */
  getInputValue() {
    return this._inputvalue ? this._inputvalue.toString() : "";
  }

  /**
   * Get input value
   */
  get inputvalue() {
    return this.getInputValue();
  }

  /**
   * Sets the input value to the value entered by the user
   * @param {string} value - value as entered by the user
   */
  set inputvalue(value: string) {
    this.validate(value);

    this._inputvalue = value;

    this.value =
      value && value !== null && value !== ""
        ? this.formatUtil.toISO(value, this.inputFormat)
        : null;
  }

  /**
   * Get date format
   */
  get format() {
    const format = get(this.contributions, "format", "");
    return this.formatUtil.convertFormat(format);
  }

  get operator() {
    return this.contributions.operator;
  }

  get hasDate() {
    return (
      this.type === "date" ||
      this.type === "datetime" ||
      this.type === "timestamp"
    );
  }

  get hasTime() {
    return (
      this.type === "time" ||
      this.type === "datetime" ||
      this.type === "timestamp"
    );
  }

  get formatLabel() {
    return this.format.toLowerCase();
  }

  get inputFormat() {
    if (this.hasDate && this.hasTime) {
      return `${this.dateInputFormat} ${this.timeInputFormat}`;
    }

    if (this.hasDate) {
      return this.dateInputFormat;
    }

    if (this.hasTime) {
      return this.timeInputFormat;
    }

    return "";
  }

  get dateInputFormat() {
    if (!this.hasDate) {
      return "";
    }

    // setting for date input
    const DATE_INPUT_FORMAT_SETTING = getSetting("DATE_INPUT_FORMAT", "");

    if (DATE_INPUT_FORMAT_SETTING !== "") {
      return DATE_INPUT_FORMAT_SETTING;
    }

    return this.format;
  }

  get dateReadonlyFormat() {
    if (!this.hasDate) {
      return "";
    }

    let format = this.format;

    let dateFormat = this.hasTime
      ? format.replace(this.timeInputFormat, "").trim()
      : format;

    const readonlyFormatSetting = getSetting("DATE_READONLY_FORMAT", "");

    if (dateFormat === PRODUCT_DEFAULT_DATE_FORMAT && readonlyFormatSetting) {
      dateFormat = readonlyFormatSetting;
    }

    return dateFormat;
  }

  get timeInputFormat() {
    if (!this.hasTime) {
      return "";
    }

    const format = this.format;

    let timeFormatParts = [];
    if (format.includes("H")) {
      timeFormatParts.push("HH");
    } else if (format.includes("h")) {
      timeFormatParts.push("hh");
    }
    if (format.includes("m")) {
      timeFormatParts.push("mm");
    }
    if (format.includes("s")) {
      timeFormatParts.push("ss");
    }

    let timeFormat = timeFormatParts.join(":");
    if (format.includes("S")) {
      timeFormat = `${timeFormat}.SSS`;
    }
    if (format.includes("a")) {
      return `${timeFormat} a`;
    }
    return timeFormat;
  }

  get timeReadonlyFormat() {
    if (!this.hasTime) {
      return "";
    }

    return this.timeInputFormat;
  }

  get dateInputValue() {
    return isString(this.value) && this.dateInputFormat !== ""
      ? this.formatUtil.toFormat(this.value, this.dateInputFormat)
      : "";
  }

  get timeInputValue() {
    return isString(this.value) && this.timeInputFormat !== ""
      ? this.formatUtil.toFormat(this.value, this.timeInputFormat)
      : "";
  }

  // format value in readonly rendering
  formatValue(value: ?string) {
    if (isNil(value) || value.toString() === "") {
      return "";
    }

    // when the value is exactly an iso date, render as date
    if (
      (this.type === "datetime" || this.type === "timestamp") &&
      DateUtil.hasFormat(value, ISO_DATE_FORMAT)
    ) {
      return DateUtil.toFormat(value, this.dateReadonlyFormat);
    }

    if (this.hasDate && this.hasTime) {
      const dateTimeReadonlyFormat = `${this.dateReadonlyFormat} ${this.timeReadonlyFormat}`;
      return this.formatUtil.toFormat(value, dateTimeReadonlyFormat);
    }

    if (this.type === "date") {
      return this.formatUtil.toFormat(value, this.dateReadonlyFormat);
    }

    return this.formatUtil.toFormat(value, this.format);
  }

  /**
   * Retrieve readonly value, the date in the configurated format
   */
  get readonlyvalue() {
    if (isString(this.value) && this.value !== null) {
      return this.formatValue(this.value.toString());
    }

    return "";
  }

  /**
   * Get minimum date
   */
  get mindate() {
    return get(this.contributions, "mindate", null);
  }

  /**
   * Get maximum date
   */
  get maxdate() {
    return get(this.contributions, "maxdate", null);
  }

  /**
   * Registers an error that was received from a server response
   */
  addServerError(error: FormErrorAnchor) {
    const { id, message, properties } = error;
    if (has(properties, "format") && this.formatLabel) {
      properties.format = this.formatLabel;
    }

    this._errorCollection.addServerError(id, message, properties);
  }

  getFormatConstraint() {
    switch (this.type) {
      case "date":
        return new DateTimeDateFormatConstraint(this.dateInputFormat);
      case "time":
        return new DateTimeTimeFormatConstraint(this.timeInputFormat);
      default:
        return new DatetimeFormatConstraint(this.type, this.inputFormat);
    }
  }

  /**
   * Add Date constraints for attribute
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    constraints.add(this.getFormatConstraint());

    if (this.mindate || this.maxdate) {
      constraints.add(
        new DateBoundaryConstraint(
          this.type,
          this.mindate,
          this.maxdate,
          this.inputFormat
        )
      );
    }

    return constraints;
  }
}

export default DatetimeAttributeModel;

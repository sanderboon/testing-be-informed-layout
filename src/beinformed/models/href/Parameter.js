// @flow
import { isNil, includes } from "lodash";
import {
  PARAMETER_SEPARATOR,
  UI_PARAMETERS,
} from "beinformed/constants/Constants";

/**
 * Querystring parameter
 */
class Parameter {
  _prefix: ?string;
  _name: string;
  _value: ?string;
  _isModUIParameter: boolean;

  constructor(prefix: ?string, name: string, value: ?string) {
    this._prefix = prefix;
    this._name = name;
    this._value = value;
    this._isModUIParameter = !UI_PARAMETERS.includes(name);
  }

  /**
   * Getting prefix
   */
  get prefix(): ?string {
    return this._prefix;
  }

  /**
   * Getting name
   */
  get name(): string {
    return this._name;
  }

  /**
   * Getting value
   */
  get value(): ?string {
    return this._value;
  }

  /**
   * Create parameter from string input
   */
  static fromString(parameter: string) {
    if (isNil(parameter) || parameter === "" || !includes(parameter, "=")) {
      return null;
    }

    // parameter has the structure prefix~name=value
    const namePart = parameter.substr(0, parameter.indexOf("="));
    const value = parameter.substr(parameter.indexOf("=") + 1);

    let prefix = void 0;
    let name = namePart;
    if (namePart.includes(PARAMETER_SEPARATOR)) {
      prefix = namePart.substr(0, namePart.indexOf("~"));
      name = namePart.substr(namePart.indexOf("~") + 1);
    }

    if (name === "") {
      return null;
    }

    return new Parameter(prefix, name, decodeURIComponent(value));
  }

  /**
   * Convert parameter to string
   */
  toString(withPrefix: boolean = true) {
    if (!this.name) {
      return "";
    }

    const value = isNil(this.value) ? "" : this.value;

    return withPrefix && this.prefix
      ? `${this.prefix}${PARAMETER_SEPARATOR}${this.name}=${value}`
      : `${this.name}=${value}`;
  }

  toQuerystring(withPrefix: boolean = true) {
    if (!this.name) {
      return "";
    }

    const value = isNil(this.value) ? "" : encodeURIComponent(this.value);

    return withPrefix && this.prefix
      ? `${this.prefix}${PARAMETER_SEPARATOR}${this.name}=${value}`
      : `${this.name}=${value}`;
  }

  /**
   * Indicates if parameter can be send to the Be Informed modular UI
   */
  get isModUIParameter(): boolean {
    return this._isModUIParameter;
  }
}

export default Parameter;

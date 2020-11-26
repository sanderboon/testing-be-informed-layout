// @flow
import { has, isNil, isUndefined, isObject, isString } from "lodash";

import {
  APPLICATION_PATH,
  BASE,
  CONTENT_PATH,
  HTTP_METHODS,
} from "beinformed/constants/Constants";

import Parameter from "beinformed/models/href/Parameter";
import { IllegalArgumentException } from "beinformed/exceptions";

import type { HttpMethods } from "beinformed/constants";
type HrefObject = {
  _path: string,
  _hash: string,
  _parameters: Array<{
    _name: string,
    _value: string,
    _prefix: string,
  }>,
  _resourcetype: string,
  _method: HttpMethods,
  _state: any,
};
type LocationObject = {
  pathname: string,
  search: string,
  hash: string,
  state: any,
};
export type HrefInput = Href | HrefObject | LocationObject | string;

/**
 * Defines a Href with the parameters
 */
class Href {
  _path: string;
  _hash: string;
  _parameters: Array<Parameter>;
  _resourcetype: string;
  _method: HttpMethods;
  _state: any;

  /**
   * Create a Href
   */
  constructor(href?: HrefInput, resourcetype?: string) {
    this.path = "";
    this.parameters = [];
    this.hash = "";
    this.state = null;
    this.method = HTTP_METHODS.GET;
    this.resourcetype = resourcetype || "";

    if (href instanceof Href) {
      this.setFromHref(href);
    } else if (!isNil(href) && isObject(href) && has(href, "_path")) {
      this.setFromObject(href);
    } else if (
      !isNil(href) &&
      isObject(href) &&
      has(href, "pathname") &&
      !has(href, "_path")
    ) {
      this.setFromLocation(href);
    } else if (isString(href)) {
      this.setFromString(href);
    }

    if (this.path.startsWith(APPLICATION_PATH)) {
      this.path = this.path.substring(APPLICATION_PATH.length);
    }
  }

  /**
   * Set parameters from Href model input
   */
  setFromHref(href: Href) {
    this.path = href.path;
    this.parameters = href.parameters;
    this.hash = href.hash;
    this.state = href.state;
  }

  /**
   * Set parameters from object input
   */
  setFromObject(href: HrefObject) {
    this.path = href._path;
    if (Array.isArray(href._parameters)) {
      href._parameters.map((param) =>
        this.addParameter(param._name, param._value, param._prefix)
      );
    }
    this.hash = href._hash;
    this.state = href._state;
  }

  setFromLocation(href: LocationObject) {
    this.path = href.pathname;
    this.addParametersFromString(href.search);
    this.hash = Href.getHashFromString(href.hash);
    this.state = href.state || null;
  }

  /**
   * Set parameters from string input
   */
  setFromString(href: string) {
    this.path = Href.getPathFromString(href);
    this.addParametersFromString(href);
    this.hash = Href.getHashFromString(href);
  }

  get isChangePassword(): boolean {
    return this._path.includes("/change-password");
  }

  static checkAbsoluteUrl(href: string) {
    const checkAbsolute = new RegExp("^(?:[a-z]+:)?//", "i");
    return checkAbsolute.test(href);
  }

  // Check if url is relative (not checking for absolute urls with same domain)
  get isExternal(): boolean {
    const isCamelRoute =
      this.path.startsWith("/restServices") &&
      !this.path.startsWith("/restServices/ui");

    return Href.checkAbsoluteUrl(this.path) || isCamelRoute;
  }

  /**
   * Retrieve the relative path part of a href string, e.g. https://www.beinformed.com/BeInformed/tab/view?q=url => /tab/view
   */
  static getPathFromString(href: string) {
    const decodedHref = decodeURI(href);

    const hrefNoHash = decodedHref.includes("#")
      ? decodedHref.substr(0, decodedHref.indexOf("#"))
      : decodedHref;

    const isAbsolute = Href.checkAbsoluteUrl(hrefNoHash);

    const temphref =
      isAbsolute || !hrefNoHash.startsWith(`${BASE}/`)
        ? hrefNoHash
        : hrefNoHash.substr(hrefNoHash.indexOf(`${BASE}/`) + BASE.length);

    return temphref.includes("?") ? temphref.split("?")[0] : temphref;
  }

  /**
   * Retrieve hash of href string
   * @param {string} href - A complete url
   * @return {string} the hash of an url or an empty string
   */
  static getHashFromString(href: string = "") {
    return href.includes("#") ? href.substr(href.indexOf("#") + 1) : "";
  }

  /**
   * Add a parameter for each parameter found in the querystring of an URL string, e.g. https://www.beinformed.com?q=url => q=url
   */
  addParametersFromString(href: string) {
    if (href.includes("?")) {
      href
        .split("?")[1]
        .split("&")
        .forEach((param) => {
          const paramFromString = Parameter.fromString(param);
          if (paramFromString) {
            this.setParameter(
              paramFromString.name,
              paramFromString.value,
              paramFromString.prefix
            );
          }
        });
    }

    return this;
  }

  /**
   * Add a querystring parameter to the parameter collection of this Href, skips parameters that have a value of null
   */
  addParameter(name: string, value?: string, prefix?: ?string) {
    if (value !== null) {
      this.removeParameter(name, prefix);
      this._parameters.push(new Parameter(prefix, name, value));
    }

    return this;
  }

  /**
   * Adds or overwrites a parameter when it exists and value is not null.
   * Removes the parameter when the value is null
   */
  setParameter(name: string, value?: ?string, prefix?: ?string) {
    if (value === null) {
      this.removeParameter(name, prefix);
    } else {
      this.addParameter(name, value, prefix);
    }

    return this;
  }

  /**
   * Retrieve a parameter by it's name and (optionally) prefix
   */
  getParameter(name: string, prefix?: ?string) {
    return this._parameters.find(
      (param) => param.prefix === prefix && param.name === name
    );
  }

  hasParameter(name: string, prefix?: string) {
    return !isUndefined(this.getParameter(name, prefix));
  }

  /**
   * Get request method
   */
  get method(): HttpMethods {
    return this._method;
  }

  /**
   * Set request method
   */
  set method(method: HttpMethods) {
    this._method = method || HTTP_METHODS.GET;
  }

  /**
   * Retrieve all paremters
   */
  get parameters(): Array<Parameter> {
    return this._parameters;
  }

  /**
   * Replace parameters of Href
   */
  set parameters(parameters: Array<Parameter>) {
    this._parameters = parameters;
  }

  /**
   * Remove a parameter from the parameter collection
   */
  removeParameter(name: string, prefix?: ?string) {
    this._parameters = this._parameters.filter(
      (param) => param.prefix !== prefix || param.name !== name
    );

    return this;
  }

  /**
   * Get the parameters as a querystring, e.g. param1=value1&param2=value2, optionally with prefix
   */
  getQuerystring(withPrefix: boolean = false): string {
    return this.parameters
      .filter((param) => !isNil(param.value))
      .map((param) => param.toQuerystring(withPrefix))
      .join("&");
  }

  /**
   * Retrieve a querystring that only contains parameter that can be send to the modular ui, parameters are filtered by prefix
   */
  getQuerystringForModularUI(prefix: string = ""): string {
    return this.parameters
      .filter(
        (param) =>
          param.isModUIParameter &&
          (!prefix || !param.prefix || param.prefix === prefix) &&
          !isNil(param.value)
      )
      .map((param) => param.toQuerystring(false))
      .join("&");
  }

  /**
   * Retrieve all parameters from the parameter collection in a querystring style name1=value1&name2=value2, without the prefix
   */
  get querystring(): string {
    return this.getQuerystring(false);
  }

  /**
   * Set the path of the Href, the part before the querystring question mark
   */
  set path(path: string) {
    this._path = path;
  }

  /**
   * Retrieve the path
   */
  get path(): string {
    return this._path || "";
  }

  /**
   * Set hash
   */
  set hash(hash: string) {
    this._hash = hash;
  }

  /**
   * Retrieve hash
   */
  get hash(): string {
    return this._hash;
  }

  set state(state: Object | null) {
    this._state = state;
  }

  get state(): Object | null {
    return this._state;
  }

  setState(state: any) {
    this.state = state;

    return this;
  }

  /**
   * Set resourctype
   */
  set resourcetype(resourcetype: string) {
    this._resourcetype = resourcetype;
  }

  /**
   * Retrieve resourceType
   */
  get resourcetype(): string {
    return this._resourcetype;
  }

  /**
   * Retrieve the path combined with the BASE of the application, e.g. /BeInformed
   */
  get absolutepath(): string {
    if (this.isExternal) {
      return this.path;
    }

    return BASE + this.path;
  }

  /**
   * Retrieves the combination of the path and the querystring
   */
  get href(): string {
    return this.querystring.length > 0
      ? [this.path, this.querystring].join("?")
      : this.path;
  }

  /**
   * Getting the URL including the base path
   */
  get absolutehref(): string {
    const querystring = this.getQuerystring(true);

    return querystring.length > 0
      ? [this.absolutepath, querystring].join("?")
      : this.absolutepath;
  }

  /**
   * Checks if the URL starts within the given href
   */
  startsWith(href: Href): boolean {
    const thisPath = `${this.path}/`;
    const otherPath = `${href.path}/`;

    return thisPath.startsWith(otherPath);
  }

  /**
   * Checks if the given Href equals this Href
   */
  equals(href?: Href | string): boolean {
    if (href instanceof Href) {
      return this.path === href.path;
    }

    return this.path === href;
  }

  equalsWithParameters(href: Href): boolean {
    if (!this.equals(href)) {
      return false;
    }

    if (href instanceof Href) {
      if (this.parameters.length !== href.parameters.length) {
        return false;
      }

      if (this.parameters.length === 0 && href.parameters.length === 0) {
        return true;
      }

      const thisParams = this.parameters.map((param) => param.toString());

      return href.parameters.every((param) =>
        thisParams.includes(param.toString())
      );
    }

    throw new IllegalArgumentException(`${href} is not an instance of Href`);
  }

  /**
   * Indicates if the link is a content link
   */
  get isContent(): boolean {
    return this.absolutepath.startsWith(CONTENT_PATH);
  }

  /**
   * Returns a complete url from the Href
   */
  toString() {
    return this.href;
  }

  toLocation() {
    return {
      pathname: this.path,
      search: this.querystring.length > 0 ? `?${this.querystring}` : "",
      hash: this.hash.length > 0 ? `#${this.hash}` : "",
      state: this.state,
    };
  }
}

export default Href;

// @flow
import deepmerge from "deepmerge";
import { has, isNil, isPlainObject, isString } from "lodash";

import {
  IllegalArgumentException,
  UnauthorizedException,
  FetchException,
  TimeoutException,
  NotFoundException,
  JsonParseException,
  NetworkException,
} from "beinformed/exceptions";

import Cache from "beinformed/utils/browser/Cache";

import { HTTP_METHODS } from "beinformed/constants/Constants";

const NETWORK_ERROR_CODE = 0;
const SUCCESS_CODE = 200;
const CLIENT_ERROR_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const REDIRECTION_CODE = 300;
const NOT_FOUND_CODE = 404;

class XHR {
  _options: Object;
  _xmlhttp: XMLHttpRequest;
  _attempts: number;

  constructor(options: Object) {
    this._options = this.setOptions(options);
    this._attempts = 0;
  }

  get xmlhttp() {
    return this._xmlhttp;
  }

  set xmlhttp(xmlhttp: XMLHttpRequest) {
    this._xmlhttp = xmlhttp;
  }

  get options() {
    return this._options;
  }

  get attempts() {
    return this._attempts;
  }

  set attempts(attempts: number) {
    this._attempts = attempts;
  }

  setOptions(options: Object) {
    return deepmerge(
      {
        method: HTTP_METHODS.GET,
        params: "",
        data: null,
        timeout: 300000,
        responseType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          // needed for csrf, see: https://plaza.beinformed.com/amdoc/user-interface/modular-ui/modular-ui-security
          "X-Requested-With": "XMLHttpRequest",
        },
        events: {},
      },
      options,
      {
        isMergeableObject: isPlainObject,
      }
    );
  }

  timeoutHandler(reject) {
    return reject(new TimeoutException(this.options.url, this.options.method));
  }

  errorHandler(reject, responseJSON = null) {
    const { status } = this.xmlhttp;
    const { url, method, isReload } = this.options;

    if (status === NETWORK_ERROR_CODE) {
      return reject(new NetworkException(url, method));
    }

    if (status === NOT_FOUND_CODE) {
      return reject(new NotFoundException(url, method, isReload));
    }

    if (status === UNAUTHORIZED_CODE) {
      return reject(new UnauthorizedException(url, method, responseJSON));
    }

    return reject(new FetchException(responseJSON, this.xmlhttp, this.options));
  }

  getResponse() {
    const { responseType, response } = this.xmlhttp;

    if (
      (responseType === "" || responseType === "text") &&
      this.getResponseHeader("Content-Type") === "application/json"
    ) {
      if (isPlainObject(response)) {
        return response;
      }

      try {
        return JSON.parse(response);
      } catch (error) {
        throw new JsonParseException(error);
      }
    }

    return response;
  }

  responseHandler(resolve, reject) {
    const { status } = this.xmlhttp;

    let response = null;
    try {
      response = this.getResponse();
    } catch (error) {
      return reject(error);
    }

    if (
      (status >= SUCCESS_CODE && status < REDIRECTION_CODE) ||
      (status === CLIENT_ERROR_CODE && has(response, "formresponse"))
    ) {
      return resolve(response);
    }

    return this.errorHandler(reject, response);
  }

  setEventListeners(resolve, reject) {
    if (has(this.options, "onProgress")) {
      ["loadstart", "progress", "load", "loadend"].forEach((eventType) => {
        this.xmlhttp.addEventListener(eventType, this.options.onProgress);
      });
    }

    ["abort", "error"].forEach((eventType) => {
      this.xmlhttp.addEventListener(eventType, () => this.errorHandler(reject));
    });

    this.xmlhttp.addEventListener("timeout", () => this.timeoutHandler(reject));

    this.xmlhttp.addEventListener("load", () =>
      this.responseHandler(resolve, reject)
    );

    // Set custom events
    Object.keys(this.options.events).forEach((eventName) => {
      this.xmlhttp.addEventListener(eventName, this.options.events[eventName]);
    });
  }

  /**
   * Create and fix url when params or both querystring and params exist.
   */
  getUrl() {
    const { params, url } = this.options;

    if (params !== "") {
      if (url.includes("?")) {
        const aUrl = url.split("?");

        return `${aUrl[0]}?${aUrl[1]}&${params}`;
      }

      return `${url}?${params}`;
    }

    return url;
  }

  openConnection() {
    this.xmlhttp.open(this.options.method, this.getUrl(), true);
  }

  setBasicAuthentication() {
    if (Cache.hasItem("basic")) {
      this.xmlhttp.withCredentials = true;
      const basicToken = Cache.getItem("basic");

      if (isString(basicToken)) {
        this.xmlhttp.setRequestHeader("Authorization", `Basic ${basicToken}`);
      }
    }
  }

  getResponseHeader(headerName) {
    return this.xmlhttp.getResponseHeader(headerName);
  }

  setCustomHeaders() {
    const { headers } = this.options;

    Object.keys(headers).forEach((headerName) => {
      this.xmlhttp.setRequestHeader(headerName, headers[headerName]);
    });
  }

  setOtherOptions() {
    this.xmlhttp.responseType = this.options.responseType;
    this.xmlhttp.timeout = this.options.timeout;
  }

  sendData() {
    const { data } = this.options;

    if (isNil(data)) {
      this.xmlhttp.send();
    } else {
      const stringData = isPlainObject(data) ? JSON.stringify(data) : data;
      this.xmlhttp.send(stringData);
    }
  }

  setXMLHttpRequest() {
    return new Promise((resolve, reject) => {
      this.xmlhttp = new XMLHttpRequest();

      this.setEventListeners(resolve, reject);

      this.openConnection();

      this.setBasicAuthentication();

      this.setCustomHeaders();

      this.setOtherOptions();

      this.sendData();
    });
  }

  async fetch() {
    try {
      return await this.setXMLHttpRequest();
    } catch (err) {
      if (err instanceof NetworkException && this.attempts < 2) {
        this.attempts += 1;
        return this.fetch();
      }

      throw err;
    }
  }
}

const validateInputArguments = (args) => {
  if (!isPlainObject(args)) {
    throw new IllegalArgumentException(
      `Expecting an object as argument for xhr, but received: ${args}`
    );
  } else if (!has(args, "url")) {
    throw new IllegalArgumentException(
      `No url property found in argumens of xhr, received: ${JSON.stringify(
        args
      )}`
    );
  }

  return true;
};

const xhr = (args: Object): Promise<Object> => {
  validateInputArguments(args);

  return new XHR(args).fetch();
};

export default xhr;

// @flow
import { has } from "lodash";

import type { Parameter } from "beinformed/models";

type InputObject = {
  key: string,
  data?: Object,
  contributions?: Object,
};

class ModularUIResponse {
  _key: string;
  _data: Object;
  _contributions: Object;
  _locale: string;
  _parameters: Array<Parameter>;

  constructor() {
    this._data = {};
    this._contributions = {};
    this._key = "unknown";
    this._locale = "en";
    this._parameters = [];
  }

  static create(input: InputObject) {
    const response = new ModularUIResponse();

    if (has(input, "data") && has(input, "contributions")) {
      const [dataKey] = Object.keys(input.data);
      const [contributionsKey] = Object.keys(input.contributions);

      response.key = input.key || contributionsKey;
      response.data = input.data[dataKey];
      response.contributions = input.contributions[contributionsKey];
    }

    return response;
  }

  set locale(locale: string) {
    this._locale = locale;
  }

  get locale(): string {
    return this._locale;
  }

  set key(key: string) {
    this._key = key;
  }

  get key(): string {
    return this._key;
  }

  set data(data: Object) {
    this._data = data;
  }

  get data(): Object {
    return this._data;
  }

  set contributions(contributions: Object) {
    this._contributions = contributions;
  }

  get contributions(): Object {
    return this._contributions;
  }

  set parameters(parameters: Array<Parameter>) {
    this._parameters = parameters;
  }

  get parameters(): Array<Parameter> {
    return this._parameters;
  }

  static rehydrate(data: Object) {
    const modelData = new ModularUIResponse();

    modelData.locale = data.locale;
    modelData.key = data.key;
    modelData.data = data.data;
    modelData.contributions = data.contributions;

    return modelData;
  }
}

export default ModularUIResponse;

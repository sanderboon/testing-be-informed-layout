// @flow
// import clone from "clone";
import { get, clone, cloneDeep } from "lodash";

import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

type BaseDehydrateData = {
  +data: Object,
  +contributions: Object,
  connectKey: string,
};

/**
 * Base model
 */
class BaseModel {
  _data: Object;
  _contributions: Object;
  _layouthint: LayoutHintCollection;
  _connectKey: string;

  /**
   * constructor
   */
  constructor(data: Object, contributions: Object) {
    this._data = data;
    this._contributions = contributions;
    this._layouthint = new LayoutHintCollection(
      get(this.contributions, "layouthint", [])
    );
  }

  /**
   * Retrieve data
   */
  get data(): Object {
    return this._data || {};
  }

  /**
   * Retrieve contributions
   */
  get contributions(): Object {
    return this._contributions || {};
  }

  /**
   * Getting the layouthint
   */
  get layouthint(): LayoutHintCollection {
    return this._layouthint;
  }

  /**
   * Set the layouthint
   */
  set layouthint(layouthint: Array<string>) {
    this._layouthint = new LayoutHintCollection(layouthint);
  }

  /**
   * Indicates if the model has data
   */
  get hasData(): boolean {
    return Object.keys(this.data).length > 0;
  }

  set connectKey(key: string) {
    this._connectKey = key;
  }

  get connectKey(): string {
    return this._connectKey;
  }

  dehydrate(): BaseDehydrateData {
    return {
      data: this._data,
      contributions: this._contributions,
      connectKey: this._connectKey,
    };
  }

  rehydrate(data: Object) {
    this._connectKey = data.connectKey;
  }

  /**
   * Returns a clone of the model (this is not a deep copy)
   */
  clone(deepcopy: boolean = false): this {
    // deepcopy can be expensive, use with care!
    if (deepcopy) {
      return cloneDeep(this);
    }

    return clone(this);
  }
}

export default BaseModel;

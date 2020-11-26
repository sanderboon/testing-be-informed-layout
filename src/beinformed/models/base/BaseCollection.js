// @flow
import { clone, cloneDeep } from "lodash";

/**
 * Base class for collections of models
 */
class BaseCollection<T> {
  _collection: Array<T>;

  /**
   * Construct base collection
   */
  constructor(initCollection: Array<T> = []) {
    this._collection = initCollection;
  }

  /**
   * Add an other collection, array of items or single item to this collection;
   */
  add(items: BaseCollection<T> | Array<T> | T) {
    if (items instanceof BaseCollection) {
      this._collection = [...this._collection, ...items.all];
    } else if (Array.isArray(items)) {
      this._collection = [...this._collection, ...items];
    } else {
      this._collection = [...this._collection, items];
    }

    return this;
  }

  /**
   * Remove an item from the collection by it's index.
   */
  removeByIndex(itemIndex: number) {
    if (itemIndex > -1) {
      this._collection = [
        ...this._collection.slice(0, itemIndex),
        ...this._collection.slice(itemIndex + 1),
      ];
    }
  }

  /**
   * Replace current collection with a new collection
   */
  set collection(collection: Array<T>) {
    this._collection = collection;
  }

  /**
   * Retrieve current collection
   */
  get collection(): Array<T> {
    return this._collection;
  }

  /**
   * Indicates if the collection has items
   */
  get hasItems(): boolean {
    return this.length > 0;
  }

  /**
   * Indicates if collection is empty
   */
  get isEmpty(): boolean {
    return !this.hasItems;
  }

  /**
   * Retrieve all items in collection
   */
  get all(): Array<T> {
    return this._collection;
  }

  /**
   * Get the size of this collection
   */
  get size(): number {
    return this.length;
  }

  /**
   * Get the size of this collection
   */
  get length(): number {
    return this._collection.length;
  }

  /**
   * Return first link in collection
   */
  get first(): ?T {
    return this.hasItems ? this._collection[0] : null;
  }

  get last(): ?T {
    return this._collection[this._collection.length - 1];
  }

  get(index: number): ?T {
    return this._collection[index];
  }

  /**
   * Find item
   */
  find(
    callbackfn: (value: T, index: number, array: Array<T>) => any,
    thisArg?: any
  ) {
    return this._collection.find(callbackfn, thisArg) || null;
  }

  /**
   * Filter items
   */
  filter(
    callbackfn: (value: T, index: number, array: Array<T>) => any,
    thisArg?: any
  ) {
    return this._collection.filter(callbackfn, thisArg);
  }

  /**
   * Check if at least one item occurs
   */
  some(
    callbackfn: (value: T, index: number, array: Array<T>) => any,
    thisArg?: any
  ) {
    return this._collection.some(callbackfn, thisArg) || false;
  }

  every(
    callbackfn: (value: T, index: number, array: Array<T>) => any,
    thisArg?: any
  ) {
    return this._collection.every(callbackfn, thisArg);
  }

  map<U>(
    callbackfn: (value: T, index: number, array: Array<T>) => U,
    thisArg?: any
  ) {
    return this._collection.map(callbackfn, thisArg);
  }

  forEach(
    callbackfn: (value: T, index: number, array: Array<T>) => any,
    thisArg?: any
  ) {
    return this._collection.forEach(callbackfn, thisArg);
  }

  sort(compareFn?: (a: T, b: T) => number) {
    return this._collection.sort(compareFn);
  }

  /**
   * Retrieve an alphabetically sorted array of items
   */
  get sorted(): Array<T> {
    return this._collection.sort();
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

export default BaseCollection;

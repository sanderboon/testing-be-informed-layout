// @flow
import { isFunction, isString } from "lodash";
import BaseCollection from "beinformed/models/base/BaseCollection";

/**
 * Collection of layouthint
 */
export default class LayoutHintCollection extends BaseCollection<string> {
  /**
   * Constructs the layouthint collection
   */
  constructor(layouthint: Array<string> = []) {
    super();

    if (!Array.isArray(layouthint)) {
      throw new TypeError(`${layouthint} is not an Array`);
    }

    this.collection = layouthint;
  }

  /**
   * Retrieve layout hints
   * @return {String[]}
   */
  get layouthint(): Array<string> {
    return this.collection;
  }

  /**
   * Checks if a specific layouthint exists
   */
  has(...hints: Array<string>) {
    const hintArray = hints.length > 0 ? [...hints] : [];

    return hintArray.some(
      (hint) =>
        this.layouthint.includes(hint) ||
        this.layouthint.some((hint2) => hint2.startsWith(hint))
    );
  }

  /**
   * Retrieve the first layouthint starting with hint
   */
  getByLayoutHint(hint: Function | string) {
    let foundHint = null;

    if (isFunction(hint)) {
      foundHint = this.layouthint.find(hint);
    }

    if (isString(hint)) {
      foundHint = this.layouthint.find((hint2) =>
        hint2.startsWith(hint.toString())
      );
    }

    return foundHint || null;
  }

  /**
   * Get the value of a specific hint
   * Format: hint=value
   */
  getLayoutHintValue(hint: string): ?string {
    const checkHint = hint.endsWith(":")
      ? hint.substr(0, hint.length - 1)
      : hint;

    const match = this.getByLayoutHint(
      (hint2) =>
        hint2.startsWith(`${checkHint}=`) || hint2.startsWith(`${checkHint}:`)
    );

    if (!match) {
      return null;
    }

    return match.substr(checkHint.length + 1);
  }

  /**
   * Get an array of multiple values from a specific hint
   * Format: hint=value1;value2;value3
   */
  getLayoutHintValues(hint: string): Array<string> | null {
    if (!this.has(hint)) {
      return null;
    }

    const value = this.getLayoutHintValue(hint);

    if (!value) {
      return [];
    }

    return value.split(";");
  }
}

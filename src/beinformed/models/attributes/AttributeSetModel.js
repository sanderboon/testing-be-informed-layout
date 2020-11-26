// @flow
import BaseModel from "beinformed/models/base/BaseModel";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import { has } from "lodash";

export default class AttributeSetModel extends BaseModel {
  _key: string;
  _attributeCollection: AttributeCollection;

  constructor(key: string = "", data: Object = {}, contributions: Object = {}) {
    super(data, contributions);

    const attributeContributions = this.contributions.attributes
      ? this.contributions.attributes.filter((contribution) => {
          const [key] = Object.keys(contribution);
          return has(this.data, key);
        })
      : [];

    this._attributeCollection = new AttributeCollection(
      this.data,
      attributeContributions,
      true
    );

    this._key = key;
  }

  get key() {
    return this._key;
  }

  set key(key: string) {
    this._key = key;
  }

  get label() {
    return this.contributions.label;
  }

  /**
   * Retrieve attribute collection
   */
  get attributeCollection() {
    return this._attributeCollection;
  }

  /**
   * Set the attributes with a new AttributeCollection
   */
  set attributeCollection(collection: AttributeCollection) {
    this._attributeCollection = collection;
  }
}

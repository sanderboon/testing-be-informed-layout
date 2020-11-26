// @flow
import {
  has,
  pick,
  isPlainObject,
  isArray,
  cloneDeep,
  isUndefined,
} from "lodash";

/**
 * This util helps to normalize various attribute data formats available in the modular ui.
 * It fixes differences in choice attributes with dynamic schema's, links on download attributes, composites with various children, etc
 */
class AttributeDataHelper {
  _key: string;
  _attribute: Object;
  _value: any;
  _children: Array<AttributeDataHelper>;

  constructor(
    data: Object | Array<Object>,
    key: string,
    childrenKeys: Array<Object>
  ) {
    this._key = key;

    if (Array.isArray(data)) {
      this._attribute =
        data.find(
          (attr) =>
            attr.elementid === key || attr.name === key || attr.param === key
        ) || {};
      this._value = this.getValue(this._attribute);
    } else {
      const attributeData = cloneDeep(data);
      attributeData._links = pick(data._links, [
        "concept",
        "download",
        "lookupOptions",
        "lookupList",
      ]);

      this._attribute = attributeData;

      this._value = isUndefined(data[key]) ? this.getValue(data) : data[key];
    }

    this._children = this.createChildren(data, childrenKeys);
  }

  childData(
    data: Object | Array<Object>,
    parentKey: string,
    childKey: string
  ): Object {
    if (isArray(data)) {
      if (isArray(this._attribute.elements)) {
        return this._attribute.elements.find(
          (element) => element.elementid === childKey
        );
      }
    } else if (has(data, parentKey) && isPlainObject(data[parentKey])) {
      return data[parentKey];
    } else if (has(data, childKey) && isPlainObject(data[childKey])) {
      return data[childKey];
    }

    if (isPlainObject(data)) {
      return data;
    }

    return {};
  }

  createChild(
    data: Object | Array<Object>,
    childData: Object,
    keyObject: Object
  ): AttributeDataHelper {
    const dynamicschema =
      isPlainObject(data) && !isArray(data) ? data.dynamicschema : void 0;

    return new AttributeDataHelper(
      {
        ...childData,
        dynamicschema,
        dynamicschemaId: keyObject.dynamicschemaId
          ? keyObject.dynamicschemaId
          : void 0,
      },
      keyObject.key,
      keyObject.children
    );
  }

  createChildren(
    data: Object | Array<Object>,
    childrenKeys: Array<Object> = []
  ): Array<AttributeDataHelper> {
    const childrenIsArray = Array.isArray(this.value);

    if (childrenIsArray) {
      return this.value.map((value) =>
        childrenKeys.map((keyObject) => {
          const childData = this.childData(value, this.key, keyObject.key);

          return this.createChild(data, childData, keyObject);
        })
      );
    }

    return childrenKeys.map((keyObject) => {
      const childData = this.childData(data, this.key, keyObject.key);

      return this.createChild(data, childData, keyObject);
    });
  }

  getValue(attribute: Object) {
    if ("values" in attribute) {
      return attribute.values;
    }

    if ("value" in attribute) {
      return attribute.value;
    }

    if ("suggestions" in attribute) {
      return attribute.suggestions;
    }

    if ("suggestion" in attribute) {
      return attribute.suggestion;
    }

    if (Array.isArray(attribute.options)) {
      return attribute.options
        .filter((option) => option.selected)
        .map((option) => option.code || option.key);
    }

    return null;
  }

  get key(): string {
    return this._key;
  }

  get value() {
    return this._value;
  }

  get static(): boolean {
    return this._attribute.static || false;
  }

  get links() {
    return this._attribute._links || void 0;
  }

  get dynamicschemaId(): string {
    return this._attribute.dynamicschemaId || this.key;
  }

  /*
    retrieve the dynamischema by the dynamischemaId
    mentioned in the contributions of the attribute
  */
  get dynamicschema() {
    const { dynamicschema } = this._attribute;
    if (!dynamicschema) {
      return void 0;
    }

    if (Array.isArray(dynamicschema)) {
      return dynamicschema;
    } else if (dynamicschema[this.dynamicschemaId]) {
      const attrDS = dynamicschema[this.dynamicschemaId];
      return attrDS.map((attr) => {
        if (attr.elements) {
          return {
            ...attr,
            elements: {
              ...attr.elements,
              dynamicschema,
            },
          };
        }

        return attr;
      });
    }

    return void 0;
  }

  get options() {
    return this._attribute.options || void 0;
  }

  get message() {
    return this._attribute.message || void 0;
  }

  get isResult(): boolean {
    return this._attribute.isResult || false;
  }

  get referenceDate() {
    return this._attribute.referenceDate || void 0;
  }

  get children() {
    return this._children || [];
  }

  getData(): Object {
    return {
      key: this.key,
      value: this.value,
      static: this.static,
      _links: this.links,
      dynamicschema: this.dynamicschema,
      dynamicschemaId: this.dynamicschemaId,
      options: this.options,
      message: this.message,
      isResult: this.isResult,
      referenceDate: this.referenceDate,
      children: this.children.map((child) =>
        Array.isArray(child)
          ? child.map((subChild) => subChild.getData())
          : child.getData()
      ),
    };
  }
}

export default AttributeDataHelper;

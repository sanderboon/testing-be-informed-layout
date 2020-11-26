// @flow
import { get } from "lodash";

import ResourceCollection from "beinformed/models/base/ResourceCollection";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

import createAttribute from "beinformed/models/attributes/_createAttribute";

import type { AttributeType } from "beinformed/models";

/**
 * Collection of choice attribute options
 */
class CompositeAttributeChildCollection extends ResourceCollection<AttributeType> {
  static create(data: Object, contributions: Object) {
    if (
      data &&
      contributions &&
      Array.isArray(contributions.children) &&
      Array.isArray(data.children)
    ) {
      // a composite with multiple data elements and one contributions element
      // multiple 'composites' are returned
      const isMultipleTableRows = Array.isArray(data.children[0]);
      if (isMultipleTableRows) {
        return CompositeAttributeChildCollection.createMultiData(
          data,
          contributions
        );
      }

      return CompositeAttributeChildCollection.createStandard(
        data,
        contributions
      );
    }

    return new CompositeAttributeChildCollection();
  }

  static createStandard(data: Object, contributions: Object) {
    const compositeChildCollection = new CompositeAttributeChildCollection();

    compositeChildCollection.collection = contributions.children
      .map((contribution) => {
        const [key] = Object.keys(contribution);

        const attributeData = Array.isArray(data.children)
          ? data.children.find((attr) => attr.key === key)
          : {};

        const attributeContribution = contribution[key];

        if (
          contributions.type.includes("range") &&
          !attributeContribution.type
        ) {
          attributeContribution.type = contributions.type.replace("range", "");
        }

        const attribute = createAttribute(
          key,
          {
            ...attributeData,
            dynamicschema: get(attributeData, "dynamicschema"),
          },
          {
            ...attributeContribution,
            readonly: attributeContribution.readonly || contributions.readonly,
          }
        );

        if (attribute) {
          attribute.parentKey = data.key;
        }

        return attribute;
      })
      .filter((attribute) => attribute !== null);

    return compositeChildCollection;
  }

  /*
   * Creates a composite for each child data element using the same contributions
   */
  static createMultiData(data: Object, contributions: Object) {
    const compositeChildCollection = new CompositeAttributeChildCollection();

    compositeChildCollection.collection = data.children.map((childData) =>
      CompositeAttributeChildCollection.create(
        {
          ...data,
          children: childData,
        },
        contributions
      )
    );

    return compositeChildCollection;
  }

  /**
   * Get input value of contributions
   */
  getInputValue() {
    return this.collection.map((child) => child.inputvalue).join(",");
  }

  /**
   * Validate input
   */
  validate() {
    return this.collection.every((child) => child.isValid);
  }

  /**
   * Retrieve error messages of this attribute
   */
  get errorCollection() {
    return new ErrorCollection("compositechildren");
  }

  hasServerErrors() {
    return (
      this.errorCollection.serverErrors.length > 0 ||
      this.collection.some((child) => child.hasServerErrors())
    );
  }

  hasErrors() {
    return (
      this.errorCollection.hasItems ||
      this.collection.some((child) => child.hasErrors())
    );
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.collection.forEach((child) => {
      child.reset();
    });
  }

  get initvalue() {
    if (this.first instanceof CompositeAttributeChildCollection) {
      return this.collection.map<Array<Object>>(
        (collection) => collection.initvalue
      );
    }

    const children = {};
    this.collection
      .filter((child) => child.initvalue !== null)
      .forEach((child) => {
        children[child.key] = child.initvalue;
      });

    if (Object.keys(children).length === 0) {
      return null;
    }

    return children;
  }

  get value(): any {
    if (this.first instanceof CompositeAttributeChildCollection) {
      return this.collection.map((collection) => collection.value);
    }

    const children = this.collection
      .filter((attribute) => attribute.formdata !== null && !attribute.readonly)
      .reduce(
        (formdata, attribute) => ({
          ...formdata,
          ...attribute.formdata,
        }),
        {}
      );

    if (Object.keys(children).length === 0) {
      return null;
    }

    return children;
  }

  get readonlyvalue() {
    if (this.first instanceof CompositeAttributeChildCollection) {
      return this.collection
        .map((collection) => collection.readonlyvalue)
        .join(" | ");
    }

    return this.collection
      .filter((child) => child.value !== null)
      .map((child) => child.readonlyvalue)
      .join(", ");
  }

  updateValidations(prefix: string, errors: Object) {
    this.collection.forEach((child) => {
      const attributeErrors = errors.filter(
        (error) =>
          get(error.anchor, "elementid", "") === `${prefix}${child.key}`
      );

      child.updateValidations(attributeErrors);
    });
  }

  hasValue() {
    return this.collection.some((child) => child.hasValue());
  }
}

export default CompositeAttributeChildCollection;

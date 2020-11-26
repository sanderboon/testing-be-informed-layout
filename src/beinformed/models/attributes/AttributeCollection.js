// @flow
import { get, has, isFunction } from "lodash";
import ResourceCollection from "beinformed/models/base/ResourceCollection";

import createAttribute from "beinformed/models/attributes/_createAttribute";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import BooleanAttributeModel from "beinformed/models/attributes/BooleanAttributeModel";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";
import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

import { ConfigurationException } from "beinformed/exceptions";

import { isVisibleAttribute } from "beinformed/models/attributes/attributeVisibilityUtil";

import {
  DEPENDENT_ATTRIBUTE_CONTROL,
  INITIAL_TOTAL_FILESIZE,
  MAX_TOTAL_FILESIZE,
} from "beinformed/constants/LayoutHints";

import type { AttributeType } from "beinformed/models";

class AttributeCollection extends ResourceCollection<AttributeType> {
  constructor(
    data?: Object | Array<Object> = {},
    contributions?: Array<Object> = [],
    isReadonly?: boolean = false
  ) {
    super();

    if (contributions) {
      contributions.forEach((contribution) => {
        const [key] = Object.keys(contribution);

        const attribute = createAttribute(key, data, contribution[key]);

        if (attribute !== null) {
          // when readonly is not explicitly set in the contributions, follow argument
          if (isReadonly && !has(contribution[key], "readonly")) {
            attribute.readonly = true;
          }

          this.collection.push(attribute);
        }
      });

      this.processLayoutHints();
    }
  }

  /**
   * Retrieve only visible attributes from the collection
   */
  get visible(): Array<AttributeType> {
    // Let flow know that this is a AttributeCollection
    if (this instanceof AttributeCollection) {
      return this.filter((attribute) => isVisibleAttribute(this, attribute));
    }

    return [];
  }

  get questions(): Array<AttributeType> {
    return this.visible.filter((attribute) => !attribute.isResult);
  }

  get results(): Array<AttributeType> {
    return this.visible.filter((attribute) => attribute.isResult);
  }

  /**
   * Replace attributes with a new array of attributes
   */
  set attributes(attributes: Array<AttributeType>) {
    this.collection = attributes;
  }

  getAttributeByAttribute(attribute: AttributeType): AttributeType {
    return this.find((attr) => {
      if (attr.equals(attribute)) {
        return true;
      } else if (
        attribute.children &&
        attribute.getChildByAttribute &&
        isFunction(attribute.getChildByAttribute)
      ) {
        return attribute.getChildByAttribute(attribute);
      }

      return false;
    });
  }

  /**
   * Get a single attribute by it's key
   */
  getAttributeByKey(key: string): AttributeType | null {
    return this.find((attribute) => {
      if (attribute.key === key) {
        return true;
      } else if (
        attribute.children &&
        attribute.getChildByKey &&
        isFunction(attribute.getChildByKey)
      ) {
        return attribute.getChildByKey(key);
      }

      return false;
    });
  }

  /**
   * Inidicates if attribute with key exists in collection
   */
  hasAttributeByKey(key: string): boolean {
    return this.getAttributeByKey(key) !== null;
  }

  /**
   * Getting the first attribute having the supplied layout hint
   */
  getAttributeByLayoutHint(...hints: Array<string>): AttributeType | null {
    return this.find((attribute) => attribute.layouthint.has(...hints)) || null;
  }

  /**
   * Getting a choice attribute by layouthint, returns null when not found or not a choice attribute
   */
  getChoiceAttributeByLayoutHint(
    layoutHint: string
  ): ChoiceAttributeModel | null {
    const attribute = this.getAttributeByLayoutHint(layoutHint);

    return attribute instanceof ChoiceAttributeModel ? attribute : null;
  }

  /**
   * Getting all attributes having the supplied layout hint
   */
  getAttributesByLayoutHint(...hints: Array<string>): Array<AttributeType> {
    return this.filter((attribute) => attribute.layouthint.has(...hints));
  }

  /**
   * Replace an attribute instance in the collection with a new attribute instance
   */
  replace(oldAttribute: AttributeType, newAttribute: AttributeType) {
    this.replaceByKey(oldAttribute.key, newAttribute);
  }

  /**
   * Replace an attribute by the key of the attribute
   */
  replaceByKey(key: string, newAttribute: AttributeType) {
    this.forEach((attribute, index) => {
      if (attribute.key === key) {
        this.collection[index] = newAttribute;
      }
    });
  }

  /**
   * Set reference date by replacing an old attribute with a new attribute with a reference Date
   * Date is a string in ISO format yyyy-MM-dd
   */
  setReferenceDate(date: string) {
    this.forEach((attribute) => {
      const newAttribute = attribute.clone();

      newAttribute.referenceDate = date;

      this.replace(attribute, newAttribute);
    });
  }

  /**
   * Retrieves a dependent choice attribute from this collection
   */
  getDependentChoiceAttribute(
    controlAttributeId: string
  ): ChoiceAttributeModel | BooleanAttributeModel | null {
    const attribute = this.getAttributeByLayoutHint(
      `${DEPENDENT_ATTRIBUTE_CONTROL}:${controlAttributeId}`,
      `${DEPENDENT_ATTRIBUTE_CONTROL}: ${controlAttributeId}`
    );

    if (
      attribute instanceof ChoiceAttributeModel ||
      attribute instanceof BooleanAttributeModel
    ) {
      return attribute;
    }

    return null;
  }

  hasServerErrors(): boolean {
    return this.collection.some((attribute) => attribute.hasServerErrors());
  }

  addServerError(error: FormErrorAnchor) {
    const elementid = get(error.anchor, "elementid");

    const attribute = this.getAttributeByKey(elementid);
    if (attribute) {
      attribute.addServerError(error);
    } else {
      throw new ConfigurationException(
        `Could not add error to missing attribute with id ${elementid}`
      );
    }
  }

  hasErrors(): boolean {
    return this.visible.some((attribute) => attribute.hasErrors());
  }

  processLayoutHints() {
    const uploadInformationAttributes = this.getAttributesByLayoutHint(
      INITIAL_TOTAL_FILESIZE,
      MAX_TOTAL_FILESIZE
    );

    if (uploadInformationAttributes.length === 2) {
      const firstHasInitialTotalFileSize = uploadInformationAttributes[0].layouthint.has(
        INITIAL_TOTAL_FILESIZE
      );

      const initialTotalFileSize = firstHasInitialTotalFileSize
        ? uploadInformationAttributes[0].value
        : uploadInformationAttributes[1].value;

      const maxTotalFileSize = firstHasInitialTotalFileSize
        ? uploadInformationAttributes[1].value
        : uploadInformationAttributes[0].value;

      this.all
        .filter((attribute) => attribute.type === "upload")
        .forEach((attribute) => {
          // $FlowFixMe
          attribute.initialTotalFileSize = initialTotalFileSize;
          // $FlowFixMe
          attribute.maxTotalFileSize = maxTotalFileSize;
        });
    }
  }

  updateValidations(errors: Array<Object>) {
    this.all
      .filter((attribute) => attribute.hasDynamicValidationData)
      .forEach((attribute) => {
        const attributeErrors = errors.filter(
          (error) => get(error.anchor, "elementid", "") === attribute.key
        );
        attribute.updateValidations(attributeErrors);

        if (attribute instanceof CompositeAttributeModel) {
          const compositeChildErrors = errors.filter((error) =>
            get(error.anchor, "elementid", "").startsWith(`${attribute.key}.`)
          );

          attribute.children.updateValidations(
            `${attribute.key}.`,
            compositeChildErrors
          );
        }
      });

    return this;
  }

  indicateContentConfiguration(contentConfiguration: ContentConfiguration) {
    if (contentConfiguration) {
      this.all.forEach((attribute) => {
        attribute.indicateContentConfiguration(contentConfiguration);
      });
    }
  }

  /**
   * Generate formdata object for current collection based on formdata of attributes
   * Skip attributes that are readonly, the confirmation password or null
   */
  get formdata(): Object {
    return this.getFormData(false);
  }

  getFormData(validationData?: boolean = false) {
    return this.all
      .filter(
        (attribute) =>
          attribute.formdata !== null &&
          !attribute.readonly &&
          (!validationData || attribute.hasDynamicValidationData)
      )
      .map((attribute) => {
        // make attribute empty when it is not (or no longer) visible
        if (isVisibleAttribute(this, attribute)) {
          return attribute.formdata;
        }

        return attribute.getEmptyFormData();
      })
      .reduce(
        (formdata, attributeFormData) => ({
          ...formdata,
          ...attributeFormData,
        }),
        {}
      );
  }
}

export default AttributeCollection;

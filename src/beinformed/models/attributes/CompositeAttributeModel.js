// @flow
import { get } from "lodash";

import AttributeModel from "beinformed/models/attributes/AttributeModel";

import CompositeAttributeChildCollection from "beinformed/models/attributes/CompositeAttributeChildCollection";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import RangeConstraint from "beinformed/models/constraints/RangeConstraint";
import MandatoryRangeConstraint from "beinformed/models/constraints/MandatoryRangeConstraint";
import { getSetting } from "beinformed/constants/Settings";
import { IllegalArgumentException } from "beinformed/exceptions";

import type { ModularUIModel, AttributeType } from "beinformed/models";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";

class CompositeAttributeModel extends AttributeModel {
  _children: CompositeAttributeChildCollection;

  constructor(data: Object, contributions: Object) {
    super(data, contributions);

    this._children = CompositeAttributeChildCollection.create(
      data,
      contributions
    );

    this.setChildrenOptionality();
  }

  static isApplicableModel(contributions: Object) {
    return (
      contributions.type === "composite" ||
      get(contributions, "type", []).includes("range")
    );
  }

  getInitialChildModelLinks() {
    return this.children.getInitialChildModelLinks();
  }

  setChildModels(models: Array<ModularUIModel>) {
    this.children.setChildModels(models);
  }

  get type() {
    // temp fix for results and given answers on list result detail panel
    if (this.key === "results" || this.key === "givenAnswers") {
      return "composite";
    }

    return this.isRange ? "range" : "composite";
  }

  get isRange() {
    return this.contributions.type.includes("range");
  }

  get children() {
    return this._children;
  }

  set children(children: CompositeAttributeChildCollection) {
    this._children = children;
  }

  get start() {
    return this.children.all[0];
  }

  get end() {
    return this.children.all[this.children.size - 1];
  }

  /**
   * Get input value of attribute
   */
  getInputValue() {
    return this.children.getInputValue();
  }

  /**
   * Check if at least one child has value
   */
  hasValue() {
    return this.children.some((child) => child.hasValue());
  }

  get constraintCollection() {
    const constraints = new ConstraintCollection();

    constraints.add(this._serverConstraints);
    constraints.add(this.addConstraints());

    return constraints;
  }

  /**
   * Validate input
   */
  validate() {
    // when client side validation is disabled, this attribute is always valid
    if (!getSetting("USE_CLIENTSIDE_VALIDATION")) {
      return true;
    }

    this._isValid = this.children.validate();

    if (this._isValid) {
      this._isValid = this.constraintCollection.validate();
    }

    return this._isValid;
  }

  /**
   * Add Date constraints for attribute
   */
  addConstraints() {
    const constraints = new ConstraintCollection();
    if (this.isRange && this.start && this.end) {
      const allChildsEntered = this.children.every((child) => child.hasValue());
      if (allChildsEntered) {
        constraints.add(new RangeConstraint(this.start, this.end));
      }
    }

    if (this.isRange && this.mandatory) {
      const allChildsOptional = this.children.every(
        (child) => !child.mandatory
      );
      if (allChildsOptional) {
        constraints.add(
          new MandatoryRangeConstraint(this.start.type, this.children)
        );
      }
    }

    return constraints;
  }

  /**
   * Indicates if attribute input is valid
   */
  get isValid() {
    return this.validate();
  }

  hasServerErrors() {
    return (
      this.errorCollection.serverErrors.length > 0 ||
      this.children.some((child) => child.hasServerErrors())
    );
  }

  hasErrors() {
    return (
      this.errorCollection.hasItems ||
      this.children.some((child) => child.hasErrors())
    );
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.children.reset();
  }

  getChildByAttribute(attribute: AttributeType) {
    return this.children.find((child) => {
      if (child.equals(attribute)) {
        return true;
      } else if (child instanceof CompositeAttributeModel) {
        return child.getChildByAttribute(attribute);
      }

      return false;
    });
  }

  getChildByKey(key: string) {
    return (
      this.children.find((child) => {
        if (child.key === key) {
          return true;
        } else if (child instanceof CompositeAttributeModel) {
          return child.getChildByKey(key);
        }

        return false;
      }) || null
    );
  }

  mergeAttribute(withAttribute: AttributeType) {
    this.concept = withAttribute.concept;

    this.children.forEach((child) => {
      if (withAttribute instanceof CompositeAttributeModel) {
        const withChildAttribute = withAttribute.getChildByKey(child.key);
        child.mergeAttribute(withChildAttribute);
      }
    });
  }

  update(value: string, changedAttribute: ?AttributeType) {
    if (!changedAttribute) {
      throw new IllegalArgumentException(
        "Composite attribute needs changed attribute on update call"
      );
    }

    this.updateLastModification();

    this.children.forEach((child) => {
      if (child instanceof CompositeAttributeModel) {
        child.update(value, changedAttribute);
      } else if (child.equals(changedAttribute)) {
        child.update(value);
      }
    });

    this.setChildrenOptionality();

    this.validate();

    return this;
  }

  setChildrenOptionality() {
    const childrenAreOptional =
      !this.mandatory && this.children.every((child) => child.value === null);

    this.children.forEach((child) => {
      child.mandatory = childrenAreOptional ? false : child.configuredMandatory;
    });
  }

  get readonly() {
    return super.readonly || this.children.every((child) => child.readonly);
  }

  set readonly(readonly: boolean) {
    super.readonly = readonly;
  }

  get readonlyvalue() {
    return this.children.readonlyvalue;
  }

  get initvalue() {
    return this.children.initvalue;
  }

  getFormData() {
    return { [this.name]: this.value };
  }

  getValue() {
    return this.children.value;
  }

  get isResult() {
    return this._isResult;
  }

  set isResult(isResult: boolean) {
    this._isResult = isResult;

    this.children.forEach((child) => {
      child.isResult = isResult;
    });
  }

  indicateContentConfiguration(contentConfiguration: ContentConfiguration) {
    if (contentConfiguration) {
      this.children.forEach((child) => {
        child.indicateContentConfiguration(contentConfiguration);
      });
    }
  }

  equals(otherAttribute: AttributeType) {
    return (
      (this.key === otherAttribute.key &&
        this.parentKey === otherAttribute.parentKey) ||
      this.children.some(
        (child) => child.equals && child.equals(otherAttribute)
      )
    );
  }
}

export default CompositeAttributeModel;

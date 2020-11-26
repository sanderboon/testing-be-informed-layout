// @flow
import { flattenDeep, get, has } from "lodash";
import deepmerge from "deepmerge";

import { IllegalArgumentException } from "beinformed/exceptions";

import ResourceModel from "beinformed/models/base/ResourceModel";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

import Href from "beinformed/models/href/Href";
import Parameter from "beinformed/models/href/Parameter";

import FormObjectModel from "beinformed/models/form/FormObjectModel";

import { HTTP_METHODS } from "beinformed/constants/Constants";
import { getSetting } from "beinformed/constants/Settings";
import {
  CREATE_ACTION,
  DELETE_ACTION,
  UPDATE_ACTION,
} from "beinformed/constants/LayoutHints";

import type {
  ModularUIModel,
  ErrorResponse,
  LinkModel,
} from "beinformed/models";
import type { ModularUIResponse } from "beinformed/modularui";

class FormModel extends ResourceModel {
  _lastUpdate: number;

  _completedFormObjects: Array<FormObjectModel> = [];
  _currentFormObject: FormObjectModel | null = null;
  _previouslyEnteredFormObjects: Array<FormObjectModel> = [];

  _mergePreviouslyEnteredObjects: boolean = true;

  _endResultFormObjects: Array<FormObjectModel> = [];
  _previousEndResultKeys: Array<string> = [];

  _errorCollection: ErrorCollection = new ErrorCollection("form");

  _redirectLocation: Href;

  _commit: boolean;
  _isFinished: boolean;
  _isComplete: boolean;

  _parameters: Array<Parameter>;
  _tokens: Array<string>;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this.lastUpdate = 0;

    this.currentFormObject = this.createFormObject();
    this.endResultFormObjects = this.setEndResultFormObjects();

    this.parameters = this.setParameters(modularuiResponse);

    this.isComplete = get(this.data, "complete", false);

    if (this.data.errors) {
      this.handleRootErrors(this.data.errors);
    }
  }

  get type(): string {
    return "Form";
  }

  get actiontype(): string {
    if (this.layouthint.has(CREATE_ACTION)) {
      return "create";
    }
    if (this.layouthint.has(UPDATE_ACTION)) {
      return "update";
    }
    if (this.layouthint.has(DELETE_ACTION)) {
      return "delete";
    }

    return get(this.contributions, "actiontype", "form");
  }

  static isApplicableModel(data: ModularUIResponse) {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "Form"
    );
  }

  getInitialChildModelLinks(): Array<LinkModel> {
    const endResultChildLinks = flattenDeep(
      this.endResultFormObjects.map((endResultFormObject) =>
        endResultFormObject.getInitialChildModelLinks()
      )
    );

    if (this.currentFormObject === null) {
      return endResultChildLinks;
    }

    return [
      ...this.currentFormObject.getInitialChildModelLinks(),
      ...endResultChildLinks,
    ];
  }

  setChildModels(models: Array<ModularUIModel>) {
    if (this.currentFormObject) {
      this.currentFormObject.setChildModels(models);
    }

    this.endResultFormObjects.forEach((endResultFormObject) => {
      endResultFormObject.setChildModels(models);
    });
  }

  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Get all applicable objects
   */
  get allObjects(): Array<FormObjectModel> {
    if (this.currentFormObject === null) {
      return this.completedFormObjects;
    }

    return [...this.completedFormObjects, this.currentFormObject];
  }

  get objectKeys(): Array<string> {
    if (has(this.contributions, "objects")) {
      return Object.keys(this.contributions.objects);
    }

    return [];
  }

  get numberOfExpectedQuestions() {
    return this.objectKeys.length;
  }

  /**
   * Has questions configured on form
   */
  get hasNoQuestionsConfigured(): boolean {
    return (
      this.isComplete &&
      (this.objectKeys.length === 0 ||
        (!("missing" in this.data) &&
          !("results" in this.data) &&
          !("errors" in this.data)))
    );
  }

  addGlobalDynamicSchema(anchor: Object, dynamicschema: Object) {
    if (!dynamicschema) {
      return anchor;
    }

    return {
      ...anchor,
      elements: anchor.elements.map((element) => ({
        ...element,
        dynamicschema: element.dynamicschema
          ? element.dynamicschema.map((item) => ({
              ...item,
              elements: { ...item.elements, dynamicschema },
            }))
          : null,
      })),
    };
  }

  getMissingAnchors() {
    const missingAnchors = get(this.data, "missing.anchors", []);

    // Add intermediate result data to anchor
    return missingAnchors.map((anchor) => {
      if (this.data.results) {
        const resultObject = this.data.results.find(
          (result) =>
            result.objectid === anchor.objectid && "elements" in result
        );

        if (resultObject) {
          anchor.results = resultObject.elements;
        }
      }

      return this.addGlobalDynamicSchema(anchor, this.data.dynamicschema);
    });
  }

  /**
   * Create form object based on the data and contributions available in this form
   */
  createFormObject() {
    if (this.data && this.contributions) {
      const missingAnchors = this.getMissingAnchors();

      // Get object id from first anchor
      const objectId = get(missingAnchors, "[0].objectid", "");
      const contributions = get(this.contributions, `objects[${objectId}]`);
      if (contributions) {
        return new FormObjectModel(missingAnchors[0], contributions);
      }
    }

    return null;
  }

  addEmptyFormObject(
    formObjectModel: FormObjectModel | null = this.currentFormObject
  ) {
    if (formObjectModel) {
      const emptyFormObject = FormObjectModel.createEmpty(formObjectModel);

      emptyFormObject.repeatIndex =
        this.getHighestRepeatIndex(formObjectModel) + 1;

      this.addFormObject(emptyFormObject);
    }
  }

  getHighestRepeatIndex(formObjectModel: FormObjectModel) {
    return Math.max(
      ...this.allObjects
        .filter((formObject) => formObject.equals(formObjectModel, false))
        .map((formObject) => formObject.repeatIndex)
    );
  }

  addFormObject(formObjectModel: FormObjectModel) {
    if (!formObjectModel) {
      throw new IllegalArgumentException("Missing form object to add");
    }

    this.completedFormObjects = [...this.allObjects];
    this.currentFormObject = formObjectModel;
  }

  removeFormObject(formObjectModel: ?FormObjectModel) {
    if (!formObjectModel) {
      throw new IllegalArgumentException("Missing form object to remove");
    }
    if (formObjectModel.equals(this.currentFormObject)) {
      throw new Error("Can not remove the current form object");
    }

    this.completedFormObjects = this.completedFormObjects.filter(
      (formObject) => !formObject.equals(formObjectModel)
    );
  }

  get currentFormObject(): FormObjectModel | null {
    return this._currentFormObject;
  }

  set currentFormObject(formObject: FormObjectModel | null) {
    this._currentFormObject = formObject;
  }

  /**
   * Completed objects are previously entered questions
   */
  get completedFormObjects(): Array<FormObjectModel> {
    return this._completedFormObjects;
  }

  set completedFormObjects(formObjects: Array<FormObjectModel>) {
    this._completedFormObjects = formObjects;
  }

  /**
   * Previously entered objects are questions that have been entered before,
   * but are currently not applicable for the form.
   * For example because of previous navigation
   */
  get previouslyEnteredFormObjects(): Array<FormObjectModel> {
    return this._previouslyEnteredFormObjects;
  }

  set previouslyEnteredFormObjects(formObjects: Array<FormObjectModel>) {
    this._previouslyEnteredFormObjects = formObjects;
  }

  /**
   * Handle end results
   */
  setEndResultFormObjects() {
    if (this.data && this.data.results) {
      const missingObjectIds = get(this.data, "missing.anchors", []).map(
        (anchor) => anchor.objectid
      );

      // Filter out intermediate results and rename elements property to result property
      const endResultAnchors = this.data.results
        .filter((result) => !missingObjectIds.includes(result.objectid))
        .map((result) => {
          const { elements, ...otherProps } = result;

          return {
            ...otherProps,
            results: elements,
          };
        });

      if (endResultAnchors.length > 0) {
        return endResultAnchors.map(
          (endResult) =>
            new FormObjectModel(
              endResult,
              this.contributions.objects[endResult.objectid]
            )
        );
      }
    }

    return [];
  }

  get expectsEndResultFormObjects(): boolean {
    const endResultKeys = this.endResultFormObjects.map(
      (endResult) => endResult.key
    );

    return this.objectKeys.some(
      (objectKey) =>
        has(this.contributions.objects[objectKey], "content.results") &&
        !endResultKeys.includes(objectKey)
    );
  }

  get endResultFormObjects(): Array<FormObjectModel> {
    return this._endResultFormObjects;
  }

  getEndResultFormObjects(): Array<FormObjectModel> {
    return this.endResultFormObjects.filter(
      (endResult) => !this.previousEndResultKeys.includes(endResult.key)
    );
  }

  set endResultFormObjects(endResultFormObjects: Array<FormObjectModel>) {
    this.previousEndResultKeys = this.endResultFormObjects.map(
      (endResult) => endResult.key
    );
    this._endResultFormObjects = endResultFormObjects;
  }

  get previousEndResultKeys(): Array<string> {
    return this._previousEndResultKeys;
  }

  set previousEndResultKeys(endResultFormObjectKeys: Array<string>) {
    this._previousEndResultKeys = endResultFormObjectKeys;
  }

  /**
   * Error handling
   */
  get isValid(): boolean {
    if (this.currentFormObject) {
      if (this.currentFormObject.isRepeatable) {
        // repeating objects need at least one valid form object
        const hasOneValidQuestion = this.allObjects
          .filter((object) => object.equals(this.currentFormObject, false))
          .find((object) => object.isValid);

        if (hasOneValidQuestion) {
          return true;
        }
      }

      return this.currentFormObject.isValid;
    }

    return true;
  }

  hasServerErrors() {
    if (this.errorCollection.hasItems) {
      return true;
    }

    if (this.currentFormObject) {
      return this.currentFormObject.hasServerErrors();
    }

    return false;
  }

  hasErrors() {
    if (this.errorCollection.hasItems) {
      return true;
    }

    if (this.currentFormObject) {
      return this.currentFormObject.hasErrors();
    }

    return false;
  }

  /**
   * Add an error to the error collection of this form
   */
  addServerError(error: ErrorResponse) {
    if (error.parameters) {
      this.errorCollection.addServerError(
        error.id,
        error.message,
        error.parameters
      );
    } else {
      this.errorCollection.addServerError(error.id, error.message);
    }
  }

  /**
   * Reset error messages
   */
  resetErrors() {
    this._errorCollection = new ErrorCollection("form");

    if (this.currentFormObject) {
      this.currentFormObject.resetErrors();
    }
  }

  get errorCollection(): ErrorCollection {
    return this._errorCollection;
  }

  set errorCollection(errorCollection: ErrorCollection) {
    this._errorCollection = errorCollection;
  }

  /**
   * Indicates if the form needs to be committed
   */
  get commit(): boolean {
    return this._commit || false;
  }

  set commit(commit: boolean) {
    this._commit = commit;
  }

  /**
   * Inidicates if form is finished: Form is completely entered and committed
   */
  get isFinished(): boolean {
    return this._isFinished || "success" in this.data;
  }

  set isFinished(isFinished: boolean) {
    this._isFinished = isFinished;
  }

  /**
   * Indicates if form is completely entered
   */
  get isComplete(): boolean {
    return this._isComplete;
  }

  set isComplete(isComplete: boolean) {
    this._isComplete = isComplete;
  }

  /**
   * Handle success redirects
   */
  get successRedirect(): Href | null {
    return this.isFinished && this.data.success
      ? new Href(this.data.success.redirect)
      : null;
  }

  get redirectLocation(): Href {
    return this._redirectLocation || this.successRedirect;
  }

  /**
   * Href handling
   */
  setParameters(modularuiResponse: ModularUIResponse) {
    const parameters = get(modularuiResponse, "parameters", []);

    return parameters.map(
      (par) => new Parameter(par._prefix, par._name, par._value)
    );
  }

  get parameters(): Array<Parameter> {
    return this._parameters;
  }

  set parameters(parameters: Array<Parameter>) {
    this._parameters = parameters;
  }

  selfhrefNoCommitParam() {
    const selfhref = this.selflink.href;
    selfhref.method = HTTP_METHODS.POST;

    selfhref.parameters = this.parameters.filter(
      (parameter) => parameter.name !== "commit"
    );

    return selfhref;
  }

  selfhrefWithCommitParam() {
    const selfhref = this.selfhrefNoCommitParam();

    if (this.expectsEndResultFormObjects && !this.isComplete && !this.commit) {
      selfhref.addParameter("commit", "false");
    }

    return selfhref;
  }

  /**
   * Create a selfhref including the parameters that are used to start this form
   */
  get selfhref(): Href {
    if (!this.selflink) {
      throw new Error("No self link found for form");
    }

    if (getSetting("ALWAYS_COMMIT_FORM")) {
      return this.selfhrefNoCommitParam();
    }

    return this.selfhrefWithCommitParam();
  }

  /**
   * Handle form tokens to indicate concurrent form use
   */
  get tokens(): Array<string> {
    return this._tokens || this.data.tokens || [];
  }

  set tokens(tokens: Array<string>) {
    this._tokens = tokens;
  }

  /**
   * Keep track of changed form
   */
  isChanged(): boolean {
    return (
      this.currentFormObject !== null &&
      this.currentFormObject.isChangedSince(this.lastUpdate)
    );
  }

  get lastUpdate(): number {
    return this._lastUpdate;
  }

  set lastUpdate(lastUpdate: number) {
    this._lastUpdate = lastUpdate;
  }

  getFormDataObjects(
    validOnly?: boolean = true,
    validationData?: boolean = false
  ): Array<Object> {
    const formdata = [];

    const formObjects = validOnly
      ? this.allObjects.filter((formObject, index) => {
          // repeatabe object without fixed nr of repeats, remove last form object from formdata,
          // because this is the formobject that is used as a placeholder for the create object
          // of the collection of repeats
          if (formObject.isRepeatable && !formObject.hasFixedNrOfRepeats) {
            const isLastRepeat =
              index === this.allObjects.length - 1 ||
              this.allObjects[index + 1].key !== formObject.key;

            return !isLastRepeat;
          }

          return formObject.isValid;
        })
      : this.allObjects;

    formObjects.forEach((formObject) => {
      const objectFormData = formObject.getFormData(validationData);

      const existingObjectIndex = formdata.findIndex(
        (obj) =>
          obj.key === formObject.key &&
          obj.repeatIndex === formObject.repeatIndex
      );

      /*
       * when the object already exists in the formdata with the same key and index,
       * merge the attributes of both objects together
       */
      if (existingObjectIndex > -1) {
        formdata[existingObjectIndex].formdata = deepmerge(
          formdata[existingObjectIndex].formdata,
          objectFormData
        );
      } else {
        formdata.push({
          key: formObject.key,
          repeatIndex: formObject.repeatIndex,
          formdata: objectFormData,
        });
      }
    });

    return formdata.map((obj) => ({ [obj.key]: obj.formdata }));
  }

  getFormData(
    validOnly: boolean = true,
    withConcurrencyToken: boolean = true,
    validationData: boolean = false
  ) {
    if (withConcurrencyToken && this.tokens.length > 0) {
      return JSON.stringify({
        objects: this.getFormDataObjects(validOnly, validationData),
        tokens: this.tokens,
      });
    }

    return JSON.stringify({
      objects: this.getFormDataObjects(validOnly, validationData),
    });
  }

  /**
   * Get form data for submitting
   */
  get formdata(): string {
    return this.getFormData(getSetting("USE_CLIENTSIDE_VALIDATION"));
  }

  get validationData(): string {
    return this.getFormData(false, false, true);
  }

  /**
   * Form navigation: Go one object back (previous button)
   */
  get hasPreviousStep(): boolean {
    const currentFormObjectKey =
      this.currentFormObject != null ? this.currentFormObject.key : "";

    return (
      this.completedFormObjects.filter(
        (formObject) =>
          !formObject.isRepeatWithUnknownTotal ||
          formObject.key !== currentFormObjectKey
      ).length > 0
    );
  }

  /**
   * Go one form-object back,
   * for repeating object this means go back
   * until we get at a form object that had
   * a different key than the current form object
   */
  setPreviousObject() {
    this.isComplete = false;

    const oldCurrentFormObject = this.currentFormObject;

    if (this.currentFormObject !== null) {
      this.previouslyEnteredFormObjects = [
        this.currentFormObject,
        ...this.previouslyEnteredFormObjects,
      ];
    }

    this.currentFormObject = this.completedFormObjects[
      this.completedFormObjects.length - 1
    ];
    this.completedFormObjects = this.completedFormObjects.slice(0, -1);

    const completedFormObjectKeys = this.completedFormObjects
      .map((formObject) => formObject.key)
      .filter((formObjectKey) => formObjectKey !== this.currentFormObject?.key);

    this.endResultFormObjects = this._endResultFormObjects.filter((endResult) =>
      completedFormObjectKeys.includes(endResult.key)
    );
    this.previousEndResultKeys = this.endResultFormObjects.map(
      (endResult) => endResult.key
    );

    // while we are at the same repeating form object, go a step back
    if (
      this.currentFormObject &&
      this.currentFormObject.equals(
        oldCurrentFormObject,
        this.currentFormObject.hasFixedNrOfRepeats
      )
    ) {
      this.setPreviousObject();
    }
  }

  /**
   * Form navigation: has next step or is last
   */
  get hasNextStep(): boolean {
    if (
      this.isComplete ||
      this.isFinished ||
      this.hasNoQuestionsConfigured ||
      !this.contributions.objects
    ) {
      return false;
    }

    // current object is a dynamic object
    if (this.currentFormObject && this.currentFormObject.isDynamic) {
      return true;
    }

    if (this.expectsEndResultFormObjects) {
      return true;
    }

    const currentObjectIndex = this.objectKeys.findIndex(
      (objectKey) => objectKey === get(this.currentFormObject, "key", "")
    );
    const isLastObject = this.objectKeys.length - 1 === currentObjectIndex;

    // current object is a repeating question but it is not the last one
    if (
      isLastObject &&
      this.currentFormObject &&
      this.currentFormObject.isRepeatable &&
      !this.currentFormObject.isLastRepeat
    ) {
      return true;
    }

    // current object is not repeatable and the last object
    if (isLastObject) {
      return false;
    }

    // can't determine if this is te last, render a next button
    return true;
  }

  /**
   * Merge existing form with new form
   */
  update(receivedForm: FormModel) {
    this.resetErrors();

    this.lastUpdate = Date.now();
    this.lastServerUpdate = receivedForm.lastServerUpdate;

    this.tokens = receivedForm.tokens;

    this.isComplete = receivedForm.isComplete;
    this.isFinished = receivedForm.isFinished;

    if (
      !has(receivedForm.data, "missing") &&
      !has(receivedForm.data, "errors")
    ) {
      this.handleFinished(receivedForm);
    }

    if (has(receivedForm.data, "errors")) {
      this.handleErrors(receivedForm);
    }

    if (has(receivedForm.data, "missing")) {
      this.handleMissing(receivedForm);
    }

    return this;
  }

  updateValidations(data: any) {
    if (this.currentFormObject) {
      this.currentFormObject.updateValidations(data);
    }

    return this;
  }

  /**
   * Process finished form
   */
  handleFinished(receivedForm: FormModel) {
    if (this.currentFormObject) {
      this.completedFormObjects = [
        ...this.completedFormObjects,
        this.currentFormObject,
      ];
    }

    this.currentFormObject = receivedForm.currentFormObject;
    this.endResultFormObjects = receivedForm.endResultFormObjects;

    this._data = receivedForm._data;
  }

  handleRootErrors(errors: Array<Object>) {
    errors
      .filter((error) => !error.anchor)
      .forEach((error) => {
        this.errorCollection.addServerError(
          error.id,
          error.message,
          error.properties
        );
      });
  }

  /**
   * Process errors from received form
   */
  handleErrors(receivedForm: FormModel) {
    const errorAnchors = receivedForm.data.errors;
    if (errorAnchors) {
      errorAnchors.forEach((error) => {
        if (
          error.anchor &&
          this.currentFormObject &&
          this.currentFormObject.key === error.anchor.objectid
        ) {
          this.currentFormObject.addServerError(error);
        } else {
          this.errorCollection.addServerError(
            error.id,
            error.message,
            error.properties
          );
        }
      });
    }
  }

  /**
   * Process missing from received form
   */
  handleMissing(receivedForm: FormModel) {
    if (
      this.currentFormObject &&
      this.currentFormObject.equals(receivedForm.currentFormObject)
    ) {
      this.handleMissingErrors(receivedForm);
    } else {
      this.handleNewFormObject(receivedForm);
    }
  }

  /**
   * Received missing anchors in the response with an object id that is the current form object
   */
  processMissingErrors(receivedForm: FormModel) {
    if (this.currentFormObject === null) {
      return null;
    }

    this.currentFormObject.attributeCollection.map((attribute) => {
      if (
        receivedForm.currentFormObject &&
        receivedForm.currentFormObject.hasAttributeByKey(attribute.key)
      ) {
        attribute.addMissingError();
      } else {
        attribute.removeMissingError();
      }

      return attribute;
    });

    return this.currentFormObject;
  }

  handleMissingErrors(receivedForm: FormModel) {
    this.currentFormObject = this.processMissingErrors(receivedForm);
  }

  handleNewFormObject(receivedForm: FormModel) {
    this.endResultFormObjects = receivedForm.endResultFormObjects;

    const receivedCurrentFormObject = receivedForm.currentFormObject;

    if (receivedCurrentFormObject === null) {
      this.completedFormObjects = [...this.allObjects];
      this.currentFormObject = null;
    } else {
      // check if received form exists in the previously entered form objects
      const previouslyEnteredFormObjects = this.previouslyEnteredFormObjects.filter(
        (formObject) =>
          formObject.equals(
            receivedCurrentFormObject,
            formObject.hasFixedNrOfRepeats
          )
      );

      if (previouslyEnteredFormObjects.length > 0) {
        this.handlePreviouslyEnteredFormObjects(
          receivedCurrentFormObject,
          previouslyEnteredFormObjects
        );
      } else {
        this.completedFormObjects = [...this.allObjects];
        this.currentFormObject = receivedCurrentFormObject;
      }
    }
  }

  /**
   * Indicate if a new form object model should be merged with a previousled entered form object model
   * Set this property to false on the form that receives the new form to skip the merge behavior
   * @returns {booelan}
   */
  get mergePreviouslyEnteredObjects() {
    return this._mergePreviouslyEnteredObjects;
  }

  set mergePreviouslyEnteredObjects(mergePreviouslyEnteredObjects: boolean) {
    this._mergePreviouslyEnteredObjects = mergePreviouslyEnteredObjects;
  }

  handlePreviouslyEnteredFormObjects(
    receivedCurrentFormObject: FormObjectModel,
    previouslyEnteredFormObjects: Array<FormObjectModel>
  ) {
    previouslyEnteredFormObjects.forEach((previouslyEnteredFormObject) => {
      const mergedObject = this.mergePreviouslyEnteredObjects
        ? this.mergeObjects(
            receivedCurrentFormObject,
            previouslyEnteredFormObject
          )
        : receivedCurrentFormObject;

      this.addFormObject(mergedObject);
    });

    // remove the previously entered form object
    this.previouslyEnteredFormObjects = this.previouslyEnteredFormObjects.filter(
      (formObject) => {
        const hasPreviouslyEnteredObject = previouslyEnteredFormObjects.find(
          (previouslyEnteredFormObject) =>
            formObject.equals(previouslyEnteredFormObject)
        );

        return !hasPreviouslyEnteredObject;
      }
    );
  }

  mergeObjects(newObject: FormObjectModel, oldObject: FormObjectModel) {
    const mergedFormObject = FormObjectModel.createEmpty(newObject);

    mergedFormObject.mergeObject(oldObject);

    return mergedFormObject;
  }

  findAttribute(findMethod: Function) {
    let foundAttribute = null;

    this.allObjects.forEach((formObject) => {
      if (foundAttribute === null) {
        foundAttribute =
          formObject.attributeCollection.all.find((item) => findMethod(item)) ||
          null;
      }
    });

    return foundAttribute;
  }
}

export default FormModel;

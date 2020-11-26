// @flow
import { updateModel } from "beinformed/redux/actions/ModularUI";

import { getSetting } from "beinformed/constants/Settings";

import { validateFormObject } from "./FormValidations";
import { autosaveFormObject } from "./FormAutosave";
import { autosubmitFormObject } from "./FormAutosubmit";

import type { ThunkAction } from "beinformed/redux";
import type { UpdateFormOptions } from "beinformed/constants";
import type {
  AttributeType,
  FormModel,
  FormObjectModel,
} from "beinformed/models";

/**
 * Update an attribute on a form
 */
export const updateFormAttribute = (
  form: FormModel,
  formObject: FormObjectModel,
  attribute: AttributeType,
  inputvalue: string,
  options: UpdateFormOptions = {
    autosubmit: false,
    autosave: false,
    forceUpdate: false,
  }
): ThunkAction => (dispatch) => {
  const newForm = form.clone();

  if (
    newForm.currentFormObject &&
    newForm.currentFormObject.equals(formObject)
  ) {
    newForm.currentFormObject.updateAttribute(attribute, inputvalue);
  } else {
    newForm.completedFormObjects.forEach((completeObject) => {
      if (completeObject.equals(formObject)) {
        completeObject.updateAttribute(attribute, inputvalue);
      }
    });
  }

  if (options.autosubmit && newForm.isValid) {
    const autosubmitAction = autosubmitFormObject(
      newForm,
      attribute,
      options.forceUpdate
    );
    if (autosubmitAction) {
      return dispatch(autosubmitAction);
    }
  }

  if (options.autosave && newForm.isValid && newForm.isChanged()) {
    dispatch(autosaveFormObject(newForm));
  }

  if (
    newForm.currentFormObject &&
    newForm.currentFormObject.hasDynamicValidations &&
    getSetting("USE_INSTANT_SERVER_VALIDATION")
  ) {
    dispatch(validateFormObject(newForm));
  }

  return dispatch(updateModel(newForm));
};

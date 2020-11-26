// @flow
import { debounce } from "lodash";

import { updateModel } from "./ModularUI";

import ModularUIRequest from "beinformed/modularui/ModularUIRequest";

import {
  HTTP_METHODS,
  VALIDATE_DEBOUNCE_TIMEOUT,
} from "beinformed/constants/Constants";

import type { ThunkAction } from "beinformed/redux";
import type { FormModel } from "beinformed/models";

/**
 * Update validations of the form currently in the reducer
 * because of the debounce timeout there might have been an update on the form during validation
 */
const updateValidations = (form, formWithValidations): ThunkAction => (
  dispatch,
  getState
) => {
  const currentForm = getState().modularui[form.connectKey];

  if (currentForm) {
    const validatedForm = currentForm.model.clone(true);
    validatedForm.updateValidations(formWithValidations.data);

    dispatch(updateModel(validatedForm));
  }
};

/**
 * Validates form objects debounced to prevent overloading the (form) service
 * When a form with new errors (or complete) arrives, we send the validations
 * to the current form model where the errors are processed
 * A new form with the new constraints is send to the store
 */
const debouncedValidateFormObject = debounce(
  (dispatch, form: FormModel) => {
    new ModularUIRequest(form.selfhref.setParameter("commit", "false"), {
      method: HTTP_METHODS.POST,
      data: form.validationData,
      childmodels: false,
      isValidationRequest: true,
    })
      .fetch()
      .then((formWithValidations) =>
        dispatch(updateValidations(form, formWithValidations))
      );
  },
  VALIDATE_DEBOUNCE_TIMEOUT,
  {
    leading: true,
    trailing: true,
  }
);

export const validateFormObject = (form: FormModel): ThunkAction => (
  dispatch
) => debouncedValidateFormObject(dispatch, form);

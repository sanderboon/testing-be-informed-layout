// @flow
import { debounce } from "lodash";

import ModularUIRequest from "beinformed/modularui/ModularUIRequest";
import FormModel from "beinformed/models/form/FormModel";

import {
  HTTP_METHODS,
  VALIDATE_DEBOUNCE_TIMEOUT,
  AUTOSAVE_STATUS,
} from "beinformed/constants/Constants";

import { updateModel } from "./ModularUI";

import type { UpdateAutosaveAction, ThunkAction } from "beinformed/redux";
import type { AutosaveStatus } from "beinformed/constants";

/**
 * Update validations of the form currently in the reducer
 * because of the debounce timeout there might have been an update on the form during validation
 */
const updateAutosave = (
  status: AutosaveStatus,
  model: FormModel
): UpdateAutosaveAction => ({
  type: "UPDATE_AUTOSAVE_STATUS",
  payload: {
    status,
    model,
  },
});

const autosave = (dispatch, form: FormModel): any => {
  dispatch(updateAutosave(AUTOSAVE_STATUS.START, form));

  const formdata = form.getFormData(true, false);

  new ModularUIRequest(form.selfhref.setParameter("commit", "true"), {
    method: HTTP_METHODS.POST,
    data: formdata,
    childmodels: false,
  })
    .fetch()
    .then((savedForm) => {
      if (savedForm instanceof FormModel) {
        // update last server update to indicate an update has happened
        // send the existing form to prevent updates in the ui based on autosave results
        form.lastServerUpdate = savedForm.lastServerUpdate;

        dispatch(updateModel(form));
        dispatch(updateAutosave(AUTOSAVE_STATUS.FINISHED, savedForm));
      }
    });
};

/**
 * Validates form objects debounced to prevent overloading the (form) service
 * When a form with new errors (or complete) arrives, we send the validations
 * to the current form model where the errors are processed
 * A new form with the new constraints is send to the store
 */
const debouncedAutosave = debounce((dispatch, form: FormModel) => {
  autosave(dispatch, form);
}, VALIDATE_DEBOUNCE_TIMEOUT);

export const autosaveFormObject = (form: FormModel): ThunkAction => (
  dispatch
) => debouncedAutosave(dispatch, form);

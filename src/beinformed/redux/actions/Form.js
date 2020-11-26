// @flow
import { goBack } from "beinformed/redux/actions/Router";
import { updateModel } from "beinformed/redux/actions/ModularUI";
import { logoutSuccess } from "beinformed/redux/actions/SignOut";
import { reloadApplication } from "beinformed/redux/actions/Application";
import {
  startProgress,
  finishProgress,
} from "beinformed/redux/actions/ProgressIndicator";

import Authenticate from "beinformed/modularui/Authenticate";

import type { ThunkAction } from "beinformed/redux";
import type { FormModel } from "beinformed/models";

/**
 * Go back to previous object (back button on form)
 */
export const previousObject = (form: FormModel): ThunkAction => (dispatch) => {
  const newForm = form.clone();

  newForm.setPreviousObject();

  return dispatch(updateModel(newForm));
};

export const cancelForm = (form: FormModel): ThunkAction => (
  dispatch,
  getState
) => {
  if (form.key === "ChangePassword" && getState().auth.mustChangePassword) {
    dispatch(startProgress());
    return new Authenticate().logout().then(() => {
      dispatch(logoutSuccess());
      dispatch(reloadApplication());
      dispatch(finishProgress());

      return dispatch(goBack());
    });
  }

  return dispatch(goBack());
};

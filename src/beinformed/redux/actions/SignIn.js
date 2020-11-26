// @flow
import Cache from "beinformed/utils/browser/Cache";

import Authenticate from "beinformed/modularui/Authenticate";

import { reloadApplication } from "beinformed/redux/actions/Application";

import {
  startProgress,
  finishProgress,
} from "beinformed/redux/actions/ProgressIndicator";
import { push } from "beinformed/redux/actions/Router";
import { CHANGEPASSWORD_PATH } from "beinformed/constants/Constants";
import { get } from "lodash";

import type {
  LoginFailedAction,
  LoginSuccessAction,
  ThunkAction,
} from "beinformed/redux";

/**
 * Send login failed action
 */
export const loginFailed = (errorMessage: string): LoginFailedAction => ({
  type: "AUTHENTICATION_ERROR",
  payload: errorMessage,
});

/**
 * Send login success action
 */
export const loginSuccess = (): LoginSuccessAction => ({
  type: "AUTHENTICATION_SUCCESS",
});

/**
 * Send change password action
 */
export const changePassword = (): ThunkAction => (dispatch, getState) => {
  dispatch({
    type: "CHANGE_PASSWORD",
  });

  const isModal = get(getState().router.location, "state.modal");
  const locationFrom = get(getState().router.location, "state.from");
  return dispatch(
    push(CHANGEPASSWORD_PATH, {
      from: locationFrom ? locationFrom : getState().router.location,
      modal: isModal,
    })
  );
};

export const login = (username: string, password: string): ThunkAction => (
  dispatch
) => {
  dispatch(startProgress());

  return new Authenticate()
    .login(username, password)
    .then(() => dispatch(reloadApplication()))
    .then(() => {
      Cache.addItem("auth", true);
      dispatch(loginSuccess());

      return dispatch(finishProgress());
    })
    .catch((error) => {
      if (error.id === "Error.ChangePasswordRequired") {
        return dispatch(reloadApplication())
          .then(() => {
            Cache.addItem("auth", true);
            return dispatch(changePassword());
          })
          .then(() => dispatch(finishProgress()));
      }

      dispatch(loginFailed(error.id));
      return dispatch(finishProgress());
    });
};

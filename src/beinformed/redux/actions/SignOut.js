// @flow
import Cache from "beinformed/utils/browser/Cache";

import Authenticate from "beinformed/modularui/Authenticate";

import {
  startProgress,
  finishProgress,
} from "beinformed/redux/actions/ProgressIndicator";

import type { LogoutSuccessAction, ThunkAction } from "beinformed/redux";

/**
 * Send logout success action
 */
export const logoutSuccess = (): LogoutSuccessAction => ({
  type: "AUTHENTICATION_LOGOUT",
});

export const logout = (): ThunkAction => (dispatch) => {
  dispatch(startProgress());

  return new Authenticate().logout().then(() => {
    Cache.removeItem("auth");

    dispatch(logoutSuccess());

    return dispatch(finishProgress());
  });
};

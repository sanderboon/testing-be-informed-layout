// @flow
import { LOGOUT_PATH, IS_SERVER } from "beinformed/constants/Constants";

import { ErrorResponse } from "beinformed/models";

import { push } from "beinformed/redux/actions/Router";
import { showXHRErrorNotification } from "beinformed/redux/actions/Notification";
import { resetProgress } from "beinformed/redux/actions/ProgressIndicator";
import { changePassword } from "beinformed/redux/actions/SignIn";
import { handleUnauthorized } from "beinformed/redux/actions/Authorization";

import type { FetchException } from "beinformed/exceptions";
import type { SaveErrorAction, ThunkAction } from "beinformed/redux";

const saveError = (error: Error | FetchException): SaveErrorAction => ({
  type: "SAVE_ERROR",
  payload: error,
});

/**
 * Handle errors by sending an error notification message
 */
export const handleError = (error: Error | FetchException): ThunkAction => (
  dispatch
) => {
  dispatch(resetProgress());

  const errorResponse = new ErrorResponse(error);

  if (
    errorResponse.isResourceNotFoundAfterReload ||
    errorResponse.isRemoteServiceException
  ) {
    return dispatch({ type: "NO_ACTION" });
  }

  if (errorResponse.isUnauthorized) {
    return dispatch(handleUnauthorized(errorResponse));
  }

  if (errorResponse.isBlocked || errorResponse.isConcurrentUser) {
    dispatch(push(LOGOUT_PATH));
  }

  if (errorResponse.isChangePassword) {
    return dispatch(changePassword());
  }

  if (IS_SERVER) {
    return dispatch(saveError(error));
  }

  setTimeout(() => {
    throw error;
  });

  return dispatch(showXHRErrorNotification(errorResponse));
};

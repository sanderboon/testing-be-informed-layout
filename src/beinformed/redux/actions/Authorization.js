// @flow
import { get } from "lodash";

import { LOGIN_PATH, NOTIFICATION_TYPES } from "beinformed/constants/Constants";

import { ErrorResponse } from "beinformed/models";

import { replace } from "beinformed/redux/actions/Router";
import { logoutSuccess } from "beinformed/redux/actions/SignOut";
import { showNotification } from "beinformed/redux/actions/Notification";

import Cache from "beinformed/utils/browser/Cache";

import { reloadModel } from "beinformed/redux/actions/ModularUI";
import { getApplication } from "beinformed/modularui/selectors";

import type { ThunkAction } from "beinformed/redux";

export const handleUnauthorized = (
  errorResponse: ErrorResponse
): ThunkAction => (dispatch, getState) => {
  const application = getApplication(getState());
  if (application) {
    dispatch(reloadModel(application));
  }
  dispatch(logoutSuccess());

  Cache.removeItem("auth");

  if (errorResponse.isInvalidUsername) {
    const WARNING_TIMEOUT = 4000;
    dispatch(
      showNotification(
        NOTIFICATION_TYPES.WARNING,
        {
          id: errorResponse.id,
          defaultMessage: errorResponse.message,
        },
        null,
        WARNING_TIMEOUT
      )
    );
  }

  const locationFrom = get(getState().router.location, "state.from");
  return dispatch(
    replace(LOGIN_PATH, {
      from: locationFrom ? locationFrom : getState().router.location,
      // cannot open login in a modal, because of previous locations that might be secure
      modal: false,
    })
  );
};

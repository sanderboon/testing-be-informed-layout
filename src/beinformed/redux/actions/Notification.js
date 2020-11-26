// @flow
import {
  startProgress,
  finishProgress,
} from "beinformed/redux/actions/ProgressIndicator";

import { getSetting } from "beinformed/constants/Settings";

import { NOTIFICATION_TYPES } from "beinformed/constants/Constants";

import type { DismissNotificationAction, ThunkAction } from "beinformed/redux";
import type { NotificationTypes } from "beinformed/constants";
import type { MessageObject } from "beinformed/i18n";
import type { ErrorResponse, FormModel } from "beinformed/models";

/**
 * Dismiss notification message
 */
export const dismissNotification = (): DismissNotificationAction => ({
  type: "DISMISS_NOTIFICATION",
});

export const showNotification = (
  type: NotificationTypes,
  message: MessageObject,
  error?: ErrorResponse | null,
  timeout?: number
): ThunkAction => (dispatch) => {
  dispatch({
    type: "SHOW_NOTIFICATION",
    payload: {
      type,
      message,
      error,
    },
  });

  if (timeout) {
    setTimeout(() => {
      dispatch(dismissNotification());
    }, timeout);
  }
};

const getNotificationMessageId = (form) => {
  if (form.actiontype === "create") {
    return "Notification.Msg.Create";
  }

  if (form.actiontype === "update") {
    return "Notification.Msg.Update";
  }

  if (form.actiontype === "delete") {
    return "Notification.Msg.Delete";
  }

  return "Notification.Msg.Generic";
};

/**
 * Show form notification
 */
export const showFormNotification = (form: FormModel): ThunkAction => (
  dispatch
) => {
  dispatch(startProgress());

  dispatch(
    showNotification(NOTIFICATION_TYPES.SUCCESS, {
      id: getNotificationMessageId(form),
    })
  );

  setTimeout(() => {
    dispatch(dismissNotification());
  }, getSetting("HIDE_NOTIFICATION_TIMEOUT"));

  return dispatch(finishProgress());
};

/**
 * Show error notification
 */
export const showXHRErrorNotification = (error: ErrorResponse): ThunkAction => (
  dispatch
) =>
  dispatch(
    showNotification(
      NOTIFICATION_TYPES.ERROR,
      {
        id: error.id,
        defaultMessage: error.message,
        parameters: error.properties,
      },
      error
    )
  );

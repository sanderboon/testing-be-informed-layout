// @flow
import type { Reducer } from "redux";
import type { ReduxAction, NotificationState } from "beinformed/redux";

// REDUCER
const initialState: NotificationState = {
  render: false,
  messageType: null,
  message: {
    id: null,
    defaultMessage: null,
    parameters: null,
  },
  error: null,
};

/**
 * Form reducer
 */
const NotificationReducer: Reducer<NotificationState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case "DISMISS_NOTIFICATION":
      return {
        ...state,
        render: false,
      };

    case "SHOW_NOTIFICATION":
      return {
        ...state,
        render: true,
        messageType: action.payload.type,
        message: action.payload.message,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default NotificationReducer;

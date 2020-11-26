// @flow
import type { Reducer } from "redux";
import type { ReduxAction, ErrorState } from "beinformed/redux";

// REDUCER
const initialState: ErrorState = null;

/**
 * Auth reducer
 */
const ErrorReducer: Reducer<ErrorState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (action && action.type === "SAVE_ERROR") {
    return action.payload;
  }

  return state;
};

export default ErrorReducer;

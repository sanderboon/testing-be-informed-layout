// @flow
import type { Reducer } from "redux";
import type { ReduxAction, RouterState } from "beinformed/redux";

// REDUCER
const initialState: $Shape<RouterState> = {};

/**
 * Router reducer
 */
const RouterReducer: Reducer<RouterState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (action && action.type === "ROUTER/LOCATION_CHANGE") {
    return action.payload;
  }

  return state;
};

export default RouterReducer;

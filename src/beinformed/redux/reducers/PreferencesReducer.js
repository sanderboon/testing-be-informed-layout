// @flow
import type { Reducer } from "redux";
import type { ReduxAction, PreferencesState } from "beinformed/redux";

const initialState: $Shape<PreferencesState> = {};

/*
 * Pref reducer
 */
const PreferencesReducer: Reducer<PreferencesState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (action && action.type === "SET_PREFERENCE") {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export default PreferencesReducer;

// @flow
import type { Reducer } from "redux";
import type { ReduxAction, ProgressIndicatorState } from "beinformed/redux";

// REDUCER
const initialState: ProgressIndicatorState = {
  count: 0,
  timestamp: 0,
  percentComplete: 0,
};

const finishProgress = (state) => {
  const isFinalFinish = state.count - 1 === 0;
  return {
    ...state,
    count: state.count <= 0 ? 0 : state.count - 1,
    timestamp: isFinalFinish ? Date.now() : state.timestamp,
    percentComplete: isFinalFinish ? 0 : state.percentComplete,
  };
};

/**
 * Keep state for the progress indicator
 */
const progressIndicatorReducer: Reducer<ProgressIndicatorState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case "UPDATE_PROGRESS":
      return {
        ...state,
        percentComplete: action.percentComplete,
      };

    case "FINISH_PROGRESS":
      return finishProgress(state);

    case "START_PROGRESS":
      return {
        ...state,
        count: state.count + 1,
      };

    case "RESET_PROGRESS":
      return {
        ...state,
        count: 0,
      };

    default:
      return state;
  }
};

export default progressIndicatorReducer;

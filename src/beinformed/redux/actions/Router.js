// @flow
import type { HistoryAction, Location, LocationShape } from "react-router";

import type {
  GoAction,
  GoBackAction,
  GoForwardAction,
  LocationChangeAction,
  PushAction,
  ReplaceAction,
} from "beinformed/redux";

// Action called on location changes, reducer listens to theses actions and updates reducers
export const locationChange = (
  location: Location,
  action: HistoryAction
): LocationChangeAction => ({
  type: "ROUTER/LOCATION_CHANGE",
  payload: {
    location,
    action,
  },
});

// Actions called to navigate, middleware listens to these actions and calls the appropriate history method
export const push = (
  location: LocationShape | string,
  state?: { ... }
): PushAction => ({
  type: "ROUTER/PUSH",
  payload: {
    location,
    state,
  },
});

export const replace = (
  location: LocationShape | string,
  state?: { ... }
): ReplaceAction => {
  return {
    type: "ROUTER/REPLACE",
    payload: {
      location,
      state,
    },
  };
};

export const go = (delta: number): GoAction => ({
  type: "ROUTER/GO",
  payload: {
    delta,
  },
});

export const goBack = (): GoBackAction => ({
  type: "ROUTER/GOBACK",
});

export const goForward = (): GoForwardAction => ({
  type: "ROUTER/GOFORWARD",
});

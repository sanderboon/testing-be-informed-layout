// @flow
import Cache from "beinformed/utils/browser/Cache";

import type { Reducer } from "redux";
import type { AuthState, ReduxAction } from "beinformed/redux";

// REDUCER
const initialState: AuthState = {
  isAuthenticated: false,
  mustChangePassword: false,
  error: null,
};

/**
 * Auth reducer
 */
const AuthReducer: Reducer<AuthState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        mustChangePassword: false,
      };

    case "AUTHENTICATION_ERROR":
      return { ...state, mustChangePassword: false, error: action.payload };

    case "AUTHENTICATION_LOGOUT": {
      // clear cache because of cached contributions
      if (state.isAuthenticated) {
        Cache.clear();
      }

      return {
        ...state,
        mustChangePassword: false,
        isAuthenticated: false,
        error: null,
      };
    }

    case "CHANGE_PASSWORD":
      return {
        ...state,
        isAuthenticated: true,
        mustChangePassword: true,
        error: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;

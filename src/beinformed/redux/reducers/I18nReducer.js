// @flow
import Cache from "beinformed/utils/browser/Cache";
import { setCookie } from "beinformed/utils/browser/Cookies";

import Locales from "beinformed/i18n/Locales";

import type { Reducer } from "redux";
import type { ReduxAction, I18nState } from "beinformed/redux";

const updateLocale = (state, action) => {
  // set locale in cookie
  setCookie("locale", action.payload);

  // clear cache because of cached contributions
  Cache.clear();

  return {
    ...state,
    locale: action.payload,
  };
};

const setLocales = (state, action) => {
  // set locale in cookie
  setCookie("locale", action.payload.locale);

  if (action.payload.locale) {
    return {
      ...state,
      locales: action.payload.locales,
      locale: action.payload.locale,
    };
  }

  return {
    ...state,
    locales: action.payload.locales,
  };
};

// REDUCER
const initialState: I18nState = {
  locales: new Locales(),
  locale: "en",
};

/**
 * Form reducer
 */
const I18nReducer: Reducer<I18nState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case "SET_LOCALES":
      return setLocales(state, action);

    case "UPDATE_LOCALE":
      return updateLocale(state, action);

    default:
      return state;
  }
};

export default I18nReducer;

// @flow
import {
  startProgress,
  finishProgress,
} from "beinformed/redux/actions/ProgressIndicator";

import type { Locales } from "beinformed/i18n";
import type {
  SetLocalesAction,
  ReceiveLocaleAction,
  ThunkAction,
} from "beinformed/redux";

/**
 * Update current locale
 */
export const receiveLocale = (locale: string): ReceiveLocaleAction => ({
  type: "UPDATE_LOCALE",
  payload: locale,
});

/**
 * Change locale of application and redirect
 */
export const updateLocale = (locale: string): ThunkAction => (dispatch) => {
  dispatch(startProgress());
  dispatch(receiveLocale(locale));

  dispatch(finishProgress());
};

export const setLocales = (
  locales: Locales,
  locale: ?string
): SetLocalesAction => ({
  type: "SET_LOCALES",
  payload: {
    locales,
    locale,
  },
});

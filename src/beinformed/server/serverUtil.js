// @flow
import { createMemoryHistory } from "history";
import { has, isString } from "lodash";

import createStore from "beinformed/redux/configureStore";

import { availableLocales, default as Locales } from "beinformed/i18n/Locales";

import { getPreferredLocale } from "beinformed/server/requestInformation";
import { setLocales } from "beinformed/redux/actions/Locales";

import {
  setServerPreference,
  setThemePreference,
  setPreference,
} from "beinformed/redux/actions/Preferences";

import { getSetting } from "beinformed/constants/Settings";

import type { LocaleConfiguration } from "beinformed/i18n";
import type { ReduxStore } from "beinformed/redux";
import type { Href } from "beinformed/models";

// redux
const createReduxStore = (requestHref: Href, customReducers: Object) => {
  const history = createMemoryHistory({
    initialEntries: [requestHref.toString()],
  });

  // $FlowFixMe: history api does not match react-router api
  const { store } = createStore(history, customReducers);

  return store;
};

// locales - both
const setI18n = (
  store: ReduxStore,
  locales?: Array<Object>,
  request: HttpServletRequestJava
) => {
  const availLocales = locales || availableLocales;
  const enabledLocales = availLocales.filter((locale: LocaleConfiguration) =>
    getSetting("ENABLED_LOCALES").includes(locale.code)
  );

  const localesInstance = new Locales(enabledLocales);
  const preferredLocale = getPreferredLocale(request, localesInstance);
  store.dispatch(setLocales(localesInstance, preferredLocale));
};

// server prefs - both
const setServerPreferences = (
  store: ReduxStore,
  serverPreferences: Array<string>
) => {
  serverPreferences.forEach((serverPreference) => {
    store.dispatch(setServerPreference(serverPreference));
  });

  if (
    preferencesProvider &&
    preferencesProvider.isStudioContext &&
    preferencesProvider.isStudioContext()
  ) {
    store.dispatch(setPreference("isStudioContext", true));
  }
};

// theme -- both
const setConfigurationTheme = (store: ReduxStore) => {
  let configTheme = null;

  const configFileLocation = preferencesProvider.getLayoutConfigFileLocation();
  if (isString(configFileLocation)) {
    const configFilePath = configFileLocation.startsWith("/")
      ? `/resource${configFileLocation}`
      : `/resource/${configFileLocation}`;

    configTheme = dataFetcher.fetch(configFilePath);

    if (configTheme) {
      store.dispatch(setThemePreference(configTheme));
    } else {
      throw new Error(
        `Could not read theme configuration file from: ${configFilePath}`
      );
    }
  }
};

// error handling
const handleErrors = (store: ReduxStore) => {
  const state = store.getState();

  if (
    state.error &&
    (state.error.shouldThrowOnServer ||
      !has(state.error, "shouldThrowOnServer"))
  ) {
    throw state.error;
  }
};

const dehydrate = (store: ReduxStore) => {
  const state = store.getState();

  const filteredState = {
    ...state,
    modularui: Object.keys(state.modularui).reduce((obj, key) => {
      obj[key] = {
        status: state.modularui[key].status,
        model: state.modularui[key].model
          ? state.modularui[key].model.dehydrate()
          : void 0,
      };

      return obj;
    }, {}),
  };

  return JSON.stringify(filteredState).replace(/</g, "\\u003c");
};

const createHead = (sheet: any, UUID: string, helmetContext?: Object) => {
  const style = sheet.getStyleTags();
  const meta = helmetContext ? [...helmetContext.helmet.meta] : [];

  if (helmetContext) {
    return {
      ...helmetContext.helmet,
      style,
      meta,
    };
  }

  return {
    style,
    meta,
  };
};

export {
  createReduxStore,
  setI18n,
  setServerPreferences,
  setConfigurationTheme,
  createHead,
  handleErrors,
  dehydrate,
};

// @flow
import { isPlainObject } from "lodash";

import { JsonParseException } from "beinformed/exceptions";
import { setSettings } from "beinformed/constants/Settings";

import type { SetPreferenceAction } from "beinformed/redux";

export const setServerPreference = (
  propertyName: string,
  defaultValue: ?string = null
): SetPreferenceAction => {
  let value = null;
  if (preferencesProvider) {
    value = preferencesProvider.getPreferenceByName(propertyName);
  }

  return {
    type: "SET_PREFERENCE",
    payload: {
      [propertyName]: value || defaultValue,
    },
  };
};

export const setPreference = (
  propertyName: string,
  propertyValue: ?string | ?boolean = null
): SetPreferenceAction => ({
  type: "SET_PREFERENCE",
  payload: {
    [propertyName]: propertyValue,
  },
});

export const setThemePreference = (
  configTheme: ?string
): SetPreferenceAction => {
  let themeData = {};

  try {
    themeData = configTheme ? JSON.parse(configTheme) : null;
  } catch (error) {
    throw new JsonParseException(`Theme file contains invalid JSON: ${error}`);
  }

  if (themeData && isPlainObject(themeData)) {
    setSettings(themeData.settings);
  }

  return setPreference("theme", themeData);
};

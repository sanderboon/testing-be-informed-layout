// @flow
import { isFunction, isPlainObject, isString, flattenDeep } from "lodash";

import { setSettings } from "beinformed/constants/Settings";

import DefaultTheme from "beinformed/theme/DefaultTheme/DefaultTheme.json";
import createDefaultTheme from "beinformed/theme/DefaultTheme/createDefaultTheme";

const replaceAssignments = (inputTheme) => {
  const possibleKeys = Object.keys(inputTheme).join("|");

  const re = new RegExp(`\\$(${possibleKeys})`, "g");
  Object.entries(inputTheme).forEach(([key, value]) => {
    if (isString(value)) {
      inputTheme[key] = value.replace(
        re,
        (match, capture) => inputTheme[capture]
      );
    }
  });

  return inputTheme;
};

const generateTheme = (...themeElements: Array<Function | Object>) => {
  return (
    themeElements
      // Make sure we're only working with objects and functions
      .filter(
        (themeConfig) => isFunction(themeConfig) || isPlainObject(themeConfig)
      )
      .reduce((accumulator, current) => {
        // when current element is a function,
        // use the previous generated theme config as input for the function
        const themeElement = isFunction(current)
          ? current(accumulator)
          : { ...current, ...accumulator };

        // replace any assignments inside the theme
        return replaceAssignments(themeElement);
      }, void 0)
  );
};

const createTheme = (...themeConfigs: Array<Function | Object>) => {
  const customTheme = generateTheme(...flattenDeep(themeConfigs));
  const defaultTheme = generateTheme(
    customTheme,
    DefaultTheme,
    createDefaultTheme
  );

  if (customTheme) {
    setSettings(customTheme.settings);
  }

  return {
    ...defaultTheme,
    ...customTheme,
  };
};

export default createTheme;

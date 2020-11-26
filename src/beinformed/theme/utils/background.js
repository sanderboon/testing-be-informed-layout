// @flow
import { isString } from "lodash";
import { getThemeProp } from "./themeProps";

const renderBackground = (
  path: string | Array<string>,
  defaultValue?: any
) => ({ theme = {} }: { theme: Object }) => {
  const value = getThemeProp(theme, path, defaultValue);

  if (isString(value)) {
    return `background: ${value}`;
  }

  return value;
};

export { renderBackground };

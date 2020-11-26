// @flow

import { get } from "lodash";

const getThemeProp = (
  theme: Object = {},
  path?: string | Array<string> = "",
  defaultValue?: any = ""
) => (path === "" ? defaultValue : get(theme, path, defaultValue));

/*
 * Retrieve property value from theme property of styled component
 */
const themeProp = (
  path: string | Array<string>,
  defaultValue?: any
) => (props: { theme: Object }) =>
  getThemeProp(props.theme, path, defaultValue);

export { getThemeProp, themeProp };

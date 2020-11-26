// @flow

/*
 * Themed color x amount darkened
 */
import { darken, hsl, lighten, parseToHsl } from "polished";
import { getThemeProp } from "./themeProps";

const darkenColor = (
  amount: number,
  path: string | Array<string>,
  defaultValue?: any
) => ({ theme = {} }: { theme: Object }) =>
  darken(amount, getThemeProp(theme, path, defaultValue));

/*
 * Themed color x amount lightened
 */
const lightenColor = (
  amount: number,
  path: string | Array<string>,
  defaultValue?: any
) => ({ theme = {} }: { theme: Object }) =>
  lighten(amount, getThemeProp(theme, path, defaultValue));

/*
 * Make a color lighter or darker in the same color family
 */
const changeHSL = (
  color: string,
  saturation: number,
  lightness: number,
  hueAdjustment?: number = 0
) => hsl(parseToHsl(color).hue + hueAdjustment, saturation, lightness);

export { darkenColor, lightenColor, changeHSL };

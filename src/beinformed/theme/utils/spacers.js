// @flow
import { isString } from "lodash";

const getSize = (
  theme: Object = {},
  ratio: number | string = 1,
  path: string = "SPACER",
  unit: string = "rem"
) => (isString(ratio) ? ratio : `${ratio * theme[path]}${unit}`);

/*
 * Render spacers based on the given ratio * theme SPACER
 */
const spacer = (ratio: number = 1) => ({ theme = {} }: { theme: Object }) =>
  getSize(theme, ratio);

/*
 * Render spacers based on the given ratio * theme SPACER
 *
 * Ratio's can be given clockwise with shorthand,
 * spacers(0.5, 1) with a spacer of 0.8 will give "0.4rem 1rem";
 */
const spacers = (...ratios: Array<number | string>) => ({
  theme = {},
}: {
  theme: Object,
}) => ratios.map((ratio) => getSize(theme, ratio)).join(" ");

/*
 * Render a gutter based on GUTTER property
 */
const gutter = (ratio: number = 1) => ({ theme = {} }: { theme: Object }) =>
  getSize(theme, ratio, "GRID_GUTTER", "px");

export { spacer, spacers, gutter };

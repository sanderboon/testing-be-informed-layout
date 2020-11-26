// @flow
import { isPlainObject } from "lodash";

import { getLuminance, parseToRgb } from "polished";
import { getThemeProp } from "./themeProps";

const getColorContrast = (color1: string, color2: string) => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  return parseFloat(
    (luminance1 > luminance2
      ? (luminance1 + 0.05) / (luminance2 + 0.05)
      : (luminance2 + 0.05) / (luminance1 + 0.05)
    ).toFixed(2)
  );
};

/*
 * The YIQ equation converts the RGB color (0 to 255) into a YIQ color space.
 * YIQ is the standard formula for calculating the perceived brightness of a color,
 * and is recommended by the World Wide Web Consortium (W3C).
 */
const getYIQ = (color: string) => {
  const rgb = parseToRgb(color);

  return (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000;
};

const getContrastYIQ = (
  color: string,
  dark: string = "#212529",
  light: string = "#fff",
  preferredColor?: string
) => {
  const yiqColor = getYIQ(color);

  if (preferredColor && getColorContrast(color, preferredColor) >= 4.5) {
    return preferredColor;
  }

  const darkColor = getYIQ(dark) < 127.5 ? dark : "#212529";
  const lightColor = getYIQ(light) > 127.5 ? light : "#fff";

  if (yiqColor > 127.5) {
    if (getColorContrast(color, darkColor) < 3) {
      return "#212529";
    }

    return darkColor;
  }

  if (getColorContrast(color, lightColor) < 3) {
    return "#fff";
  }
  return lightColor;
};

const renderContrastColor = (
  bgColorProperty: string,
  prevertColorProperty?: string,
  standardDarkProperty?: string = "YIQ_DARK_COLOR",
  standardLightProperty?: string = "YIQ_LIGHT_COLOR"
) => ({ theme = {} }: { theme: Object }) => {
  const bgColor = getThemeProp(theme, bgColorProperty, "#fff");
  const prevertColor = getThemeProp(theme, prevertColorProperty);
  const darkColor = getThemeProp(theme, standardDarkProperty, "#212529");
  const lightColor = getThemeProp(theme, standardLightProperty, "#fff");

  if (isPlainObject(bgColor) && bgColor.backgroundColor) {
    return getContrastYIQ(
      bgColor.backgroundColor,
      darkColor,
      lightColor,
      prevertColor
    );
  }

  return getContrastYIQ(bgColor, darkColor, lightColor, prevertColor);
};

export { getColorContrast, getYIQ, getContrastYIQ, renderContrastColor };

// @flow
import { getThemeProp } from "./themeProps";

/*
 * Border radius based on the theme setting for rounded corners
 */
const roundedCorners = (
  property?: string = "border-radius",
  path: string | Array<string> = "BORDER_RADIUS",
  defaultValue?: string = "0.25rem"
) => ({ theme = {} }: { theme: Object }): string => {
  if (theme.ROUNDED_CORNERS) {
    const propertyName =
      property && property !== "border-radius"
        ? `border-${property}-radius`
        : "border-radius";

    return `${propertyName}: ${getThemeProp(theme, path, defaultValue)}`;
  }

  return "";
};

export { roundedCorners };

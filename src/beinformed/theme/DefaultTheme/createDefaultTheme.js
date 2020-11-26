// @flow
import { darken, lighten } from "polished/lib/index";
import { getContrastYIQ } from "beinformed/theme/utils";

export const getButtonColor = (name: string, color: string) => ({
  [`${name}_BG`]: color,
  [`${name}_BORDER_COLOR`]: color,
  [`${name}_COLOR`]: getContrastYIQ(color),
  [`${name}_HOVER_BG`]: darken(0.075, color),
  [`${name}_HOVER_BORDER_COLOR`]: darken(0.1, color),
  [`${name}_HOVER_COLOR`]: getContrastYIQ(darken(0.075, color)),
  [`${name}_ACTIVE_BG`]: darken(0.1, color),
  [`${name}_ACTIVE_BORDER_COLOR`]: darken(0.125, color),
  [`${name}_ACTIVE_COLOR`]: getContrastYIQ(darken(0.1, color)),
  [`${name}_DISABLED_BG`]: color,
  [`${name}_DISABLED_BORDER_COLOR`]: color,
  [`${name}_DISABLED_COLOR`]: getContrastYIQ(color),
});

const createDefaultTheme = (
  themeProps: Object = {
    PRIMARY_COLOR: "#0065d1",
    SECONDARY_COLOR: "#6c757d",
    DANGER_COLOR: "#dc3545",

    GREY_300: "#dee2e6",
    BODY_COLOR: "#212529",
  }
) => ({
  ...themeProps,

  LINK_HOVER_COLOR: darken(0.15, themeProps.PRIMARY_COLOR),

  ...getButtonColor("BUTTON_DEFAULT", themeProps.BUTTON_DEFAULT_BG),
  ...getButtonColor("BUTTON_PRIMARY", themeProps.PRIMARY_COLOR),
  ...getButtonColor("BUTTON_SECONDARY", themeProps.SECONDARY_COLOR),
  ...getButtonColor("BUTTON_DANGER", themeProps.DANGER_COLOR),

  INPUT_FOCUS_BORDER_COLOR: lighten(0.25, themeProps.PRIMARY_COLOR),

  PAGING_HOVER_COLOR: darken(0.15, themeProps.PRIMARY_COLOR),
});

export default createDefaultTheme;

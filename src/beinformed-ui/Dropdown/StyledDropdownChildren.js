// @flow
import styled, { css } from "styled-components";
import { themeProp, spacers, roundedCorners } from "beinformed/theme/utils";

const StyledDropdownChildren = styled.div`
  position: absolute;
  ${({ verticalAlign }) => (verticalAlign === "up" ? `bottom` : `top`)}: 100%;
  ${({ align }) => (align === "right" ? `right` : `left`)}: 0;
  z-index: 1000;
  min-width: ${({ minWidth }) => minWidth || "10rem"};
  white-space: ${({ wrapContent }) => (wrapContent ? "normal" : "nowrap")};

  padding: ${spacers(0.5, 0)};
  ${({ verticalAlign }) =>
    verticalAlign === "up"
      ? css`
          margin: ${spacers(0, 0, 0, 0.125)};
        `
      : css`
          margin: ${spacers(0.125, 0, 0)};
        `};
  font-size: ${({ size }) =>
    size === "small"
      ? themeProp("SMALL_FONT_SIZE", "80%")
      : themeProp("FONT_SIZE_BASE", "1rem")};
  color: ${themeProp("DROPDOWN_COLOR", "#212529")};
  text-align: left;
  list-style: none;
  background-color: ${themeProp("DROPDOWN_BG", "#fff")};
  background-clip: padding-box;
  border: 1px solid ${themeProp("DROPDOWN_BORDER_COLOR", "#fff")};
  ${roundedCorners()};

  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}px`};
  overflow-y: auto;
`;

StyledDropdownChildren.displayName = "BI.StyledDropdownChildren";

export default StyledDropdownChildren;

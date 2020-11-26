// @flow
import styled, { css } from "styled-components";
import {
  themeProp,
  spacers,
  renderContrastColor,
} from "beinformed/theme/utils";

const StyledDropdownItem = styled.div`
  display: block;
  padding: ${spacers(0.25, 1.5)};
  font-weight: 400;
  color: ${themeProp("DROPDOWN_LINK_COLOR")};
  text-align: inherit;

  background-color: transparent;
  border: 0;
  cursor: default;

  &:focus,
  &:hover {
    color: ${renderContrastColor("DROPDOWN_LINK_HOVER_BG")};
    text-decoration: none;
    background-color: ${themeProp("DROPDOWN_LINK_HOVER_BG")};
  }

  &:active {
    color: ${renderContrastColor("DROPDOWN_LINK_ACTIVE_BG")};
    text-decoration: none;
    background-color: ${themeProp("DROPDOWN_LINK_ACTIVE_BG")};
  }

  &:disabled {
    color: ${themeProp("DROPDOWN_LINK_DISABLED_COLOR")};
    pointer-events: none;
    background-color: ${themeProp("DROPDOWN_LINK_DISABLED_BG")};
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${themeProp("DROPDOWN_LINK_DISABLED_COLOR")};
      pointer-events: none;
      background-color: ${themeProp("DROPDOWN_LINK_DISABLED_BG")};
    `};
`;

StyledDropdownItem.displayName = "BI.StyledDropdownItem";

export default StyledDropdownItem;

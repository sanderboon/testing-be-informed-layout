// @flow

import styled, { css } from "styled-components";

import { themeProp, roundedCorners } from "beinformed/theme/utils";

const Input = styled.input`
  display: block;
  height: calc(2.25rem + 2px);
  padding: ${themeProp("INPUT_PADDING", ".375rem .75rem")};
  font-size: ${themeProp("INPUT_FONT_SIZE", "1rem")};
  font-weight: ${themeProp("INPUT_FONT_WEIGHT", "400")};
  line-height: ${themeProp("INPUT_LINE_HEIGHT", 1.5)};
  color: ${themeProp("INPUT_COLOR", "#495057")};
  background-color: ${themeProp("INPUT_BG", "#fff")};
  background-clip: padding-box;
  border: ${themeProp("INPUT_BORDER_WIDTH", "1px")} solid
    ${themeProp("INPUT_BORDER_COLOR", "#ced4da")};
  transition: border-color ${themeProp("BORDER_TRANSITION_DURATION")},
    box-shadow ${themeProp("BORDER_TRANSITION_DURATION")};

  ${({ hasPrepend }) =>
    !hasPrepend &&
    css`
      ${roundedCorners("top-left", "INPUT_BORDER_RADIUS")};
      ${roundedCorners("bottom-left", "INPUT_BORDER_RADIUS")};
    `};

  ${({ hasAppend }) =>
    !hasAppend &&
    css`
      ${roundedCorners("top-right", "INPUT_BORDER_RADIUS")};
      ${roundedCorners("bottom-right", "INPUT_BORDER_RADIUS")};
    `};

  position: relative;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;

  &:hover {
    border-color: ${themeProp("INPUT_HOVER_BORDER_COLOR")};
  }

  &:focus {
    color: ${themeProp("INPUT_FOCUS_COLOR", "#495057")};
    background-color: ${themeProp("INPUT_FOCUS_BG", "#fff")};
    border-color: ${themeProp("INPUT_FOCUS_BORDER_COLOR", "#80bdff")};
    z-index: 3;
  }

  &::placeholder {
    color: ${themeProp("INPUT_PLACEHOLDER_COLOR", "#6c757d")};
    opacity: 1;
  }

  &:disabled,
  &[readonly] {
    background-color: ${themeProp("INPUT_DISABLED_BG", "#e9ecef")};
    opacity: 1;
  }

  ${(props) =>
    props.inError &&
    css`
      border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
      &:focus {
        border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
      }
    `};
`;

Input.displayName = "BI.Input";

export default Input;

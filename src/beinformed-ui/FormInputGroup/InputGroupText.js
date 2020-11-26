// @flow
import styled, { css } from "styled-components";
import { roundedCorners, themeProp, spacers } from "beinformed/theme/utils";

const InputGroupText = styled.span`
  display: flex;
  align-items: center;
  padding: ${spacers(0.375, 0.75)};
  margin-bottom: 0;
  font-size: ${themeProp("FONT_SIZE_BASE", "1rem")};
  font-weight: 400;
  line-height: 1.5;
  color: ${themeProp("INPUT_ADDON_COLOR", "#495057")};
  text-align: center;
  white-space: nowrap;
  background-color: ${themeProp("INPUT_ADDON_BG", "#e9ecef")};
  border: 1px solid ${themeProp("INPUT_ADDON_BORDER_COLOR", "#ced4da")};

  ${({ isPrepend }) =>
    isPrepend &&
    css`
      &:first-child {
        ${roundedCorners("top-left")};
        ${roundedCorners("bottom-left")};
      }
    `};

  ${({ isAppend }) =>
    isAppend &&
    css`
      &:last-child {
        ${roundedCorners("top-right")};
        ${roundedCorners("bottom-right")};
      }
    `};
`;

InputGroupText.displayName = "BI.InputGroupText";

export default InputGroupText;

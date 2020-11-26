// @flow
import styled, { css } from "styled-components";
import { themeProp, roundedCorners } from "beinformed/theme/utils";

import { Link } from "_component-registry/link";

const PagingButton = styled(Link)`
  display: block;
  height: 100%;
  font-size: ${themeProp("FONT_SIZE_SMALL")};

  padding: ${themeProp("PAGING_PADDING")};
  margin-left: -1px;
  line-height: 1.25rem;

  color: ${themeProp("PAGING_COLOR")};
  background-color: ${themeProp("PAGING_BG")};
  border: 1px solid ${themeProp("PAGING_BORDER_COLOR")};

  ${({ isFirst }) =>
    isFirst &&
    css`
      ${roundedCorners("top-left")};
      ${roundedCorners("bottom-left")};
    `};

  ${({ isLast }) =>
    isLast &&
    css`
      ${roundedCorners("top-right")};
      ${roundedCorners("bottom-right")};
    `};

  &:focus,
  &:hover {
    text-decoration: none;
  }

  &:active {
    color: ${themeProp("PAGING_ACTIVE_COLOR")};
    background-color: ${themeProp("PAGING_ACTIVE_BG")};
    border: 1px solid ${themeProp("PAGING_ACTIVE_BORDER_COLOR")};
  }

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${themeProp("PAGING_ACTIVE_COLOR")};
          background-color: ${themeProp("PAGING_ACTIVE_BG")};
          border: 1px solid ${themeProp("PAGING_ACTIVE_BORDER_COLOR")};

          &:hover {
            color: ${themeProp("PAGING_ACTIVE_COLOR")};
          }
        `
      : css`
          &:hover {
            color: ${themeProp("PAGING_HOVER_COLOR")};
            background-color: ${themeProp("PAGING_HOVER_BG")};
            border: 1px solid ${themeProp("PAGING_HOVER_BORDER_COLOR")};
          }
        `};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${themeProp("PAGING_DISABLED_COLOR")};
      background-color: ${themeProp("PAGING_DISABLED_BG")};
      border: 1px solid ${themeProp("PAGING_DISABLED_BORDER_COLOR")};
    `};
`;

PagingButton.displayName = "BI.PagingButton";

export default PagingButton;

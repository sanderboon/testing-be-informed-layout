// @flow
import styled, { css } from "styled-components";

import { transitions } from "polished";

import {
  themeProp,
  getThemeProp,
  roundedCorners,
} from "beinformed/theme/utils";

const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;

  ${({ asBlock }) =>
    asBlock &&
    css`
      display: block;
      width: 100%;
    `};

  ${({ size = "DEFAULT" }) => {
    const btnSize = size.toUpperCase();
    return css`
      padding: ${themeProp(`BUTTON_${btnSize}_PADDING`, "0.375rem 0.75rem")};
      font-size: ${themeProp(`BUTTON_${btnSize}_FONT_SIZE`, "1rem")};
      line-height: ${themeProp(`BUTTON_${btnSize}_LINE_HEIGHT`, "1.5")};
      ${roundedCorners("border-radius", `BUTTON_${btnSize}_BORDER_RADIUS`)};
    `;
  }};

  ${({ theme }) =>
    transitions(
      ["color", "background-color", "border-color", "box-shadow"],
      getThemeProp(theme, "BUTTON_TRANSITION_DURATION")
    )};

  ${({ buttonStyle = "DEFAULT", isOutlineButton }) => {
    const btnStyle = `BUTTON_${buttonStyle.toUpperCase()}`;

    if (btnStyle === "BUTTON_LINK") {
      return css`
        background: transparent;

        &:focus {
          outline: 0;
          border: 1px dotted ${themeProp("PRIMARY_COLOR")};
        }
      `;
    }

    if (isOutlineButton) {
      return css`
        color: ${themeProp(`${btnStyle}_BG`)};
        background-color: #fff;
        border-color: ${themeProp(`${btnStyle}_BORDER_COLOR`)};

        &:hover {
          color: ${themeProp(`${btnStyle}_COLOR`)};
          background-color: ${themeProp(`${btnStyle}_BG`)};
          border-color: ${themeProp(`${btnStyle}_BORDER_COLOR`)};
          text-decoration: none;
        }

        &:focus,
        &:active {
          color: ${themeProp(`${btnStyle}_COLOR`)};
          background-color: ${themeProp(`${btnStyle}_BG`)};
          border-color: ${themeProp(`${btnStyle}_BORDER_COLOR`)};
        }

        ${(props) =>
          props.isActive &&
          css`
            color: ${themeProp(`${btnStyle}_COLOR`)};
            background-color: ${themeProp(`${btnStyle}_BG`)};
            border-color: ${themeProp(`${btnStyle}_BORDER_COLOR`)};
          `}
      `;
    }

    return css`
      color: ${themeProp(`${btnStyle}_COLOR`)};
      background-color: ${themeProp(`${btnStyle}_BG`)};
      border-color: ${themeProp(`${btnStyle}_BORDER_COLOR`)};

      &:hover {
        color: ${themeProp(`${btnStyle}_HOVER_COLOR`)};
        background-color: ${themeProp(`${btnStyle}_HOVER_BG`)};
        border-color: ${themeProp(`${btnStyle}_HOVER_BORDER_COLOR`)};
        text-decoration: none;
      }

      &:disabled {
        color: ${themeProp(`${btnStyle}_DISABLED_COLOR`)};
        background-color: ${themeProp(`${btnStyle}_DISABLED_BG`)};
        border-color: ${themeProp(`${btnStyle}_DISABLED_BORDER_COLOR`)};

        opacity: 0.6;
      }

      ${(props) =>
        props.isDisabled &&
        css`
          color: ${themeProp(`${btnStyle}_DISABLED_COLOR`)};
          background-color: ${themeProp(`${btnStyle}_DISABLED_BG`)};
          border-color: ${themeProp(`${btnStyle}_DISABLED_BORDER_COLOR`)};

          opacity: 0.6;
        `}

      &:focus,
      &:active {
        color: ${themeProp(`${btnStyle}_ACTIVE_COLOR`)};
        background-color: ${themeProp(`${btnStyle}_ACTIVE_BG`)};
        border-color: ${themeProp(`${btnStyle}_ACTIVE_BORDER_COLOR`)};
      }

      ${(props) =>
        props.isActive &&
        css`
          color: ${themeProp(`${btnStyle}_ACTIVE_COLOR`)};
          background-color: ${themeProp(`${btnStyle}_ACTIVE_BG`)};
          border-color: ${themeProp(`${btnStyle}_ACTIVE_BORDER_COLOR`)};
        `}
    `;
  }};

  &:not(:disabled) {
    cursor: pointer;
  }
`;

Button.defaultProps = {
  type: "button",
};

export default Button;

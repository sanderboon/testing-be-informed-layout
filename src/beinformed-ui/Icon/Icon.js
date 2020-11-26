// @flow
import classNames from "classnames";
import MDIIcon from "@mdi/react";

import styled, { css, keyframes } from "styled-components";
import { spacer } from "beinformed/theme/utils";

import "./Icon.scss";

export type Props = {
  +name?: string,
  +path?: string,
  +className?: string,
  +ariaLabel?: string,
  +ariaHidden?: boolean,
  +title?: string,
  +size?: number | string | 18 | 24 | 36 | 48,
  +rotate?: 45 | 90 | 135 | 180 | 225 | 270 | 315,
  +flip?: "horizontal" | "vertical",
  +spin?: boolean,
  +textAfter?: boolean,
  +textBefore?: boolean,
  +onClick?: Function,
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const StyledIcon = styled.span`
  ${(props) =>
    props.textAfter &&
    css`
      margin-right: ${spacer(0.25)};
    `};
  ${(props) =>
    props.textBefore &&
    css`
      margin-left: ${spacer(0.25)};
    `};
`;

const StyledSVGIcon = styled(StyledIcon)`
  display: inline-flex;
  align-self: center;

  > svg {
    width: ${({ size }) => size || spacer()};
    height: ${({ size }) => size || spacer()};
    fill: currentColor;

    ${({ textBefore, textAfter }) =>
      (textBefore || textAfter) &&
      css`
        top: 0.125em;
        position: relative;
      `}
  }
`;

const StyledFontIcon = styled(StyledIcon)`
  &:before {
    display: inline-block;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-variant-east-asian: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: inherit;
    line-height: inherit;
    font-family: "Material Design Icons", serif;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    ${({ size }) =>
      size &&
      `
        font-size: ${size}px;
      `}
    ${({ flip }) =>
      flip === "horizontal" &&
      `
        transform: scaleX(-1);
        filter: FlipH;
      `}
    ${({ flip }) =>
      flip === "vertical" &&
      `
        transform: scaleY(-1);
        filter: FlipV;
      `}
    ${({ spin }) =>
      spin &&
      css`
        animation: ${spinAnimation} 2s infinite linear;
      `}
    ${({ rotate }) =>
      rotate &&
      css`
        transform: rotate(${rotate}deg);
      `}
  }
`;

const Icon = ({
  className,
  name = "",
  path,
  ariaLabel,
  ariaHidden,
  title,
  flip,
  textBefore,
  textAfter,
  size,
  rotate,
  spin,
  onClick,
}: Props) => {
  if (path) {
    return (
      <StyledSVGIcon
        className={classNames("icon", className)}
        isPath
        size={size}
        textBefore={textBefore}
        textAfter={textAfter}
        onClick={onClick}
      >
        <MDIIcon
          path={path}
          size={size}
          horizontal={flip && flip === "horizontal"}
          vertical={flip && flip === "vertical"}
          rotate={rotate}
          spin={spin}
          aria-label={ariaLabel}
          aria-hidden={ariaHidden}
          title={title}
        />
      </StyledSVGIcon>
    );
  }

  const iconClass = classNames(className, "icon", `mdi-${name}`);

  return (
    <StyledFontIcon
      className={iconClass}
      size={size}
      flip={flip}
      spin={spin}
      rotate={rotate}
      textBefore={textBefore}
      textAfter={textAfter}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      title={title}
      onClick={onClick}
    />
  );
};

Icon.displayName = "BI.Icon";

export default Icon;

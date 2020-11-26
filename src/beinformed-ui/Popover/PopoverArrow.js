// @flow
import { forwardRef } from "react";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { spacers, themeProp } from "beinformed/theme/utils";

const StyledPopoverArrow = styled.div`
  position: absolute;
  display: block;
  width: 1rem;
  height: 0.5rem;
  margin: ${spacers(0, 0.3)};

  &::before,
  &::after {
    position: absolute;
    display: block;
    content: "";
    border-color: transparent;
    border-style: solid;
  }

  ${(props) =>
    props.placement === "top" &&
    css`
      bottom: -0.5rem;

      &::before,
      &::after {
        border-width: 0.5rem 0.5rem 0;
      }

      &::before {
        bottom: 0;
        border-top-color: ${themeProp("POPOVER_BORDER_COLOR")};
      }

      &::after {
        bottom: 1px;
        border-top-color: ${themeProp("POPOVER_ARROW_BG")};
      }
    `}

  ${(props) =>
    props.placement === "right" &&
    css`
      left: -0.5rem;
      width: 0.5rem;
      height: 1rem;
      margin: 0.3rem 0;

      &::before,
      &::after {
        border-width: 0.5rem 0.5rem 0.5rem 0;
      }

      &::before {
        left: 0;
        border-right-color: ${themeProp("POPOVER_BORDER_COLOR")};
      }

      &::after {
        left: 1px;
        border-right-color: ${themeProp("POPOVER_ARROW_BG")};
      }
    `}
  
  ${(props) =>
    props.placement === "bottom" &&
    css`
      top: -0.5rem;

      &::before,
      &::after {
        border-width: 0 0.5rem 0.5rem 0.5rem;
      }

      &::before {
        top: 0;
        border-bottom-color: ${themeProp("POPOVER_BORDER_COLOR")};
      }

      &::after {
        top: 1px;
        border-bottom-color: ${themeProp("POPOVER_ARROW_BG")};
      }
    `}
  
    ${(props) =>
    props.placement === "left" &&
    css`
      right: -0.5rem;
      width: 0.5rem;
      height: 1rem;
      margin: 0.3rem 0;

      &::before,
      &::after {
        border-width: 0.5rem 0 0.5rem 0.5rem;
      }

      &::before {
        right: 0;
        border-left-color: ${themeProp("POPOVER_BORDER_COLOR")};
      }

      &::after {
        right: 1px;
        border-left-color: ${themeProp("POPOVER_ARROW_BG")};
      }
    `}
`;

export type Props = {
  +className?: string,
  +placement: string,
  +style: Object,
};

const PopoverArrow = forwardRef<Props, typeof StyledPopoverArrow>(
  ({ className, placement, style }: Props, ref) => (
    <StyledPopoverArrow
      ref={ref}
      className={classNames(className, "popover-arrow")}
      data-placement={placement}
      placement={placement}
      style={style}
    />
  )
);
PopoverArrow.displayName = "BI.PopoverArrow";

export default PopoverArrow;

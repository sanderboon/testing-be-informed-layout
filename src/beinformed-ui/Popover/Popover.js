// @flow
import { forwardRef } from "react";

import classNames from "classnames";
import styled from "styled-components";
import {
  themeProp,
  roundedCorners,
  spacer,
  renderBackground,
  renderContrastColor,
} from "beinformed/theme/utils";

import { PopoverArrow } from "_component-registry/popover";

export type Props = {
  +children?: Node,
  +className?: string,

  +arrowProps: {
    ref: { current?: ?HTMLElement },
    style: CSSStyleDeclaration,
  },
  +style: any,

  +placement:
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end",

  +BodyComponent?: any,
  +ArrowComponent?: any,
};

const StyledPopover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  display: block;
  max-width: ${themeProp("POPOVER_MAX_WIDTH", "476px")};
  min-width: 276px;

  font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};

  word-wrap: break-word;
  white-space: normal;

  ${renderBackground("POPOVER_BG")};
  color: ${renderContrastColor("POPOVER_BG")};
  border: 1px solid ${themeProp("POPOVER_BORDER_COLOR")};

  background-clip: padding-box;

  ${roundedCorners("border-radius", "BORDER_RADIUS_LARGE", "0.3rem")};

  a {
    color: inherit;
    text-decoration: underline;
  }

  a:focus,
  a:hover {
    text-decoration: underline;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const StyledPopoverBody = styled.div`
  padding: ${spacer(1.4)};
`;

const Popover = forwardRef<Props, typeof StyledPopover>(
  (
    {
      children,
      className,
      placement = "right",
      style,
      arrowProps,
      BodyComponent = StyledPopoverBody,
      ArrowComponent = PopoverArrow,
    }: Props,
    ref
  ) => (
    <StyledPopover
      ref={ref}
      className={classNames("popover", className)}
      style={style}
      placement={placement.split("-")[0]}
      data-placement={placement}
    >
      <BodyComponent className="popover-content">{children}</BodyComponent>
      <ArrowComponent
        ref={arrowProps && arrowProps.ref}
        placement={placement.split("-")[0]}
        style={arrowProps && arrowProps.style}
      />
    </StyledPopover>
  )
);

Popover.displayName = "BI.Popover";

export default Popover;

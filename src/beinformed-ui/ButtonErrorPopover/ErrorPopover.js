// @flow
import { forwardRef } from "react";
import styled, { css } from "styled-components";

import {
  themeProp,
  renderBackground,
  renderContrastColor,
} from "beinformed/theme/utils";

import { FormErrors } from "_component-registry/form";
import { Popover, PopoverArrow } from "_component-registry/popover";

import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,

  +arrowProps: {
    ref: { current?: ?HTMLElement },
    style: CSSStyleDeclaration,
  },
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
  +style: CSSStyleDeclaration,
  +form: FormModel,
};

const StyledPopover = styled(Popover)`
  ${renderBackground("POPOVER_ERROR_BG")};
  border: 1px solid ${themeProp("POPOVER_ERROR_BORDER_COLOR")};
  color: ${renderContrastColor("POPOVER_ERROR_BG")};

  a {
    text-decoration: none;
  }
`;

const StyledArrow = styled(PopoverArrow)`
  ${({ placement }) => {
    switch (placement) {
      case "top":
        return css`
          &::before {
            border-top-color: ${themeProp("POPOVER_ERROR_BORDER_COLOR")};
          }
          &::after {
            border-top-color: ${themeProp("POPOVER_ERROR_ARROW_BG")};
          }
        `;
      case "right":
        return css`
          &::before {
            border-right-color: ${themeProp("POPOVER_ERROR_BORDER_COLOR")};
          }
          &::after {
            border-right-color: ${themeProp("POPOVER_ERROR_ARROW_BG")};
          }
        `;
      case "bottom":
        return css`
          &::before {
            border-bottom-color: ${themeProp("POPOVER_ERROR_BORDER_COLOR")};
          }
          &::after {
            border-bottom-color: ${themeProp("POPOVER_ERROR_ARROW_BG")};
          }
        `;
      case "left":
        return css`
          &::before {
            border-left-color: ${themeProp("POPOVER_ERROR_BORDER_COLOR")};
          }
          &::after {
            border-left-color: ${themeProp("POPOVER_ERROR_ARROW_BG")};
          }
        `;
      default:
        return "";
    }
  }};
`;

const ErrorPopover = forwardRef<Props, typeof StyledPopover>(
  ({ className, placement, form, ...props }: Props, ref) => (
    <StyledPopover
      ref={ref}
      className={className}
      {...props}
      placement={placement || "auto"}
      ArrowComponent={StyledArrow}
    >
      <FormErrors form={form} />
    </StyledPopover>
  )
);

ErrorPopover.displayName = "BI.ErrorPopover";

export default ErrorPopover;

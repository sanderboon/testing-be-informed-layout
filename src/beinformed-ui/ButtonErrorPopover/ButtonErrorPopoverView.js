// @flow
import { forwardRef } from "react";
import { Manager, Popper, Reference } from "react-popper";

import styled from "styled-components";
import { roundedCorners } from "beinformed/theme/utils";

import { Button } from "_component-registry/buttons";
import { ErrorPopover } from "_component-registry/button-error-popover";

import type { Node } from "react";
import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +buttonStyle?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "DANGER" | "LINK",
  +children?: Node,
  +form: FormModel,
  +name: string,
  +type?: "button" | "submit" | "reset",
  +show: boolean,
  +isDisabled?: boolean,
  +onMouseEnter: Function,
  +onMouseLeave: Function,
  +onFocus: Function,
  +onBlur: Function,
  +onClick: Function,
  +onKeyDown: Function,
};

const StyledWrapper = styled.span`
  z-index: 999;
  display: inline-block;
  ${roundedCorners()}
`;

const ButtonErrorPopoverView = forwardRef<Props, typeof StyledWrapper>(
  (
    {
      className,
      form,
      type,
      name,
      buttonStyle,
      children,
      show = false,
      isDisabled = false,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      onKeyDown,
    }: Props,
    wrapperRef
  ) => (
    <StyledWrapper
      ref={wrapperRef}
      tabIndex="0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Manager>
        <Reference>
          {({ ref }) => (
            <Button
              ref={ref}
              type={type}
              name={name}
              className={className}
              buttonStyle={buttonStyle}
              disabled={isDisabled || !form.isValid}
              onClick={onClick}
              onKeyDown={onKeyDown}
            >
              {children}
            </Button>
          )}
        </Reference>
        {form.hasErrors() && show && (
          <Popper
            placement="top-end"
            modifiers={[{ name: "offset", options: { offset: [0, 10] } }]}
          >
            {(props: {
              ref: { current?: ?HTMLElement },
              arrowProps: {
                ref: { current?: ?HTMLElement },
                style: CSSStyleDeclaration,
              },
              placement:
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
              style: CSSStyleDeclaration,
            }) => (
              <ErrorPopover
                ref={props.ref}
                arrowProps={props.arrowProps}
                placement={props.placement || "auto"}
                style={props.style}
                form={form}
              />
            )}
          </Popper>
        )}
      </Manager>
    </StyledWrapper>
  )
);

ButtonErrorPopoverView.displayName = "BI.ButtonErrorPopoverView";

export default ButtonErrorPopoverView;

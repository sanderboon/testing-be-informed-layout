// @flow
import { forwardRef } from "react";

import classNames from "classnames";

import { KEYCODES } from "beinformed/constants/Constants";
import { StyledDropdownItem } from "_component-registry/dropdown";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +children?: Node,
  +className?: string,
  +id?: string,
  +style?: any,
  +value?: string,
  +disabled?: boolean,
  +onClick: Function,
  +onKeyUp?: Function,
};

/**
 * Render dropdown item
 */
const DropdownItem = forwardRef<Props, typeof StyledDropdownItem>(
  (
    {
      className,
      style,
      id,
      value,
      ariaLabel,
      disabled,
      onClick,
      onKeyUp,
      children,
    }: Props,
    ref
  ) => (
    <StyledDropdownItem
      ref={ref}
      className={classNames("dropdown-item", className)}
      style={style}
      tabIndex="0"
      data-id={id}
      data-value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      role="option"
      onClick={(e) => onClick(value, e)}
      onKeyUp={(e) => {
        if ([KEYCODES.SPACE, KEYCODES.ENTER].includes(e.keyCode)) {
          e.preventDefault();

          return onClick(e);
        }

        return onKeyUp ? onKeyUp(e) : true;
      }}
    >
      {children}
    </StyledDropdownItem>
  )
);

DropdownItem.displayName = "BI.DropdownItem";

export default DropdownItem;

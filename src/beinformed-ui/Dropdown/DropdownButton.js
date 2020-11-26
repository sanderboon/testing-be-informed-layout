// @flow
import { forwardRef } from "react";
import { mdiChevronDown } from "@mdi/js";

import { Button } from "_component-registry/buttons";
import { Icon } from "_component-registry/icon";
import classNames from "classnames";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +children?: Node,
  +className?: string,
  +buttonStyle?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "DANGER" | "LINK",
  +isOutlineButton?: boolean,
  +id?: string,
  +isExpanded?: boolean,
  +renderToggleIcon?: boolean,
  +disabled?: boolean,
  +size?: "small" | "large" | "default",
  +onClick?: Function,
  +onFocus?: (e: SyntheticMouseEvent<*>) => void,
  +onBlur?: (e: SyntheticMouseEvent<*>) => void,
};

/**
 * Render dropdown button
 */
const DropdownButton = forwardRef<Props, typeof Button>(
  (
    {
      ariaLabel,
      children,
      className,
      buttonStyle,
      id,
      isExpanded,
      renderToggleIcon = true,
      size,
      disabled,
      isOutlineButton = false,
      onClick,
      onFocus,
      onBlur,
    }: Props,
    ref
  ) => (
    <Button
      ref={ref}
      className={classNames("dropdown-toggle", className)}
      buttonStyle={buttonStyle}
      dataId={id}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={isExpanded}
      data-toggle="dropdown"
      aria-label={ariaLabel}
      size={size}
      disabled={disabled}
      isOutlineButton={isOutlineButton}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
      {renderToggleIcon && (
        <Icon
          className="dropdown-toggle-icon"
          path={mdiChevronDown}
          textBefore
        />
      )}
    </Button>
  )
);

DropdownButton.displayName = "BI.DropdownButton";

export default DropdownButton;

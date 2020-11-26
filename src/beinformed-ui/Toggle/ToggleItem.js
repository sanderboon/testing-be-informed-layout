// @flow
import classNames from "classnames";

import { StyledButton } from "_component-registry/elements";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +children?: Node,
  +className?: string,
  +isActive?: boolean,
  +name: string,
  +value: string,
  +onChange: (value: string) => void,
};

/**
 * Render a toggle item
 */
const ToggleItem = ({
  ariaLabel,
  children,
  className,
  isActive,
  name,
  value,
  onChange,
}: Props) => {
  const htmlFor = `${name}-${value}-toggle`;

  return (
    <StyledButton
      className={classNames("toggle-item", className)}
      size="small"
      data-value={value}
      htmlFor={htmlFor}
      isActive={isActive}
      aria-pressed={isActive}
      aria-label={ariaLabel}
      onClick={() => onChange(value)}
    >
      {children}
    </StyledButton>
  );
};

ToggleItem.displayName = "BI.ToggleItem";

export default ToggleItem;

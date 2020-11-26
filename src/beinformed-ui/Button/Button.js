// @flow
import { forwardRef, type Node } from "react";

import { Icon } from "_component-registry/icon";
import { StyledButton } from "_component-registry/elements";

export type Props = {
  +innerRef?: any,
  +ariaLabel?: string,
  +"aria-label"?: string,
  +"aria-expanded"?: boolean,
  +"aria-haspopup"?: string,
  +"data-toggle"?: string,
  +buttonStyle?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "DANGER" | "LINK",
  +isOutlineButton?: boolean,
  +children?: Node,
  +className?: string,
  +dataId?: string,
  +disabled?: boolean,
  +name?: string,
  +icon?: string,
  +isIconButton?: boolean,
  +asBlock?: boolean,
  +size?: "small" | "large" | "default",
  +type?: "button" | "submit" | "reset",
  +value?: string,
  +onBlur?: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  +onClick?: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  +onFocus?: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  +onMouseEnter?: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  +onMouseLeave?: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  +onMouseOver?: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<HTMLButtonElement>) => void,
};

/**
 * Render a generic button
 */
const Button = forwardRef<Props, typeof StyledButton>((props: Props, ref) => {
  const {
    ariaLabel,
    dataId,
    children,
    icon,
    isIconButton,
    ...buttonProps
  } = props;

  return (
    <StyledButton
      ref={ref}
      {...buttonProps}
      data-id={dataId}
      aria-label={ariaLabel || buttonProps["aria-label"]}
    >
      {icon && (
        <Icon name={icon} textAfter={Boolean(children) && !isIconButton} />
      )}
      {children}
    </StyledButton>
  );
});

Button.displayName = "BI.Button";

export default Button;

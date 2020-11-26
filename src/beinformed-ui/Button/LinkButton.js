// @flow
import { forwardRef } from "react";

import { StyledButton } from "_component-registry/elements";
import { Link } from "_component-registry/link";

import type { Node } from "react";
import type { Href } from "beinformed/models";
export type Props = {
  +ariaLabel?: string,
  +buttonStyle?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "DANGER" | "LINK",
  +isOutlineButton?: boolean,
  +children?: Node,
  +icon?: string,
  +className?: string,
  +isDisabled?: boolean,
  +isActive?: boolean,
  +href: Href,
  +dataId?: string,
  +size?: "small" | "large" | "default",
  +onBlur?: (e: SyntheticEvent<*>) => void,
  +onClick?: (href: Href) => void,
  +onEnter?: (e: SyntheticEvent<*>) => void,
  +onFocus?: (e: SyntheticEvent<*>) => void,
  +onLeave?: (e: SyntheticEvent<*>) => void,
};

const LinkButton = forwardRef<Props, typeof StyledButton>(
  ({ href, isDisabled, ...props }: Props, ref) =>
    isDisabled ? (
      <StyledButton ref={ref} disabled data-id={props.dataId} {...props} />
    ) : (
      <StyledButton ref={ref} as={Link} href={href} {...props} />
    )
);

LinkButton.displayName = "BI.LinkButton";

export default LinkButton;

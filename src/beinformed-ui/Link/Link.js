// @flow
import { forwardRef } from "react";

import styled, { css } from "styled-components";
import { themeProp, spacers } from "beinformed/theme/utils";

import { Icon } from "_component-registry/icon";

import ReactRouterLink from "./ReactRouterLink";
import { DisabledLink } from "_component-registry/link";

import type { Node } from "react";
import type { Href } from "beinformed/models";
export type Props = {
  +ariaLabel?: string,
  +children?: Node,
  +className?: string,
  +dataId?: string | number,
  +href: Href,
  +title?: string,
  +icon?: string,
  +isActive?: boolean,
  +isSelected?: boolean,
  +isDisabled?: boolean,
  +isButton?: boolean,
  +isNavLink?: boolean,
  +isModal?: boolean,
  +style?: Object,
  +value?: string,
  +onBlur?: (e: SyntheticEvent<*>) => void,
  +onClick?: (href: Href) => void,
  +onEnter?: (e: SyntheticEvent<*>) => void,
  +onFocus?: (e: SyntheticEvent<*>) => void,
  +onLeave?: (e: SyntheticEvent<*>) => void,
};

const StyledLink = styled(ReactRouterLink)`
  ${(props) =>
    props.isNavLink &&
    css`
      display: block;
      padding: ${spacers(0.5, 1)};
    `};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${themeProp("LINK_DISABLED_COLOR", "#6c757d")};
    `};
`;

const Link = forwardRef<Props, typeof StyledLink>(
  (
    {
      className,
      isNavLink,
      isDisabled,
      isButton,
      icon,
      children,
      isActive,
      onEnter,
      onLeave,
      onFocus,
      onBlur,
      ...props
    }: Props,
    ref
  ) => {
    let asComponent = void 0;
    if (isDisabled) {
      asComponent = DisabledLink;
    }

    return (
      <StyledLink
        ref={ref}
        className={className}
        as={asComponent}
        isNavLink={isNavLink}
        isDisabled={isDisabled}
        isActive={isActive}
        role={isButton && "button"}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      >
        {icon && <Icon name={icon} textAfter={Boolean(children)} />}
        {children}
      </StyledLink>
    );
  }
);

Link.displayName = "BI.Link";

export default Link;

// @flow
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";

import { KEYCODES } from "beinformed/constants/Constants";
import { Href } from "beinformed/models";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +className?: string,
  +dataId?: string | number,
  +href: Href,
  +title?: string,
  +isActive?: boolean,
  +isModal?: boolean,
  +style?: Object,
  +value?: string,
  +children: Node,
  +role?: string,
  +onClick?: (href: Href) => void,
  +onBlur?: (e: SyntheticEvent<*>) => void,
  +onFocus?: (e: SyntheticEvent<*>) => void,
  +onMouseEnter?: (e: SyntheticEvent<*>) => void,
  +onMouseLeave?: (e: SyntheticEvent<*>) => void,
};

const getLocation = (href: Href | string, isModal?: boolean) => {
  if (href instanceof Href) {
    const toLocation = href.toLocation();
    toLocation.state = {
      ...toLocation.state,
      modal: isModal || get(toLocation, "state.modal", false),
    };
    return toLocation;
  }

  if (isModal) {
    return {
      pathname: href,
      state: {
        modal: isModal,
      },
    };
  }

  return href;
};

const ReactRouterLink = forwardRef<Props, *>(
  (
    {
      className,
      style,
      href,
      title,
      ariaLabel,
      isModal,
      isActive,
      value,
      dataId,
      children,
      role,
      onClick,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      ...otherAttributes
    }: Props,
    ref
  ) => {
    if (!href) {
      console.info("ReactRouterLink is missing href property");
      return null;
    }

    const handleClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
      if (onClick) {
        e.preventDefault();
        onClick(href);
      }
    };

    const handleKeyDown = (e: SyntheticKeyboardEvent<HTMLAnchorElement>) => {
      if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
        handleClick(e);
      }
    };

    const allowedOtherAttributes = {};
    for (const attributeKey in otherAttributes) {
      if (attributeKey.startsWith("aria") || attributeKey.startsWith("data-")) {
        allowedOtherAttributes[attributeKey] = otherAttributes[attributeKey];
      }
    }

    return (
      <Link
        ref={ref}
        className={className}
        to={getLocation(href, isModal)}
        title={title}
        aria-label={ariaLabel}
        aria-current={isActive}
        data-value={value}
        data-id={dataId}
        style={style}
        role={role}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...allowedOtherAttributes}
      >
        {children}
      </Link>
    );
  }
);

ReactRouterLink.displayName = "BI.ReactRouterLink";

export default ReactRouterLink;

// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, roundedCorners } from "beinformed/theme/utils";

import { withPathname } from "beinformed/connectors/Router";

import { Link } from "_component-registry/link";

import { Href } from "beinformed/models";

import type { LinkModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +isActive?: boolean,
  +isTab?: boolean,
  +link: LinkModel,
  +pathname: string,
};

const StyledTabItem = styled.li`
  ${(props) => props.isTab && `margin-bottom: -1px;`}
`;

const StyledLink = styled(Link)`
  ${({ isTab, isActive }) =>
    isTab &&
    css`
      border: 1px solid transparent;

      ${roundedCorners("top-left")};
      ${roundedCorners("top-right")};
      height: 100%;

      &:hover,
      &:focus {
        border-color: ${themeProp("GREY_200", "#e9ecef")}
          ${themeProp("GREY_200", "#e9ecef")}
          ${themeProp("GREY_300", "#dee2e6")};
      }

      ${isActive &&
      css`
        color: ${themeProp("GREY_700", "#495057")};
        background-color: #fff;
        border-color: ${themeProp("GREY_300", "#dee2e6")}
          ${themeProp("GREY_300", "#dee2e6")} #fff;
      `};
    `};
`;

/**
 * Navigation item
 */
const NavigationItem = ({
  className,
  isActive = false,
  isTab = false,
  link,
  pathname,
}: Props) => {
  const isActiveLink = isActive || new Href(pathname).startsWith(link.href);

  return (
    <StyledTabItem
      className={classNames("nav-item", className, {
        active: isActiveLink,
      })}
      isTab={isTab}
      isActive={isActiveLink}
    >
      <StyledLink
        dataId={link.key}
        href={link.href}
        isActive={isActiveLink}
        isTab={isTab}
        icon={link.icon}
        isNavLink
      >
        {link.label}
      </StyledLink>
    </StyledTabItem>
  );
};

NavigationItem.displayName = "BI.NavigationItem";

export default withPathname(NavigationItem);

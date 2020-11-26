// @flow
import classNames from "classnames";
import styled from "styled-components";

import { NavigationItem } from "_component-registry/navigation";

import type { LinkModel, LinkCollection } from "beinformed/models";
export type Props = {
  +activeLink?: LinkModel,
  +className?: string,
  +items: LinkCollection,
};

const StyledNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`;

/**
 * Navigation
 */
const Navigation = ({ activeLink, className, items }: Props) => (
  <StyledNav className={classNames("nav", className)}>
    {items.map((link, idx) => (
      <NavigationItem
        key={`${link.key}-${idx}` || idx}
        link={link}
        isActive={link.isActive(activeLink)}
      />
    ))}
  </StyledNav>
);

Navigation.displayName = "BI.Navigation";

export default Navigation;

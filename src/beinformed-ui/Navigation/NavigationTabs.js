// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { NavigationItem } from "_component-registry/navigation";

import type { LinkCollection } from "beinformed/models";

export type Props = {
  +className?: string,
  +items: LinkCollection,
};

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: ${spacer()};
  list-style: none;
  border-bottom: 1px solid ${themeProp("GREY_300", "#dee2e6")};
`;


/**
 * Navigation tabs
 */
const NavigationTabs = ({ className, items }: Props) => (
  <StyledList className={classNames("nav-tabs", className)}>
    {items.map((link) => (
      <NavigationItem key={link.key} link={link} isTab />
    ))} 
  </StyledList>

);

NavigationTabs.displayName = "BI.NavigationTabs";

export default NavigationTabs;

// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacers } from "beinformed/theme/utils";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +children?: Node,
};

const StyledNavbar = styled.nav`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: ${spacers(0.5, 1)};
`;

const NavigationBar = ({ className, children }: Props) => (
  <StyledNavbar className={classNames("nav-bar", className)}>
    {children}
  </StyledNavbar>
);

NavigationBar.displayName = "BI.NavigationBar";

export default NavigationBar;

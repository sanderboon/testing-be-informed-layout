// @flow
import classNames from "classnames";
import styled from "styled-components";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
};

const StyledFooter = styled.div`
  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;
/**
 * render panel footer
 */
const PanelFooter = ({ children, className }: Props) => (
  <StyledFooter className={classNames("panel-footer", className)}>
    {children}
  </StyledFooter>
);

PanelFooter.displayName = "BI.PanelFooter";

export default PanelFooter;

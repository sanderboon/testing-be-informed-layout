// @flow
import classNames from "classnames";
import styled from "styled-components";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +children?: Node,
  +className?: string,
};

const StyledToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

/**
 * Render a button group
 */
const ButtonToolbar = ({ ariaLabel, children, className }: Props) => (
  <StyledToolbar
    className={classNames("btn-toolbar", className)}
    role="toolbar"
    aria-label={ariaLabel}
  >
    {children}
  </StyledToolbar>
);

ButtonToolbar.displayName = "BI.ButtonToolbar";

export default ButtonToolbar;

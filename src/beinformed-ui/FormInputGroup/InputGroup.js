// @flow
import styled from "styled-components";
import classNames from "classnames";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
};

const StyledGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

/**
 * Render List group header
 */
const InputGroup = ({ children, className }: Props) => (
  <StyledGroup className={classNames("input-group", className)}>
    {children}
  </StyledGroup>
);

InputGroup.displayName = "BI.InputGroup";

export default InputGroup;

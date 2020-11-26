// @flow
import { forwardRef } from "react";

import styled from "styled-components";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
};

const StyledTable = styled.table`
  width: 100%;
  min-width: 300px;
  border-collapse: collapse;
  margin-bottom: 0;
  font-size: 0.8rem;
`;

/**
 * Render date field
 */
const DatepickerTable = forwardRef<Props, typeof StyledTable>(
  ({ className, onKeyDown, children }: Props, ref) => (
    <StyledTable
      ref={ref}
      className={className}
      role="grid"
      tabIndex="0"
      onKeyDown={onKeyDown}
    >
      {children}
    </StyledTable>
  )
);
DatepickerTable.displayName = "BI.DatepickerTable";

export default DatepickerTable;

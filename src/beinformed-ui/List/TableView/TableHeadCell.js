// @flow
import classNames from "classnames";

import { StyledTableHeadCell } from "_component-registry/list";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +dataId?: string,
  +children?: Node,
  +minWidth?: string,
  +width?: string,
  +align?: string,
};

/**
 * Render an HTML table
 */
const TableHeadCell = ({
  className,
  dataId,
  children,
  minWidth,
  width,
  align,
}: Props) => (
  <StyledTableHeadCell
    className={classNames("table-cell", className)}
    data-id={dataId}
    role="columnheader"
    align={align}
    cellWidth={width}
    cellMinWidth={minWidth}
  >
    {children}
  </StyledTableHeadCell>
);

TableHeadCell.displayName = "BI.TableHeadCell";

export default TableHeadCell;

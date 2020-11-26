// @flow
import classNames from "classnames";

import {
  TableHeadCell,
  TableHeadCellSortable,
  StyledTableHead,
} from "_component-registry/list";

import type { ListModel } from "beinformed/models";

export type Props = {
  +className?: string,
  +list: ListModel,
  +cellWidth?: string,
  +cellMinWidth?: string,
  +isSelectable?: boolean,
  +onSortChange?: Function,
  +children?: any,
};

/**
 * Render an HTML table
 */
const TableHead = ({
  className,
  list,
  cellWidth,
  cellMinWidth,
  isSelectable = false,
  onSortChange,
  children,
}: Props) => {
  const getAlignment = (header) => {
    if (
      ["number", "money"].includes(header.type) &&
      !header.layouthint.has("align-")
    ) {
      return "right";
    }

    return header.alignment;
  };

  return (
    <StyledTableHead
      className={classNames("table-header", className)}
      role="row"
    >
      {isSelectable && <TableHeadCell width="40px">&nbsp;</TableHeadCell>}

      {list.headers.map((header) => {
        if (header.hasSorting() && !list.hasGrouping()) {
          return (
            <TableHeadCellSortable
              key={`headercell--${header.key}`}
              header={header}
              align={getAlignment(header)}
              width={cellWidth}
              minWidth={cellMinWidth}
              listHref={list.selfhref}
              onClick={onSortChange}
            >
              {header.label}
            </TableHeadCellSortable>
          );
        }

        return (
          <TableHeadCell
            key={`headercell--${header.key}`}
            dataId={header.key}
            align={getAlignment(header)}
            width={cellWidth}
            minWidth={cellMinWidth}
          >
            {header.label}
          </TableHeadCell>
        );
      })}

      {children}
    </StyledTableHead>
  );
};

TableHead.displayName = "BI.TableHead";

export default TableHead;

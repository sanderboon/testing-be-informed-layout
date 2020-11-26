// @flow
import classNames from "classnames";

import {
  StyledTableHeadCell,
  TableHeadSortIcon,
  TableHeadCell,
} from "_component-registry/list";

import { Link } from "_component-registry/link";
import { useTranslate } from "beinformed/i18n";

import type { Node } from "react";
import type { ListHref, ListHeaderModel } from "beinformed/models";
export type Props = {
  +children?: Node,
  +className?: string,
  +minWidth?: string,
  +width?: string,
  +align?: string,
  +listHref: ListHref,
  +header: ListHeaderModel,
  +onClick?: Function,
};

/**
 * Render an HTML table
 */
const TableHeadCellSortable = ({
  className,
  minWidth,
  width,
  align,
  children,
  listHref,
  header,
  onClick,
}: Props) => {
  const translate = useTranslate();

  if (!header.hasSorting()) {
    return (
      <TableHeadCell
        className={className}
        minWidth={minWidth}
        width={width}
        align={align}
      >
        {children}
      </TableHeadCell>
    );
  }

  const classNameString = classNames("table-cell", className);

  const sortOption = header.sortOption;
  const href = header.sortOption.getHref(listHref);

  const ariaDirection = translate(
    `Sorting.Direction.${sortOption.oppositeDirection}`,
    `${sortOption.oppositeDirection}ending`
  );
  const ariaLabel = translate(
    "TableView.Header.SortBy",
    "Sort by {LABEL}: {DIRECTION}",
    {
      LABEL: sortOption.label,
      DIRECTION: ariaDirection,
    }
  );
  const ariaSort = sortOption.selected ? sortOption.sortorder + "ending" : null;

  return (
    <StyledTableHeadCell
      as={Link}
      className={classNameString}
      data-id={header.key}
      href={href}
      cellWidth={width}
      cellMinWidth={minWidth}
      aria-sort={ariaSort}
      aria-label={ariaLabel}
      role="columnheader"
      align={align}
      onClick={onClick}
    >
      {children}
      {sortOption.selected && (
        <TableHeadSortIcon sortorder={sortOption.sortorder} />
      )}
    </StyledTableHeadCell>
  );
};

TableHeadCellSortable.displayName = "BI.TableHeadCellSortable";

export default TableHeadCellSortable;

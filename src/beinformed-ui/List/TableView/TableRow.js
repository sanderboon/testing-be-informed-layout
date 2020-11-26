// @flow
import { isUndefined } from "lodash";

import classNames from "classnames";

import {
  BaseListItem,
  TableCell,
  StyledTableRow,
} from "_component-registry/list";

import { getListItemHref } from "../_util";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +item: ListItemModel,
  +cellWidth: string,
  +cellMinWidth: string,
  +selectType?: "single" | "multi",
  +isSelected: boolean,
  +querystring?: string,
  +openListItemInCaseView?: boolean,
  +onSelect?: Function,
  +isLookup?: boolean,
  +alternativeBackground?: boolean,
};

/**
 * Render an HTML table row
 */
const TableRow = ({
  className,
  list,
  item,
  selectType,
  isSelected,
  querystring,
  openListItemInCaseView,
  isLookup,
  onSelect,
  cellWidth,
  cellMinWidth,
  alternativeBackground = false,
}: Props) => {
  const { titleAttribute } = item;
  const isSelectable = !isUndefined(selectType) && Boolean(onSelect);

  const href = isLookup
    ? null
    : getListItemHref(list, item, querystring, openListItemInCaseView);

  return (
    <StyledTableRow
      as={BaseListItem}
      className={classNames("table-row", className)}
      isSelectable={isSelectable}
      list={list}
      item={item}
      selectType={selectType}
      querystring={querystring}
      openListItemInCaseView={openListItemInCaseView}
      isLookup={isLookup}
      isSelected={isSelected}
      onSelect={onSelect}
      role="row"
      alternativeBackground={alternativeBackground}
    >
      {list.headers.map((header) => {
        const attribute = item.getAttributeByKey(header.key);
        return (
          <TableCell
            key={`${item.id}--${header.key}`}
            width={cellWidth}
            minWidth={cellMinWidth}
            attribute={attribute}
            href={href}
            renderAsLink={!titleAttribute || attribute.equals(titleAttribute)}
          />
        );
      })}
    </StyledTableRow>
  );
};

TableRow.displayName = "BI.TableRow";

export default TableRow;

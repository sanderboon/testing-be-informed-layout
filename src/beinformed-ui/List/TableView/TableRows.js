// @flow
import classNames from "classnames";

import { withQuerystring } from "beinformed/connectors/Router";

import { TableRow, StyledTableRows } from "_component-registry/list";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +openListItemInCaseView: boolean,
  +selectType?: "single" | "multi",
  +selectedItems: Array<ListItemModel>,
  +onItemSelect?: Function,
  +querystring: string,
  +isLookup: boolean,
  +cellWidth: string,
  +cellMinWidth: string,
};

/**
 * Render an HTML table rows
 */
const TableRows = ({
  className,
  list,
  openListItemInCaseView = false,
  selectType,
  selectedItems = [],
  onItemSelect,
  querystring,
  isLookup,
  cellWidth,
  cellMinWidth,
}: Props) => (
  <StyledTableRows
    className={classNames("table-rows", className)}
    role="rowgroup"
  >
    {list.listItemCollection.map((item, index) => (
      <TableRow
        key={`${list.key}-${item.id}`}
        list={list}
        item={item}
        selectType={selectType}
        isSelected={selectedItems.some((selectedItem) =>
          selectedItem.equals(item)
        )}
        querystring={querystring}
        openListItemInCaseView={openListItemInCaseView}
        onSelect={onItemSelect}
        isLookup={isLookup}
        cellWidth={cellWidth}
        cellMinWidth={cellMinWidth}
        alternativeBackground={index % 2 !== 0}
      />
    ))}
  </StyledTableRows>
);

TableRows.displayName = "BI.TableRows";

export default withQuerystring(TableRows);

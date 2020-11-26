// @flow
import { isUndefined } from "lodash";

import {
  TableHead,
  TableRows,
  StyledTableWrapper,
  StyledTable,
} from "_component-registry/list";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +openListItemInCaseView: boolean,
  +selectType?: "single" | "multi",
  +selectedItems?: Array<ListItemModel>,
  +onItemSelect?: Function,
  +onSortChange?: Function,
  +isLookup?: boolean,
};

const TableView = ({
  className,
  list,
  openListItemInCaseView = false,
  selectType,
  selectedItems = [],
  onItemSelect,
  onSortChange,
  isLookup,
}: Props) => {
  const isSelectable = !isUndefined(selectType);

  const headerCount = isSelectable
    ? list.headers.length + 1
    : list.headers.length;

  const TABLE_WIDTH_PERCENTAGE = 100;
  const TABLE_MIN_CELL_WIDTH = 125;
  const TABLE_BORDER_WIDTH = 2;
  const tableCellWidth = TABLE_WIDTH_PERCENTAGE / headerCount;
  const tableMinWidth =
    list.headers.length * TABLE_MIN_CELL_WIDTH + TABLE_BORDER_WIDTH;

  return (
    <StyledTableWrapper className={className}>
      <StyledTable
        className="table"
        role="table"
        minWidth={`${tableMinWidth}px`}
      >
        <TableHead
          list={list}
          cellMinWidth={`${TABLE_MIN_CELL_WIDTH}px`}
          cellWidth={`${tableCellWidth}px`}
          isSelectable={isSelectable}
          onSortChange={onSortChange}
        />
        <TableRows
          list={list}
          cellMinWidth={`${TABLE_MIN_CELL_WIDTH}px`}
          cellWidth={`${tableCellWidth}px`}
          selectType={selectType}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
          isLookup={isLookup}
          openListItemInCaseView={openListItemInCaseView}
          role="rowgroup"
        />
      </StyledTable>
    </StyledTableWrapper>
  );
};

TableView.displayName = "BI.TableView";

export default TableView;

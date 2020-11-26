// @flow
import classNames from "classnames";

import { withQuerystring } from "beinformed/connectors/Router";

import { InboxRow, StyledTableRows } from "_component-registry/list";

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
};

const InboxRows = ({
  className,
  list,
  openListItemInCaseView = false,
  selectType,
  selectedItems = [],
  onItemSelect,
  querystring,
  isLookup,
}: Props) => (
  <StyledTableRows
    className={classNames("table-rows", className)}
    role="rowgroup"
  >
    {list.listItemCollection.map((item) => (
      <InboxRow
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
      />
    ))}
  </StyledTableRows>
);

InboxRows.displayName = "BI.InboxRows";

export default withQuerystring(InboxRows);

// @flow
import {
  InboxHead,
  InboxRows,
  StyledTableWrapper,
  StyledTable,
} from "_component-registry/list";
import { isUndefined } from "lodash";

import type { ListItemModel, ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +openListItemInCaseView: boolean,
  +selectType?: "single" | "multi",
  +selectedItems?: Array<ListItemModel>,
  +onItemSelect?: Function,
  +isLookup?: boolean,
};

const InboxView = ({
  className,
  list,
  openListItemInCaseView = false,
  selectType,
  selectedItems = [],
  onItemSelect,
  isLookup,
}: Props) => {
  const isSelectable = !isUndefined(selectType);
  return (
    <StyledTableWrapper className={className}>
      <StyledTable className="table inbox" role="table">
        <InboxHead list={list} isSelectable={isSelectable} />
        <InboxRows
          list={list}
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

InboxView.displayName = "BI.InboxView";

export default InboxView;

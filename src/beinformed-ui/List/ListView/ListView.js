// @flow
import classNames from "classnames";
import styled from "styled-components";

import { withQuerystring } from "beinformed/connectors/Router";

import { ListItem } from "_component-registry/list";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +openListItemInCaseView?: boolean,
  +selectType?: "single" | "multi",
  +selectedItems?: Array<ListItemModel>,
  +onItemSelect?: Function,
  +querystring: string,
  +isLookup?: boolean,
};

const StyledListGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
`;

/**
 * Render HTML list
 */
const ListView = ({
  className,
  list,
  openListItemInCaseView = false,
  selectType,
  selectedItems = [],
  onItemSelect,
  querystring,
  isLookup,
}: Props) => (
  <StyledListGroup className={classNames("list-group-items", className)}>
    {list.listItemCollection.map((item) => (
      <ListItem
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
  </StyledListGroup>
);

ListView.displayName = "BI.ListView";

export default withQuerystring(ListView);

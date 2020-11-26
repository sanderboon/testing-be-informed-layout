// @flow
import classNames from "classnames";

import {
  ListMainHeader,
  ListMainBody,
  ListMainFooter,
} from "_component-registry/list";
import { Column } from "_component-registry/grid";
import { FormRoute } from "_component-registry/routes";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +isRoot?: boolean,
  +list: ListModel,
  +selectedItems: Array<ListItemModel>,
  +getView: Function,
  +availableViews: Array<Object>,
  +viewType: string,
  +onViewTypeChange: Function,
};

const ListMainView = ({
  className,
  isRoot,
  list,
  selectedItems,
  getView,
  availableViews,
  viewType,
  onViewTypeChange,
}: Props) => {
  const { key, paging } = list;

  const showFilters = list.isFiltered();
  const hasResults = list.hasResults();

  return (
    <Column
      className={classNames("list-main", className)}
      id={`list-main-${key}`}
    >
      <FormRoute model={list.listItemCollection} />
      <ListMainHeader
        isRoot={isRoot}
        list={list}
        availableViews={availableViews}
        viewType={viewType}
        showFilters={showFilters}
        onViewTypeChange={onViewTypeChange}
      />
      <ListMainBody list={list} getView={getView} />
      {(hasResults || !paging.maxpages) && (
        <ListMainFooter list={list} selectedItems={selectedItems} />
      )}
    </Column>
  );
};
ListMainView.displayName = "BI.ListMainView";

export default ListMainView;

// @flow
import { useState } from "react";

import { ListMainView } from "_component-registry/list";

import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +isRoot?: boolean,
  +list: ListModel,
  +viewType?: string,
  +views?: Array<Object>,
  +openListItemInCaseView?: boolean,
};

type ViewProps = {
  +className?: string,
  +list: ListModel,
  +selectType?: string,
  +selectedItems?: Array<ListItemModel>,
  +onItemSelect?: Function,
};

import { getAvailableViews } from "beinformed-ui/List/_util";

const ListMain = ({
  className,
  isRoot,
  list,
  viewType,
  views,
  openListItemInCaseView = false,
}: Props) => {
  const availableViews = views || getAvailableViews(viewType, list);

  const [selectedViewType, setSelectedViewType] = useState(
    availableViews[0].type
  );

  const [selectedItems, setSelectedItems] = useState([]);

  // keep selectedItems in sync with the list
  const availableItemIds = list.listItemCollection.map((item) => item.id);
  const newSelectedItems = selectedItems.filter((selectedItem) =>
    availableItemIds.includes(selectedItem.id)
  );
  if (newSelectedItems.length !== selectedItems.length) {
    setSelectedItems(newSelectedItems);
  }

  const handleItemSelect = (item: ListItemModel) => {
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const activeView =
    availableViews.find((view) => view.type === selectedViewType) ||
    availableViews[0];

  const View = activeView.component;

  if (!View) {
    throw new Error(`View component not found for ${selectedViewType}`);
  }

  const getViewComponent = (viewProps: ViewProps) => {
    const isSelectable = list.actionCollection.hasActionsByLayoutHint(
      MULTI_ROW_TASK
    );

    if (isSelectable) {
      return (
        <View
          className={viewProps.className}
          selectType="multi"
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
          list={viewProps.list}
          openListItemInCaseView={openListItemInCaseView}
        />
      );
    }

    return (
      <View
        className={viewProps.className}
        list={viewProps.list}
        openListItemInCaseView={openListItemInCaseView}
      />
    );
  };

  return (
    <ListMainView
      className={className}
      list={list}
      selectedItems={selectedItems}
      getView={getViewComponent}
      availableViews={availableViews}
      viewType={selectedViewType}
      onViewTypeChange={setSelectedViewType}
      isRoot={isRoot}
    />
  );
};

ListMain.displayName = "BI.ListMain";

export default ListMain;

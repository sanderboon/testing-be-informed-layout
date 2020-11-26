// @flow
import { Href } from "beinformed/models";

import { ListView, TableView, InboxView } from "_component-registry/list";

import { EditView } from "_component-registry/inline-edit";
import { getSetting } from "beinformed/constants/Settings";

import { INLINE_EDIT_LIST } from "beinformed/constants/LayoutHints";

import type { ListModel, ListItemModel } from "beinformed/models";

export const getListItemHref = (
  list: ListModel,
  item: ListItemModel,
  querystring?: string = "",
  openListItemInCaseView?: boolean = false
) => {
  if (openListItemInCaseView) {
    if (item.caseviewHref === null || item.caseviewHref.equals(new Href("#"))) {
      return void 0;
    }

    return new Href(item.caseviewHref, "CaseView");
  }

  if (item.selfhref === null || item.selfhref.equals(new Href("#"))) {
    return void 0;
  }

  const encodedId = encodeURIComponent(item.id);
  return new Href(
    `${list.selfhref.path}/${encodedId}${querystring}`,
    "ListDetail"
  );
};

export const getAvailableViews = (
  currentViewType?: string,
  list: ListModel
) => {
  if (list.resourcetype === "InboxViewList") {
    return [
      {
        icon: "inbox",
        label: "inbox",
        type: "InboxView",
        component: InboxView,
      },
    ];
  }
  if (list.layouthint.has(INLINE_EDIT_LIST)) {
    return [
      {
        icon: "table-edit",
        label: "editable table",
        type: "EditableTableView",
        component: EditView,
      },
    ];
  }

  const defaultViews = {
    ListView: {
      icon: "view-list",
      label: "list",
      type: "ListView",
      component: ListView,
    },
    TableView: {
      icon: "table-large",
      label: "table",
      type: "TableView",
      component: TableView,
    },
  };

  const AVAILABLE_LIST_VIEWS = getSetting("AVAILABLE_LIST_VIEWS").filter(
    (view) => view in defaultViews
  );

  return currentViewType
    ? AVAILABLE_LIST_VIEWS.filter((view) => view === currentViewType).map(
        (view) => defaultViews[view]
      )
    : AVAILABLE_LIST_VIEWS.map((view) => defaultViews[view]);
};

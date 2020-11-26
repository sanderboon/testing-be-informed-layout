// @flow
import { KNOB_GROUPS } from "_storybook/constants";

import { boolean } from "@storybook/addon-knobs";
import { layoutHintKnob } from "_storybook/utils";

import { ListMainHeader, ListView, TableView } from "_component-registry/list";

import { booksListData, booksListContributions } from "./booksList";

import { ListModel, Href } from "beinformed/models";
import { EditView } from "_component-registry/inline-edit";

export default {
  title: "List/ListMainHeader",
  component: ListMainHeader,
};

/**
 * Interactive
 */
export const interactive = () => {
  const calculateTotalsPaging = boolean(
    "calculateTotals",
    true,
    KNOB_GROUPS.MODULARUI
  );

  const { pagesize, page, maxpages } = booksListData.Books.paging;

  const pagingObject = calculateTotalsPaging
    ? booksListData.Books.paging
    : { pagesize, page, maxpages };

  const list = new ListModel({
    request: {
      href: new Href("/Books"),
    },
    key: "Books",
    data: {
      ...booksListData.Books,
      filter: boolean("withActiveFilters", false, KNOB_GROUPS.MODULARUI)
        ? {
            ...booksListData.Books.filter,
            Title: { ...booksListData.Books.filter.Title, value: "objects" },
          }
        : booksListData.Books.filter,
      paging: boolean("hasPaging", true, KNOB_GROUPS.MODULARUI)
        ? pagingObject
        : {},
      _embedded: {
        results: boolean("withData", true, KNOB_GROUPS.COMPONENT)
          ? booksListData.Books._embedded.results
          : [],
      },
    },
    contributions: {
      ...booksListContributions.Books,
      filter: booksListContributions.Books.filter,
      paging: boolean("hasPaging", true, KNOB_GROUPS.MODULARUI)
        ? booksListContributions.Books.paging
        : {},
      sorting: boolean("hasSorting", true, KNOB_GROUPS.MODULARUI)
        ? booksListContributions.Books.sorting
        : {},
      layouthint: layoutHintKnob(["list"]),
    },
  });

  const availableViews = boolean("inlineEdit", false, KNOB_GROUPS.COMPONENT)
    ? [
        {
          icon: "table-edit",
          label: "editable table",
          type: "EditableTableView",
          component: EditView,
        },
      ]
    : [
        {
          icon: "view-list",
          label: "list",
          type: "ListView",
          component: ListView,
        },
        {
          icon: "table-large",
          label: "table",
          type: "TableView",
          component: TableView,
        },
      ];

  return <ListMainHeader list={list} availableViews={availableViews} />;
};

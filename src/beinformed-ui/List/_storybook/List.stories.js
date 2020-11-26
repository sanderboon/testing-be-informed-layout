import { KNOB_GROUPS } from "_storybook/constants";
import { layoutHintKnob } from "_storybook/utils";
import { boolean, select } from "@storybook/addon-knobs";

import { List } from "_component-registry/list";

import { booksList, booksListData, booksListContributions } from "./booksList";

import { ListModel, Href } from "beinformed/models";

export default {
  title: "List/List",
  component: List,
};

const transform = (object, fns) => {
  return fns.reduce((result, fn) => {
    result = fn(result);
    return result;
  }, object);
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

  // list has filters with values
  const withActiveFilters = boolean(
    "withActiveFilters",
    false,
    KNOB_GROUPS.MODULARUI
  );

  // show count on filter
  const showResultCountPerItem = boolean(
    "showResultCountPerItem",
    true,
    KNOB_GROUPS.MODULARUI
  );

  const removeFilterCount = (filters) => {
    const removeCountProperty = ({ key }) => ({ key });

    return showResultCountPerItem
      ? filters
      : {
          ...filters,
          Format: {
            ...filters.Format,
            options: filters.Format.options.map(removeCountProperty),
          },
          Language: {
            ...filters.Language,
            options: filters.Language.options.map(removeCountProperty),
          },
        };
  };

  // add filter value to filters
  const getActiveFilters = (filters) => {
    return withActiveFilters
      ? {
          ...filters,
          Title: { ...filters.Title, value: "objects" },
        }
      : filters;
  };

  const getFilters = (filters) => {
    return transform(filters, [getActiveFilters, removeFilterCount]);
  };

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
      filter: getFilters(booksListData.Books.filter),
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
      filter: boolean("hasFilters", true, KNOB_GROUPS.MODULARUI)
        ? booksListContributions.Books.filter
        : [],
      paging: boolean("hasPaging", true, KNOB_GROUPS.MODULARUI)
        ? booksListContributions.Books.paging
        : {},
      sorting: boolean("hasSorting", true, KNOB_GROUPS.MODULARUI)
        ? booksListContributions.Books.sorting
        : {},
      layouthint: layoutHintKnob(["list"]),
    },
  });

  return (
    <List
      list={list}
      isRoot={boolean("isRoot", false, KNOB_GROUPS.COMPONENT)}
      viewType={select(
        "viewType",
        { TableView: "TableView", ListView: "ListView" },
        "ListView",
        KNOB_GROUPS.COMPONENT
      )}
    />
  );
};

export const listView = () => {
  return (
    <List
      list={booksList}
      isRoot={boolean("isRoot", false, KNOB_GROUPS.COMPONENT)}
      viewType="ListView"
    />
  );
};

export const tableView = () => {
  return (
    <List
      list={booksList}
      isRoot={boolean("isRoot", false, KNOB_GROUPS.COMPONENT)}
      viewType="TableView"
    />
  );
};

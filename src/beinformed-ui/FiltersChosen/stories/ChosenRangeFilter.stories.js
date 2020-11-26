import { layoutHintKnob } from "_storybook/utils";

import { ChosenRangeFilter } from "_component-registry/filters";

import { ListModel, Href } from "beinformed/models";

import { booksListData, booksListContributions } from "./booksList";

export default {
  title: "FiltersChosen/ChosenRangeFilter",
  component: ChosenRangeFilter,
};

const filterAttribute = "rangeNumberOfPages";

export const interactive = () => {
  const hints = layoutHintKnob(["attribute"]);

  const list = new ListModel({
    request: {
      href: new Href("/Books"),
    },
    key: "Books",
    data: {
      ...booksListData.Books,
      filter: {
        ...booksListData.Books.filter,
        rangeNumberOfPages: {
          ...booksListData.Books.filter.rangeNumberOfPages,
          startNumber: {
            ...booksListData.Books.filter.rangeNumberOfPages.startNumber,
            value: 3,
          },
          endNumber: {
            ...booksListData.Books.filter.rangeNumberOfPages.endNumber,
            value: 5,
          },
        },
      },
    },
    contributions: {
      ...booksListContributions.Books,
      filter: booksListContributions.Books.filter.map((filter) => {
        if (!hints.includes("hide-label")) {
          return filter;
        }

        const [key] = Object.keys(filter);

        return key === filterAttribute
          ? {
              [key]: { ...filter[key], layouthint: ["hide-label"] },
            }
          : filter;
      }),
    },
  });

  const filter = list.filterCollection.getFilterByAttributeKey(filterAttribute);

  return (
    <ChosenRangeFilter
      list={list}
      filter={filter}
      attribute={filter.attribute}
    />
  );
};

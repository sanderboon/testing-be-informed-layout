import { layoutHintKnob } from "_storybook/utils";

import { ChosenStandardFilter } from "_component-registry/filters";

import { ListModel, Href } from "beinformed/models";

import { booksListData, booksListContributions } from "./booksList";

export default {
  title: "FiltersChosen/ChosenStandardFilter",
  component: ChosenStandardFilter,
};

const filterAttribute = "Title";

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
        Title: { ...booksListData.Books.filter.Title, value: "objects" },
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
    <ChosenStandardFilter
      list={list}
      filter={filter}
      attribute={filter.attribute}
    />
  );
};

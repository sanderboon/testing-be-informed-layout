import { KNOB_GROUPS } from "_storybook/constants";

import { layoutHintKnob } from "_storybook/utils";
import { boolean } from "@storybook/addon-knobs";

import { Filters } from "_component-registry/filters";
import { Row, Column } from "_component-registry/grid";

import { ListModel, Href } from "beinformed/models";

import { booksListData, booksListContributions } from "./booksList";

export default {
  title: "Filters/Filters",
  component: Filters,
};

const StoryFilterWrapper = (props) => {
  return (
    <Row>
      <Column {...props} size={3} />
    </Row>
  );
};

export const interactive = () => {
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
    },
    contributions: {
      ...booksListContributions.Books,
      layouthint: layoutHintKnob(["list/case"]),
    },
  });

  return <StoryFilterWrapper as={Filters} list={list} />;
};

export const collapsedFiltersWithoutValues = () => {
  const list = new ListModel({
    request: {
      href: new Href("/Books"),
    },
    key: "Books",
    data: booksListData.Books,
    contributions: {
      ...booksListContributions.Books,
      layouthint: ["collapse-filters"],
    },
  });

  return <StoryFilterWrapper as={Filters} list={list} />;
};

export const collapsedFiltersWithValues = () => {
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
      layouthint: ["collapse-filters"],
    },
  });

  return <StoryFilterWrapper as={Filters} list={list} />;
};

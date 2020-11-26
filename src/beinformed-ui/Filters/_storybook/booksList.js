// @flow
import booksListData from "./booksListData.json";
import booksListContributions from "./booksListContributions.json";

import { ListModel, Href } from "beinformed/models";

const booksList = new ListModel({
  request: {
    href: new Href("/Books"),
  },
  key: "Books",
  data: booksListData.Books,
  contributions: booksListContributions.Books,
});

export { booksList, booksListData, booksListContributions };

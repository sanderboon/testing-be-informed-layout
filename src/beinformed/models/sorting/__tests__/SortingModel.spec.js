import SortingModel from "beinformed/models/sorting/SortingModel";

import mockList from "./list.json";
import mockListContributions from "./listContributions.json";
import ListModel from "../../list/ListModel";
import Href from "../../href/Href";

describe("SortingModel", () => {
  let list;

  beforeEach(() => {
    list = new ListModel({
      request: {
        href: new Href("/Books"),
      },
      key: "Books",
      data: mockList.Books,
      contributions: mockListContributions.Books,
    });
  });

  it("should be able to create an empty sorting instance", () => {
    const sorting = new SortingModel();

    expect(sorting).toBeInstanceOf(SortingModel);

    expect(sorting.options.length).toEqual(0);
    expect(sorting.name).toBe("sort");
    expect(sorting.value).toEqual("");
  });

  it("can consume a typical modular UI json sorting structure", () => {
    const { sorting } = list;
    expect(sorting.options).toHaveLength(4);
    expect(sorting.name).toBe("sort");
    expect(sorting.value).toEqual("");
  });

  it("can change sorting", () => {
    const { sorting } = list;
    sorting.setSelected("ISBN10 desc");

    expect(sorting.value).toBe("ISBN10 desc");

    const selected = sorting.options.find((option) => option.selected);
    expect(selected.key).toBe("ISBN10");
    expect(selected.sortorder).toBe("desc");
    expect(selected.value).toBe("ISBN10 desc");
    expect(selected.oppositeValue).toBe("ISBN10 asc");
  });
});

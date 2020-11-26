jest.unmock("../PagingModel");

import PagingModel from "beinformed/models/paging/PagingModel";

import mockList from "./list.json";
import mockListContributions from "./listContributions.json";

describe("PagingModel spec", () => {
  it("should be able to create an empty Paging instance", () => {
    const paging = new PagingModel();

    expect(paging).toBeInstanceOf(PagingModel);

    expect(paging.maxpages).toBeUndefined();
    expect(paging.page).toBeUndefined();
    expect(paging.totalResults).toBe(-1);
  });

  it("can consume a typical modular UI json paging structure", () => {
    const paging = new PagingModel(
      mockList.paging,
      mockListContributions.paging
    );

    expect(paging.maxpages).toBe(1);
    expect(paging.page).toBe(1);
    expect(paging.name).toBe("page");
    expect(paging.totalResults).toBe(32);
  });

  it("can change paging", () => {
    const paging = new PagingModel(
      mockList.paging,
      mockListContributions.paging
    );

    paging.page = 2;
    expect(paging.page).toBe(2);
  });
});

import CaseSearchModel from "beinformed/models/search/CaseSearchModel";

describe("CaseSearchModel", () => {
  it("should be able to create an empty CaseSearchModel object", () => {
    const caseSearch = new CaseSearchModel({});

    expect(caseSearch).toBeInstanceOf(CaseSearchModel);
    expect(caseSearch.getQuickSearchFilters()).toHaveLength(0);
  });
});

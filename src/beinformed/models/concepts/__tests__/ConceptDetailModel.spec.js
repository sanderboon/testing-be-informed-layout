import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

describe("ConceptDetailModel", () => {
  it("should be able to create an empty ConceptDetailModel object", () => {
    const conceptDetail = new ConceptDetailModel();

    expect(conceptDetail).toBeInstanceOf(ConceptDetailModel);
    expect(conceptDetail.type).toBe("ConceptDetail");
  });
});

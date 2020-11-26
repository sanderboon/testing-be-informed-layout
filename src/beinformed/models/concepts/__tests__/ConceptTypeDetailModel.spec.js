import ConceptTypeDetailModel from "beinformed/models/concepts/ConceptTypeDetailModel";

describe("ConceptTypeDetailModel", () => {
  it("should be able to create an empty ConceptTypeDetailModel object", () => {
    const conceptTypeDetail = new ConceptTypeDetailModel();

    expect(conceptTypeDetail).toBeInstanceOf(ConceptTypeDetailModel);
    expect(conceptTypeDetail.type).toBe("ConceptTypeDetail");
  });
});

import ConceptRelationModel from "beinformed/models/concepts/ConceptRelationModel";

describe("ConceptRelationModel", () => {
  it("should be able to create an empty ConceptRelationModel object", () => {
    const conceptRelation = new ConceptRelationModel();

    expect(conceptRelation).toBeInstanceOf(ConceptRelationModel);
  });
});

import ConceptRelationCollection from "beinformed/models/concepts/ConceptRelationCollection";

describe("ConceptRelationCollection", () => {
  it("should be able to create an empty ConceptRelationCollection object", () => {
    const conceptRelationCollection = new ConceptRelationCollection();

    expect(conceptRelationCollection instanceof ConceptRelationCollection).toBe(
      true
    );
  });
});

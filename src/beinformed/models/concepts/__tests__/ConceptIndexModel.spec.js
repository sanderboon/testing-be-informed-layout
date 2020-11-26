import ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";

describe("ConceptIndexModel", () => {
  it("should be able to create an empty ConceptIndexModel object", () => {
    const conceptIndex = new ConceptIndexModel();

    expect(conceptIndex).toBeInstanceOf(ConceptIndexModel);
    expect(conceptIndex.type).toBe("ConceptIndex");
  });
});

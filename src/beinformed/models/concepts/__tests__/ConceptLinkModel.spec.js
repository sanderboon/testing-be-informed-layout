import ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";

describe("ConceptLinkModel", () => {
  it("should be able to create an empty ConceptLinkModel object", () => {
    const conceptLink = new ConceptLinkModel();

    expect(conceptLink).toBeInstanceOf(ConceptLinkModel);
  });
});

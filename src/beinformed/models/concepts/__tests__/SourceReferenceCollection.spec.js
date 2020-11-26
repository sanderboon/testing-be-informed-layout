import SourceReferenceCollection from "beinformed/models/concepts/SourceReferenceCollection";

describe("SourceReferenceCollection", () => {
  it("should be able to create an empty SourceReferenceCollection object", () => {
    const sourceReferenceCollection = new SourceReferenceCollection();

    expect(sourceReferenceCollection instanceof SourceReferenceCollection).toBe(
      true
    );
  });
});

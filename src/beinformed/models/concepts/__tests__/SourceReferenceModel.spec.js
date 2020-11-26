import SourceReferenceModel from "beinformed/models/concepts/SourceReferenceModel";

describe("SourceReferenceModel", () => {
  it("should be able to create an empty SourceReferenceModel object", () => {
    const sourceReference = new SourceReferenceModel();

    expect(sourceReference).toBeInstanceOf(SourceReferenceModel);
  });
});

import LabelAttributeModel from "beinformed/models/attributes/LabelAttributeModel";

describe("LabelAttributeModel", () => {
  it("should be able to create an empty LabelAttribute object", () => {
    const attribute = new LabelAttributeModel();

    expect(attribute).toBeInstanceOf(LabelAttributeModel);
    expect(attribute.type).toBe("label");
  });
});

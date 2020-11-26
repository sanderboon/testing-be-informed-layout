import XMLAttributeModel from "beinformed/models/attributes/XMLAttributeModel";

describe("XMLAttributeModel", () => {
  it("should be able to create an empty XMLAttributeModel object", () => {
    const attribute = new XMLAttributeModel();

    expect(attribute).toBeInstanceOf(XMLAttributeModel);

    expect(attribute.type).toBe("xml");
    expect(attribute.rows).toBe(10);

    expect(attribute.constraintCollection).toHaveLength(1);
  });
});

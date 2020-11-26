import { AttributeCollection } from "beinformed/models";
import AttributeSetModel from "beinformed/models/attributes/AttributeSetModel";

describe("AttributeSetModel", () => {
  it("should be able to create an empty AttributeSetModel object", () => {
    const attributeset = new AttributeSetModel();

    expect(attributeset).toBeInstanceOf(AttributeSetModel);
    expect(attributeset.key).toBe("");
    expect(attributeset.label).toBeUndefined();
    expect(
      attributeset.attributeCollection instanceof AttributeCollection
    ).toBeTruthy();
  });
});

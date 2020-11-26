import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

describe("StringAttributeModel", () => {
  it("should be able to create an empty StringAttribute object", () => {
    const attribute = new StringAttributeModel();

    expect(attribute).toBeInstanceOf(StringAttributeModel);
    expect(attribute.regexpvalidationmessage).toBeNull();
    expect(attribute.postfix).toBe("");
    expect(attribute.prefix).toBe("");
    expect(attribute.placeholder).toBe("");

    attribute.placeholder = "This is a placeholder";
    expect(attribute.placeholder).toBe("This is a placeholder");
  });

  it("can be reset to an empty string", () => {
    const attribute = new StringAttributeModel();

    attribute.inputvalue = "Test String";

    expect(attribute.inputvalue).toBe("Test String");

    attribute.reset();

    expect(attribute.inputvalue).toBe("");
    expect(attribute.isValid).toBeTruthy();
  });

  it("can update", () => {
    const attribute = new StringAttributeModel({});

    attribute.update("bla");

    expect(attribute.readonlyvalue).toBe("bla");
  });

  it("can reset a mandatory attribute", () => {
    const attribute = new StringAttributeModel();

    attribute.mandatory = true;

    attribute.reset();

    expect(attribute.isValid).toBeFalsy();
  });

  it("should be able to create an empty BSNAttributeModel object", () => {
    const attribute = new StringAttributeModel(
      {},
      { type: "string", layouthint: ["bsn"] }
    );

    expect(attribute).toBeInstanceOf(StringAttributeModel);

    attribute.inputvalue = "123";
    expect(attribute.isValid).toBeFalsy();

    attribute.inputvalue = "177813702";
    expect(attribute.isValid).toBeTruthy();

    attribute.inputvalue = "123456789";
    expect(attribute.isValid).toBeFalsy();

    attribute.inputvalue = "177.813.702";
    expect(attribute.isValid).toBe(true);

    attribute.inputvalue = "177 813 702";
    expect(attribute.isValid).toBe(true);

    expect(attribute.validate("-177813702")).toBeFalsy();
    expect(attribute.validate("+177813702")).toBeFalsy();
    expect(attribute.validate("1a77813702")).toBeFalsy();
    expect(attribute.validate("177 813 702")).toBeFalsy();
    expect(attribute.validate("177.813.702")).toBeFalsy();
  });
});

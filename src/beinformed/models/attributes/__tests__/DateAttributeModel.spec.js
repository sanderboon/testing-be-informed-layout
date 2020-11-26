import DatetimeAttributeModel from "beinformed/models/attributes/DatetimeAttributeModel";

describe("DateAttributeModel", () => {
  it("should be able to create an empty Attribute object", () => {
    const attribute = new DatetimeAttributeModel();

    expect(attribute).toBeInstanceOf(DatetimeAttributeModel);
    expect(attribute.key).toBeUndefined();
    expect(attribute.label).toBe("");
    expect(attribute.value).toBeNull();
    expect(attribute.inputvalue).toBe("");
    expect(attribute.type).toBe("date");
    expect(attribute.layouthint.all).toEqual([]);
  });

  it("should create date Attribute from typical modular UI response", () => {
    const stringAttribute = {
      key: "date",
      value: "2010-10-23",
    };

    const dateAttrContribution = {
      label: "Date of birth",
      type: "date",
      mandatory: false,
      format: "dd-MM-yyyy",
    };

    const attribute = new DatetimeAttributeModel(
      stringAttribute,
      dateAttrContribution
    );

    expect(attribute).toBeInstanceOf(DatetimeAttributeModel);
    expect(attribute.key).toBe("date");
    expect(attribute.label).toBe("Date of birth");
    expect(attribute.value).toBe("2010-10-23");
    expect(attribute.format).toBe("dd-MM-yyyy");
    expect(attribute.formatLabel).toBe("dd-mm-yyyy");
    expect(attribute.inputvalue).toBe("23-10-2010");
    expect(attribute.type).toBe("date");
    expect(attribute.layouthint.all).toEqual([]);
  });

  it("Can set input", () => {
    const attribute = new DatetimeAttributeModel({});
    attribute.inputvalue = "10-12-2010";

    expect(attribute.readonlyvalue).toBe("2010-12-10");

    attribute.inputvalue = "";

    expect(attribute.readonlyvalue).toBe("");
    expect(attribute.value).toBeNull();

    attribute.update("aaaa");
    expect(attribute.value).toBe("Invalid Date");
  });
});

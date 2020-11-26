import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";

describe("NumberAttributeModel", () => {
  it("should be able to create an empty NumberAttribute object", () => {
    const attribute = new NumberAttributeModel();

    expect(attribute).toBeInstanceOf(NumberAttributeModel);

    expect(attribute.getInitialInputValue(21)).toBe("21");
    expect(attribute.getInitialInputValue(0)).toBe("0");

    expect(attribute.groupingSeparator).toBe("");
    expect(attribute.decimalSeparator).toBe("");
    expect(attribute.minNumber).toBeUndefined();
    expect(attribute.maxNumber).toBeUndefined();
  });

  it("Can handle numbers", () => {
    const attribute = new NumberAttributeModel(
      {},
      {
        format: "#.00",
        groupingSeparator: ".",
        decimalSeparator: ",",
      }
    );

    expect(attribute).toBeInstanceOf(NumberAttributeModel);

    expect(attribute.getInitialInputValue(21)).toBe("21,00");
    expect(attribute.getInitialInputValue(0)).toBe("0,00");
    expect(attribute.getInitialInputValue(55.5)).toBe("55,50");
    expect(attribute.getInitialInputValue(43.123)).toBe("43,12");
    expect(attribute.getInitialInputValue(555.55)).toBe("555,55");

    expect(attribute.groupingSeparator).toBe(".");
    expect(attribute.decimalSeparator).toBe(",");
    expect(attribute.minNumber).toBeUndefined();
    expect(attribute.maxNumber).toBeUndefined();
  });

  it("has constraints", () => {
    const attribute = new NumberAttributeModel();
    expect(attribute.constraintCollection).toHaveLength(3);
  });

  it("can update", () => {
    const attribute = new NumberAttributeModel();
    attribute.update("12.3");

    expect(attribute.readonlyvalue).toBe("12.3");

    attribute.reset();
    expect(attribute.readonlyvalue).toBe("");
  });
});

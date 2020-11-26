import DatetimeAttributeModel from "beinformed/models/attributes/DatetimeAttributeModel";

describe("TimeAttributeModel", () => {
  it("should be able to create an empty TimeAttribute object", () => {
    const attribute = new DatetimeAttributeModel({}, { type: "time" });

    expect(attribute).toBeInstanceOf(DatetimeAttributeModel);
    expect(attribute.type).toBe("time");
    expect(attribute.format).toBe("HH:mm:ss");
    expect(attribute.getInputValue()).toBe("");
    expect(attribute.inputvalue).toBe("");

    attribute.addConstraints();
    expect(attribute.constraintCollection).toHaveLength(1);
  });

  it("should be able to update", () => {
    const attribute = new DatetimeAttributeModel(
      {},
      {
        type: "time",
        format: "HH:mm",
      }
    );

    attribute.update("13:45");
    expect(attribute.getInputValue()).toBe("13:45");
    expect(attribute.getInitialInputValue("13:45:23")).toBe("13:45");

    attribute.update(null);
    expect(attribute.getInputValue()).toBe("");

    attribute.update("aaaa");
    expect(attribute.value).toBe("Invalid Date");

    attribute.update("");
    expect(attribute.value).toBeNull();
  });

  it("should be able to cope with old iso time format", () => {
    const attribute = new DatetimeAttributeModel(
      { value: "11:35" },
      { type: "time", format: "HH:mm" }
    );

    expect(attribute).toBeInstanceOf(DatetimeAttributeModel);
    expect(attribute.type).toBe("time");
    expect(attribute.format).toBe("HH:mm");
    expect(attribute.getInputValue()).toBe("11:35");
    expect(attribute.inputvalue).toBe("11:35");
    expect(attribute.readonlyvalue).toBe("11:35");
    expect(attribute.value).toBe("11:35:00");

    attribute.addConstraints();
    expect(attribute.constraintCollection).toHaveLength(1);
  });
});

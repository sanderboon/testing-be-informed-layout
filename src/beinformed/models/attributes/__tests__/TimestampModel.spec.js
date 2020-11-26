import DatetimeAttributeModel from "beinformed/models/attributes/DatetimeAttributeModel";

describe("TimestampAttributeModel", () => {
  it("should be able to create an empty TimestampAttribute object", () => {
    const attribute = new DatetimeAttributeModel({}, { type: "timestamp" });

    expect(attribute).toBeInstanceOf(DatetimeAttributeModel);

    expect(attribute.type).toBe("timestamp");
    expect(attribute.format).toBe("yyyy-MM-dd'T'HH:mm:ss.SSS");
    expect(attribute.getInputValue()).toBe("");
    expect(attribute.inputvalue).toBe("");
    expect(attribute.readonlyvalue).toBe("");

    attribute.addConstraints();
    expect(attribute.constraintCollection).toHaveLength(1);
  });

  it("should be able to update", () => {
    const attribute = new DatetimeAttributeModel(
      {},
      {
        type: "timestamp",
        format: "dd-MM-yyyy HH:mm",
      }
    );

    attribute.update("18-08-2016 13:45");
    expect(attribute.getInputValue()).toBe("18-08-2016 13:45");
    expect(attribute.getInitialInputValue("2016-08-18T13:45:23.000")).toBe(
      "18-08-2016 13:45"
    );
    expect(attribute.readonlyvalue).toBe("18-08-2016 13:45");

    attribute.update(null);
    expect(attribute.getInputValue()).toBe("");

    attribute.update("");
    expect(attribute.value).toBeNull();

    attribute.update("aaaa");
    expect(attribute.value).toBe("Invalid Date");
  });
});

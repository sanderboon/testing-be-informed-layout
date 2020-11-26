import createAttribute from "beinformed/models/attributes/_createAttribute";

describe("createAttribute", () => {
  it("should be able to create a string attribute from a simple JSON structure", () => {
    const stringAttribute = createAttribute(
      "string",
      {
        name: "string",
      },
      {
        type: "string",
      }
    );

    expect(stringAttribute.type).toBe("string");
    expect(stringAttribute.value).toBeNull();
    expect(stringAttribute.name).toBe("string");

    stringAttribute.inputvalue = "test string";

    expect(stringAttribute.value).toBe("test string");
  });

  it("should be able to create a string attribute with value from a simple JSON structure", () => {
    const stringAttribute = createAttribute(
      "string",
      {
        name: "string",
        value: "test string",
      },
      {
        type: "string",
      }
    );

    expect(stringAttribute.value).toBe("test string");
  });

  it("should be able to create a number attribute with value from a simple JSON structure", () => {
    const numberAttribute = createAttribute(
      "number",
      {
        name: "number",
        value: 0,
      },
      {
        type: "number",
      }
    );

    expect(numberAttribute.value).toBe(0);
  });

  it("should be able to create a choice attribute with treshold from a standard JSON structure", () => {
    const choiceAttribute = createAttribute(
      "choice",
      {
        name: "choice",
      },
      {
        type: "string",
        optionMode: "dynamicWithThreshold",
        multiplechoice: false,
        layouthint: ["combobox"],
        enumerated: true,
      }
    );

    expect(choiceAttribute.value).toBeNull();
  });

  it("should be able to create a password attribute from a simple JSON structure", () => {
    const passwordAttribute = createAttribute(
      "password",
      {
        name: "password",
        value: "test password",
      },
      {
        type: "password",
        label: "Password attribute",
      }
    );

    expect(passwordAttribute.type).toBe("password");
  });

  it("should be able to create a date attribute from a simple JSON structure", () => {
    const dateAttribute = createAttribute(
      "date",
      {
        name: "date",
        value: "2018-11-29",
      },
      {
        type: "date",
        label: "Date attribute",
        format: "dd-MM-yyyy",
      }
    );

    expect(dateAttribute.type).toBe("date");
    expect(dateAttribute.inputvalue).toBe("29-11-2018");
    expect(dateAttribute.value).toBe("2018-11-29");
  });
});

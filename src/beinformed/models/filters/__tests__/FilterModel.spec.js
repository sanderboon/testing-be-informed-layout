import FilterModel from "beinformed/models/filters/FilterModel";

describe("FilterModel", () => {
  let stringFilter;
  let stringFilterContributions;

  beforeEach(() => {
    stringFilter = {
      name: "stringfilter",
      param: "stringfilter",
    };
    stringFilterContributions = {
      name: "stringfilter",
      label: "Stringfilter",
    };
  });

  it("should be able to create an empty filter", () => {
    const filter = new FilterModel();

    expect(filter).toBeInstanceOf(FilterModel);
    expect(filter.label).toBe("");
    expect(filter.name).toBeUndefined();
    expect(filter.value).toBeUndefined();
    expect(filter.inputvalue).toBeUndefined();
    expect(filter.type).toBe("string");
    expect(filter.params).toEqual([]);
  });

  it("should be able to create a filter from a typical modular UI json filter structure without value", () => {
    const filter = new FilterModel(stringFilter, stringFilterContributions);

    expect(filter).toBeInstanceOf(FilterModel);
    expect(filter.label).toBe("Stringfilter");
    expect(filter.name).toBe("stringfilter");
    expect(filter.value).toBeUndefined();
    expect(filter.inputvalue).toBeUndefined();
    expect(filter.type).toBe("string");
  });

  it("should be able to create a filter from a typical modular UI json filter structure with value", () => {
    const stringFilterWithValue = stringFilter;

    stringFilterWithValue.value = "ParamValue";

    const filter = new FilterModel(
      stringFilterWithValue,
      stringFilterContributions
    );

    expect(filter).toBeInstanceOf(FilterModel);
    expect(filter.attribute.value).toBe("ParamValue");
    expect(filter.attribute.inputvalue).toBe("ParamValue");
    expect(filter.params).toEqual([
      {
        name: "stringfilter",
        value: "ParamValue",
      },
    ]);

    filter.reset();
    expect(filter.attribute.inputvalue).toBe("");
    expect(filter.attribute.value).toBeNull();
  });
});

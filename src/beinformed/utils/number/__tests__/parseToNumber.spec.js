import parseToNumber from "beinformed/utils/number/parseToNumber";

describe("formatValue", () => {
  it("can parse numbers based on configuration", () => {
    expect(parseToNumber()).toBeNaN();
    expect(parseToNumber(null)).toBeNaN();
    expect(parseToNumber("")).toBeNaN();
    expect(parseToNumber("A")).toBeNaN();

    expect(parseToNumber(0)).toBe(0);
    expect(parseToNumber(1)).toBe(1);
    expect(parseToNumber("1")).toBe(1);
    expect(parseToNumber(1.1234)).toBe(1.1234);

    expect(parseToNumber("112,22", ".", ",")).toBe(112.22);
    expect(parseToNumber("1.000.000,00", ".", ",")).toBe(1000000);

    expect(parseToNumber("500.0000", ".", ",")).toBe(5000000);
  });
});

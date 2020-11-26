import formatValue from "../formatValue";

describe("formatValue", () => {
  it("should be able to handle the java.text.DecimalFormat", () => {
    expect(formatValue(null, "#")).toBe("");
    expect(formatValue(undefined, "#")).toBe("");

    expect(formatValue(123456.789, "###,###.###")).toBe("123,456.789");
    expect(formatValue(123456.789, "###.##")).toBe("123456.79");
    expect(formatValue(123456.784, "###.##")).toBe("123456.78");
    expect(formatValue(123.78, "000000.000")).toBe("000123.780");
    expect(formatValue(12345.67, "$###,###.###")).toBe("$12,345.67");
    expect(formatValue(12345.67, "\u00A5###,###.###")).toBe("¥12,345.67");

    expect(formatValue(111, "#,##0.00")).toBe("111.00");

    expect(formatValue(1234, "abcd")).toBe("abcd1234");

    expect(formatValue(176, "###.##%")).toBe("17600%");
    expect(formatValue(11.1234, "###.##%")).toBe("1112.34%");

    expect(formatValue(-12.3456, "#.##")).toBe("-12.35");
    expect(formatValue(+12.3456, "#.##")).toBe("12.35");

    expect(formatValue(null, "#.##")).toBe("");
    expect(formatValue(5.56789, "#.##")).toBe("5.57");
    expect(formatValue(5.567898934722384e16, "#.00")).toBe(
      "55678989347223840.00"
    );

    expect(formatValue(0)).toBe("0");
    expect(formatValue(0, "0")).toBe("0");

    expect(formatValue(5000000, "#,##0.00", ".", ",")).toBe("5.000.000,00");
  });
});

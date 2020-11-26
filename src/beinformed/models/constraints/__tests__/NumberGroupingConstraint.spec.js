import NumberGroupingConstraint from "beinformed/models/constraints/NumberGroupingConstraint";

describe("NumberGroupingConstraint", () => {
  it("validates if grouping separator exists on correct place", () => {
    const constraintMinimalFormat = new NumberGroupingConstraint(".", ",", "0");
    expect(constraintMinimalFormat.validate("1000000")).toBe(true);
    expect(constraintMinimalFormat.validate("1.00.00.00")).toBe(false);
    expect(constraintMinimalFormat.validate("1.000.000")).toBe(true);
    expect(constraintMinimalFormat.validate("1000000,00")).toBe(true);
    expect(constraintMinimalFormat.validate("1000000.00")).toBe(false);
    expect(constraintMinimalFormat.validate("1000.000,00")).toBe(false);
    expect(constraintMinimalFormat.validate("1000,000.00")).toBe(false);
    expect(constraintMinimalFormat.validate("1.000.000,00")).toBe(true);
    expect(constraintMinimalFormat.validate("1,000,000.00")).toBe(false);
    expect(constraintMinimalFormat.validate("1.00.000,00")).toBe(false);
    expect(constraintMinimalFormat.validate("1,00,000.00")).toBe(false);

    const onlyDecimal = new NumberGroupingConstraint(".", ",", "###.##");
    expect(onlyDecimal.validate("1000000")).toBe(true);
    expect(onlyDecimal.validate("1.00.00.00")).toBe(false);
    expect(onlyDecimal.validate("1.000.000")).toBe(true);
    expect(onlyDecimal.validate("1000000,00")).toBe(true);
    expect(onlyDecimal.validate("1000000.00")).toBe(false);
    expect(onlyDecimal.validate("1.000.000,00")).toBe(true);
    expect(onlyDecimal.validate("1,000,000.00")).toBe(false);
    expect(onlyDecimal.validate("1000.000,00")).toBe(false);
    expect(onlyDecimal.validate("1000,000.00")).toBe(false);
    expect(onlyDecimal.validate("1.00.000,00")).toBe(false);
    expect(onlyDecimal.validate("1,00,000.00")).toBe(false);

    const moneyFormat = new NumberGroupingConstraint(".", ",", "#,##0.00");
    expect(moneyFormat.validate("1.000.000")).toBe(true);
    expect(moneyFormat.validate("1.00.00.00")).toBe(false);
    expect(moneyFormat.validate("1000000,00")).toBe(true);
    expect(moneyFormat.validate("1000000.00")).toBe(false);
    expect(moneyFormat.validate("1000.000,00")).toBe(false);
    expect(moneyFormat.validate("1000,000.00")).toBe(false);
    expect(moneyFormat.validate("1.000.000,00")).toBe(true);
    expect(moneyFormat.validate("1,000,000.00")).toBe(false);
    expect(moneyFormat.validate("1.00.000,00")).toBe(false);
    expect(moneyFormat.validate("1,00,000.00")).toBe(false);

    const constraintGroupingDot = new NumberGroupingConstraint(
      ".",
      ",",
      "##,##.##"
    );
    expect(constraintGroupingDot.validate("1000000")).toBe(true);
    expect(constraintGroupingDot.validate("1.00.00.00")).toBe(true);
    expect(constraintGroupingDot.validate("1,00,00,00.00")).toBe(false);
    expect(constraintGroupingDot.validate("1000000,00")).toBe(true);
    expect(constraintGroupingDot.validate("1000000.00")).toBe(false);
    expect(constraintGroupingDot.validate("1.000.000,00")).toBe(false);
    expect(constraintGroupingDot.validate("1,000,000.00")).toBe(false);
    expect(constraintGroupingDot.validate("1000.000,00")).toBe(false);
    expect(constraintGroupingDot.validate("1000,000.00")).toBe(false);
    expect(constraintGroupingDot.validate("1.00.000,00")).toBe(false);
    expect(constraintGroupingDot.validate("1,00,000.00")).toBe(false);

    const constraintGroupingComma = new NumberGroupingConstraint(
      ",",
      ".",
      "##,##.##"
    );
    expect(constraintGroupingComma.validate("1000000")).toBe(true);
    expect(constraintGroupingComma.validate("1.00.00.00")).toBe(true);
    expect(constraintGroupingComma.validate("1,00,00,00.00")).toBe(true);
    expect(constraintGroupingComma.validate("1000000,00")).toBe(false);
    expect(constraintGroupingComma.validate("1000000.00")).toBe(true);
    expect(constraintGroupingComma.validate("1.000.000,00")).toBe(false);
    expect(constraintGroupingComma.validate("1,000,000.00")).toBe(false);
    expect(constraintGroupingComma.validate("1000.000,00")).toBe(false);
    expect(constraintGroupingComma.validate("1000,000.00")).toBe(false);
    expect(constraintGroupingComma.validate("1.00.000,00")).toBe(false);
    expect(constraintGroupingComma.validate("1,00,000.00")).toBe(false);

    const constraintNoDecimal = new NumberGroupingConstraint("", "", "0");

    expect(constraintNoDecimal.validate("1000000")).toBe(true);
    expect(constraintNoDecimal.validate("1.000.000")).toBe(true);
    expect(constraintNoDecimal.validate("1.000.000,00")).toBe(true);
  });
});

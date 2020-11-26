import NumberFormatConstraint from "beinformed/models/constraints/NumberFormatConstraint";

describe("NumberFormatConstraint", () => {
  it("NumberFormatConstraint checks", () => {
    const constraint = new NumberFormatConstraint();

    expect(constraint.validate(-1)).toBe(true);
    expect(constraint.validate(0)).toBe(true);

    expect(constraint.isInteger(1)).toBe(true);
    expect(constraint.isInteger("a")).toBe(false);

    expect(constraint.validate("1")).toBe(true);
    expect(constraint.validate("a")).toBe(false);
    expect(constraint.validate("-1")).toBe(true);

    expect(constraint.isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(constraint.isInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(true);

    expect(constraint.isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
    expect(constraint.isInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(true);

    const betweenConstraint = new NumberFormatConstraint(",", ".", "#.##");

    expect(betweenConstraint.validate("1")).toBe(true);
    expect(betweenConstraint.validate("a")).toBe(false);
    expect(betweenConstraint.isValidDecimal(-1)).toBe(true);
    expect(betweenConstraint.isValidDecimal(1.21)).toBe(true);
    expect(betweenConstraint.isValidDecimal(1.2231)).toBe(false);

    const constraintZeros = new NumberFormatConstraint(",", ".", 0);
    expect(constraintZeros.validate(-1)).toBe(true);
    expect(constraintZeros.validate(0)).toBe(true);
    expect(constraintZeros.validate(1)).toBe(true);

    const moneyFormat = new NumberFormatConstraint(".", ",", "#.##");

    expect(moneyFormat.validate("1234,00")).toBe(true);
    expect(moneyFormat.validate("1.234,00")).toBe(true);
    expect(moneyFormat.validate("1.000.234,00")).toBe(true);
  });

  it("validates if grouping separator exists on correct place", () => {
    const constraintMinimalFormat = new NumberFormatConstraint(".", ",", "0");
    expect(constraintMinimalFormat.validate("1000000")).toBe(true);
    expect(constraintMinimalFormat.validate("1.00.00.00")).toBe(true);
    expect(constraintMinimalFormat.validate("1.000.000")).toBe(true);
    expect(constraintMinimalFormat.validate("1000000,00")).toBe(false);
    expect(constraintMinimalFormat.validate("1000000.00")).toBe(true);
    expect(constraintMinimalFormat.validate("1000.000,00")).toBe(false);
    expect(constraintMinimalFormat.validate("1000,000.00")).toBe(false);
    expect(constraintMinimalFormat.validate("1.000.000,00")).toBe(false);
    expect(constraintMinimalFormat.validate("1,000,000.00")).toBe(false);
    expect(constraintMinimalFormat.validate("1.00.000,00")).toBe(false);
    expect(constraintMinimalFormat.validate("1,00,000.00")).toBe(false);

    const onlyDecimal = new NumberFormatConstraint(".", ",", "###.##");
    expect(onlyDecimal.validate("1000000")).toBe(true);
    expect(onlyDecimal.validate("1.00.00.00")).toBe(true);
    expect(onlyDecimal.validate("1.000.000")).toBe(true);
    expect(onlyDecimal.validate("1000000,00")).toBe(true);
    expect(onlyDecimal.validate("1000000.00")).toBe(true);
    expect(onlyDecimal.validate("1.000.000,00")).toBe(true);
    expect(onlyDecimal.validate("1,000,000.00")).toBe(false);
    expect(onlyDecimal.validate("1000.000,00")).toBe(true);
    expect(onlyDecimal.validate("1000,000.00")).toBe(true);
    expect(onlyDecimal.validate("1.00.000,00")).toBe(true);
    expect(onlyDecimal.validate("1,00,000.00")).toBe(false);

    const moneyFormat = new NumberFormatConstraint(".", ",", "#,##0.00");
    expect(moneyFormat.validate("1.000.000")).toBe(true);
    expect(moneyFormat.validate("1.00.00.00")).toBe(true);
    expect(moneyFormat.validate("1000000,00")).toBe(true);
    expect(moneyFormat.validate("1000000.00")).toBe(true);
    expect(moneyFormat.validate("1000.000,00")).toBe(true);
    expect(moneyFormat.validate("1000,000.00")).toBe(true);
    expect(moneyFormat.validate("1.000.000,00")).toBe(true);
    expect(moneyFormat.validate("1,000,000.00")).toBe(false);
    expect(moneyFormat.validate("1.00.000,00")).toBe(true);
    expect(moneyFormat.validate("1,00,000.00")).toBe(false);

    const constraintGroupingDot = new NumberFormatConstraint(
      ".",
      ",",
      "##,##.##"
    );
    expect(constraintGroupingDot.validate("1000000")).toBe(true);
    expect(constraintGroupingDot.validate("1.00.00.00")).toBe(true);
    expect(constraintGroupingDot.validate("1,00,00,00.00")).toBe(false);
    expect(constraintGroupingDot.validate("1000000,00")).toBe(true);
    expect(constraintGroupingDot.validate("1000000.00")).toBe(true);
    expect(constraintGroupingDot.validate("1.000.000,00")).toBe(true);
    expect(constraintGroupingDot.validate("1,000,000.00")).toBe(false);
    expect(constraintGroupingDot.validate("1000.000,00")).toBe(true);
    expect(constraintGroupingDot.validate("1000,000.00")).toBe(true);
    expect(constraintGroupingDot.validate("1.00.000,00")).toBe(true);
    expect(constraintGroupingDot.validate("1,00,000.00")).toBe(false);

    const constraintGroupingComma = new NumberFormatConstraint(
      ",",
      ".",
      "##,##.##"
    );
    expect(constraintGroupingComma.validate("1000000")).toBe(true);
    expect(constraintGroupingComma.validate("1.00.00.00")).toBe(false);
    expect(constraintGroupingComma.validate("1,00,00,00.00")).toBe(true);
    expect(constraintGroupingComma.validate("1000000,00")).toBe(true);
    expect(constraintGroupingComma.validate("1000000.00")).toBe(true);
    expect(constraintGroupingComma.validate("1.000.000,00")).toBe(false);
    expect(constraintGroupingComma.validate("1,000,000.00")).toBe(true);
    expect(constraintGroupingComma.validate("1000.000,00")).toBe(true);
    expect(constraintGroupingComma.validate("1000,000.00")).toBe(true);
    expect(constraintGroupingComma.validate("1.00.000,00")).toBe(false);
    expect(constraintGroupingComma.validate("1,00,000.00")).toBe(true);

    const constraintNoDecimal = new NumberFormatConstraint("", "", "0");

    expect(constraintNoDecimal.validate("1000000")).toBe(true);
    expect(constraintNoDecimal.validate("1.000.000")).toBe(false);
    expect(constraintNoDecimal.validate("1.000.000,00")).toBe(false);
  });
});

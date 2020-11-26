import NumberBoundaryConstraint from "beinformed/models/constraints/NumberBoundaryConstraint";

describe("NumberBoundaryConstraint", () => {
  it("NumberBoundaryConstraint checks", () => {
    const betweenConstraint = new NumberBoundaryConstraint(
      1,
      1000,
      ".",
      ",",
      "##.00"
    );

    expect(betweenConstraint.isExactNumber(1)).toBeTruthy();
    expect(betweenConstraint.isExactNumber(2)).toBeFalsy();

    expect(betweenConstraint.isSameOrAboveMinNumber(-1)).toBeFalsy();
    expect(betweenConstraint.isSameOrAboveMinNumber(1)).toBeTruthy();
    expect(betweenConstraint.isSameOrAboveMinNumber(2)).toBeTruthy();

    expect(betweenConstraint.isSameOrBelowMaxNumber(1001)).toBeFalsy();
    expect(betweenConstraint.isSameOrBelowMaxNumber(1000)).toBeTruthy();
    expect(betweenConstraint.isSameOrBelowMaxNumber(999)).toBeTruthy();

    expect(betweenConstraint.isBetweenNumbers(500)).toBeTruthy();
  });
});

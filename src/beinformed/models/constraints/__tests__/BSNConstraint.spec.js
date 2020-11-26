import BSNConstraint from "beinformed/models/constraints/BSNConstraint";

describe("BSNConstraint", () => {
  it("BSN checks", () => {
    const constraint = new BSNConstraint();

    expect(constraint).toBeInstanceOf(BSNConstraint);
    expect(constraint.validate("abcd")).toBeFalsy();

    expect(constraint.validate("177813702")).toBeTruthy();

    expect(constraint.validate("123456789")).toBeFalsy();

    expect(constraint.validate("-177813702")).toBeFalsy();
    expect(constraint.validate("+177813702")).toBeFalsy();
    expect(constraint.validate("1a77813702")).toBeFalsy();
    expect(constraint.validate("177 813 702")).toBeFalsy();
    expect(constraint.validate("177.813.702")).toBeFalsy();

    expect(constraint.validate("64915207")).toBeTruthy();
  });
});

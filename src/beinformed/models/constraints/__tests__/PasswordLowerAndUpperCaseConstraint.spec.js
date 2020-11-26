import PasswordLowerAndUpperCaseConstraint from "beinformed/models/constraints/PasswordLowerAndUpperCaseConstraint";

describe("Password constraints", () => {
  it("PasswordLowerAndUpperCaseConstraint", () => {
    const constraint = new PasswordLowerAndUpperCaseConstraint();

    expect(constraint.validate("aB")).toBeTruthy();
    expect(constraint.validate("")).toBeFalsy();
    expect(constraint.validate("a")).toBeFalsy();
    expect(constraint.validate("B")).toBeFalsy();
    expect(constraint.validate("1")).toBeFalsy();
  });
});

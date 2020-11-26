import StringLengthConstraint from "beinformed/models/constraints/StringLengthConstraint";

describe("StringLengthConstraint", () => {
  it("Min Length", () => {
    const constraint = new StringLengthConstraint(5);

    expect(constraint).toBeInstanceOf(StringLengthConstraint);
    expect(constraint.validate("abcd")).toBeFalsy();
    expect(constraint.validate("abcde")).toBeTruthy();
    expect(constraint.validate("abcdef")).toBeTruthy();
  });

  it("Max Length", () => {
    const constraint = new StringLengthConstraint(null, 5);

    expect(constraint).toBeInstanceOf(StringLengthConstraint);
    expect(constraint.validate("abcd")).toBeTruthy();
    expect(constraint.validate("abcde")).toBeTruthy();
    expect(constraint.validate("abcdef")).toBeFalsy();
  });

  it("Exact Length", () => {
    const constraint = new StringLengthConstraint(5, 5);

    expect(constraint).toBeInstanceOf(StringLengthConstraint);
    expect(constraint.validate("abcd")).toBeFalsy();
    expect(constraint.validate("abcde")).toBeTruthy();
    expect(constraint.validate("abcdef")).toBeFalsy();
  });

  it("Between Length", () => {
    const constraint = new StringLengthConstraint(4, 6);

    expect(constraint).toBeInstanceOf(StringLengthConstraint);
    expect(constraint.validate("abc")).toBeFalsy();
    expect(constraint.validate("abcde")).toBeTruthy();
    expect(constraint.validate("abcdefg")).toBeFalsy();
  });
});

import PasswordMinNumericCharactersConstraint from "beinformed/models/constraints/PasswordMinNumericCharactersConstraint";

describe("Password constraints", () => {
  it("PasswordMinNumericCharactersConstraint", () => {
    const constraint = new PasswordMinNumericCharactersConstraint(1);

    expect(constraint.validate("ABCD12345")).toBeTruthy();
    expect(constraint.validate("ABCD")).toBeFalsy();
  });
});

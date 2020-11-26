import PasswordMinSpecialCharactersConstraint from "beinformed/models/constraints/PasswordMinSpecialCharactersConstraint";

describe("Password constraints", () => {
  it("PasswordMinSpecialCharactersConstraint", () => {
    const constraint = new PasswordMinSpecialCharactersConstraint(1);

    expect(constraint.validate("Ab&")).toBeTruthy();
    expect(constraint.validate("Ab")).toBeFalsy();
  });
});

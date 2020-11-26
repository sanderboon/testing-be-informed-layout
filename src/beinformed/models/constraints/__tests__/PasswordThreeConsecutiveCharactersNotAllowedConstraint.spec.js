import PasswordThreeConsecutiveCharactersNotAllowedConstraint from "beinformed/models/constraints/PasswordThreeConsecutiveCharactersNotAllowedConstraint";

describe("Password constraints", () => {
  it("PasswordThreeConsecutiveCharactersNotAllowedConstraint", () => {
    const constraint = new PasswordThreeConsecutiveCharactersNotAllowedConstraint(
      1
    );

    expect(constraint.validate("ABACDEFGH")).toBeTruthy();
    expect(constraint.validate("ABAAABBCCDDEEFFGGHHAA")).toBeFalsy();
    expect(constraint.validate("")).toBeTruthy();
  });

  it("PasswordThreeConsecutiveCharactersNotAllowedConstraint 3 concecutive chars", () => {
    const constraint = new PasswordThreeConsecutiveCharactersNotAllowedConstraint(
      3
    );

    expect(constraint.validate("AAABBACDEFGH")).toBeTruthy();
    expect(constraint.validate("ABAAAABBCCDDEEFFGGHHAA")).toBeFalsy();
    expect(constraint.validate("")).toBeTruthy();
  });
});

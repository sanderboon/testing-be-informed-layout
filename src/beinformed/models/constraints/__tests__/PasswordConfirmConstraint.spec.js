import PasswordConfirmConstraint from "beinformed/models/constraints/PasswordConfirmConstraint";

describe("PasswordConfirmConstraint", () => {
  it("PasswordConfirmConstraint checks", () => {
    const constraint = new PasswordConfirmConstraint("12345", "Other password");

    expect(constraint).toBeInstanceOf(PasswordConfirmConstraint);

    expect(constraint.id).toBe("Constraint.Password.ConfirmMismatch");
    expect(constraint.otherPasswordLabel).toBe("Other password");
    expect(constraint.otherPasswordValue).toBe("12345");
    expect(constraint.hasValidation()).toBeTruthy();
    expect(typeof constraint.defaultMessage).toBe("string");
    expect(constraint.parameters).toEqual({
      other: "Other password",
    });

    expect(constraint.validate("98765")).toBeFalsy();
    expect(constraint.validate("12345")).toBeTruthy();
  });
});

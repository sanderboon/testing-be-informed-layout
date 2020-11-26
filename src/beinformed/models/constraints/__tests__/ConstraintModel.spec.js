import ConstraintModel from "beinformed/models/constraints/ConstraintModel";

describe("ConstraintModel", () => {
  it("Can create empty model", () => {
    const constraint = new ConstraintModel();

    expect(constraint).toBeInstanceOf(ConstraintModel);
    expect(constraint.id).toBeUndefined();
    expect(constraint.defaultMessage).toBe("Missing default message");
    expect(constraint.parameters).toBeUndefined();
    expect(constraint.hasValidation()).toBeFalsy();
    expect(constraint.isMandatoryConstraint).toBeFalsy();
  });

  it("Can create a custom constraint", () => {
    const validate = (value) => value === "test";
    const constraint = new ConstraintModel(
      "custom",
      validate,
      "Default message",
      { prop: "value" }
    );

    expect(constraint.id).toBe("custom");
    expect(constraint.defaultMessage).toBe("Default message");
    expect(constraint.parameters).toEqual({ prop: "value" });
    expect(constraint.hasValidation()).toBeTruthy();
    expect(constraint.isMandatoryConstraint).toBeFalsy();

    expect(constraint.validate("test")).toBeTruthy();
    expect(constraint.validate("not test")).toBeFalsy();
  });
});

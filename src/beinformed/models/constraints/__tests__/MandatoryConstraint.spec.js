import MandatoryConstraint from "beinformed/models/constraints/MandatoryConstraint";

describe("MandatoryConstraint", () => {
  it("Mandatory checks", () => {
    const constraint = new MandatoryConstraint();

    expect(constraint).toBeInstanceOf(MandatoryConstraint);
    expect(constraint.validate("abcd")).toBeTruthy();
    expect(constraint.validate("")).toBeFalsy();
    expect(constraint.validate(null)).toBeFalsy();
    expect(constraint.validate()).toBeFalsy();
  });
});

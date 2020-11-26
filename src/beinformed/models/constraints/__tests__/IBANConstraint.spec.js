import IBANConstraint from "beinformed/models/constraints/IBANConstraint";

describe("IBANConstraint", () => {
  it("IBAN checks", () => {
    const constraint = new IBANConstraint();

    expect(constraint).toBeInstanceOf(IBANConstraint);
    expect(constraint.validate("ongeldigeIBAN")).toBeFalsy();
    expect(constraint.validate("NL39 RABO 0300 0652 64")).toBeTruthy();
  });
});

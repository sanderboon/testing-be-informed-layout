import RegexConstraint from "beinformed/models/constraints/RegexConstraint";

describe("RegexConstraint", () => {
  it("Regex checks", () => {
    const constraint = new RegexConstraint({
      regex: "^[a-z0-9_-]{6,18}$",
      messageKey: "Password_regex_validation",
    });

    expect(constraint).toBeInstanceOf(RegexConstraint);

    expect(constraint.validate("myp4ssw0rd")).toBeTruthy();
    expect(constraint.validate("mypa$$w0rd")).toBeFalsy();
  });

  it("Zipcode", () => {
    const constraint = new RegexConstraint({
      messageKey: "Constraint.ZipCode.InvalidFormat",
      defaultMessage: "Must be a valid Dutch ZIP code, e.g. 1234 AB",
      regex: "[1-9]{1}[0-9]{3}[\\s]?[a-zA-Z]{2}",
    });

    expect(constraint.validate("AAAA AB")).toBeFalsy();
    expect(constraint.validate("1234 AB")).toBeTruthy();
    expect(constraint.validate("1234AB")).toBeTruthy();
  });

  it("Email", () => {
    const constraint = new RegexConstraint({
      messageKey: "Constraint.Email.InvalidFormat",
      defaultMessage: "Must be a valid e-mail address",
      regex: new RegExp(
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        "gi"
      ),
    });

    expect(constraint.validate("invalid_email")).toBeFalsy();
    expect(constraint.validate("first.last@example.com")).toBeTruthy();
  });
});

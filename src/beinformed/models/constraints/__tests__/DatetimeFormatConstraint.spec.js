import DatetimeFormatConstraint from "beinformed/models/constraints/DatetimeFormatConstraint";

describe("DatetimeFormatConstraint", () => {
  it("DatetimeFormatConstraint checks for datetime", () => {
    const constraint = new DatetimeFormatConstraint(
      "datetime",
      "dd-MM-yyyy HH:mm"
    );

    expect(constraint.id).toBe("Constraint.DateTime.MissingValue");

    expect(constraint.format).toBe("dd-MM-yyyy HH:mm");

    expect(constraint.hasValidation()).toBeTruthy();
    expect(constraint.defaultMessage).toBe(
      "Date and time should both be entered"
    );
    expect(constraint.formatLabel).toBe("dd-mm-yyyy hh:mm");

    expect(constraint.validate("19-01-2010 13:37")).toBeTruthy();
    expect(constraint.validate("2010-01-01 24:05")).toBeFalsy();
    expect(constraint.validate("2010-01-01")).toBeFalsy();
  });

  it("DatetimeFormatConstraint checks for timestamp", () => {
    const constraint = new DatetimeFormatConstraint(
      "timestamp",
      "dd-MM-yyyy HH:mm:ss.SSS"
    );

    expect(constraint.id).toBe("Constraint.DateTime.MissingValue");

    expect(constraint.format).toBe("dd-MM-yyyy HH:mm:ss.SSS");

    expect(constraint.hasValidation()).toBeTruthy();

    expect(constraint.defaultMessage).toBe(
      "Date and time should both be entered"
    );
    expect(constraint.formatLabel).toBe("dd-mm-yyyy hh:mm:ss.sss");

    expect(constraint.validate("19-01-2010 13:37:37.137")).toBeTruthy();
    expect(constraint.validate("2010-01-01 15:14:58.2000")).toBeFalsy();
    expect(constraint.validate("2010-01-01")).toBeFalsy();
  });
});

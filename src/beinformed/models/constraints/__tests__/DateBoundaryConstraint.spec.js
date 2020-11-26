import DateBoundaryConstraint from "beinformed/models/constraints/DateBoundaryConstraint";

describe("DateBoundaryConstraint", () => {
  it("DateBoundaryConstraint requires input", () => {
    const constraint = new DateBoundaryConstraint();

    expect(constraint).toBeInstanceOf(DateBoundaryConstraint);

    expect(() => {
      constraint.isExactDate();
    }).toThrow();
    expect(() => {
      constraint.isBetweenDates();
    }).toThrow();
    expect(() => {
      constraint.isSameOrAfterMinDate();
    }).toThrow();
    expect(() => {
      constraint.isSameOrBeforeMaxDate();
    }).toThrow();

    expect(() => {
      constraint.isExactDate("");
    }).toThrow();
    expect(() => {
      constraint.isBetweenDates("");
    }).toThrow();
    expect(() => {
      constraint.isSameOrAfterMinDate("");
    }).toThrow();
    expect(() => {
      constraint.isSameOrBeforeMaxDate("");
    }).toThrow();
  });

  it("checks for date", () => {
    const yearConstraint = new DateBoundaryConstraint(
      "date",
      "2010-01-01",
      "2010-12-31",
      "yyyy-MM-dd"
    );

    expect(yearConstraint.validate("2009-01-01")).toBeFalsy();
    expect(yearConstraint.validate("2010-01-01")).toBeTruthy();

    expect(yearConstraint.validate("2009-02-01")).toBeFalsy();
    expect(yearConstraint.validate("2010-02-01")).toBeTruthy();
    expect(yearConstraint.validate("2011-02-01")).toBeFalsy();

    expect(yearConstraint.validate("2009-02-01")).toBeFalsy();
    expect(yearConstraint.validate("2010-01-01")).toBeTruthy();
    expect(yearConstraint.validate("2010-02-01")).toBeTruthy();

    expect(yearConstraint.validate("2010-01-01")).toBeTruthy();
    expect(yearConstraint.validate("2010-12-31")).toBeTruthy();
    expect(yearConstraint.validate("2011-01-01")).toBeFalsy();

    const dayConstraint = new DateBoundaryConstraint(
      "date",
      "2010-01-01",
      "2010-01-01",
      "yyyy-MM-dd"
    );
    expect(dayConstraint.validate("2010-01-01")).toBeTruthy();
    expect(dayConstraint.validate("2010-01-02")).toBeFalsy();
  });

  it("DateBoundaryConstraint checks for datetime", () => {
    const exactDateConstraint = new DateBoundaryConstraint(
      "datetime",
      "2020-05-01T08:00:00",
      "2020-05-01T10:00:00",
      "dd-MM-yyyy HH:mm:ss"
    );

    expect(exactDateConstraint.validate("01-04-2020 09:00:00")).toBeFalsy();
    expect(exactDateConstraint.validate("01-05-2020 09:00:00")).toBeTruthy();

    const betweenDatesConstraint = new DateBoundaryConstraint(
      "datetime",
      "2020-05-01T08:00:00",
      "2020-05-10T10:00:00",
      "dd-MM-yyyy HH:mm:ss"
    );

    expect(betweenDatesConstraint.validate("01-05-2020 08:00:00")).toBeTruthy();
    expect(betweenDatesConstraint.validate("30-04-2020 08:00:00")).toBeFalsy();
    expect(betweenDatesConstraint.validate("11-05-2020 08:00:00")).toBeFalsy();

    const minDateConstraint = new DateBoundaryConstraint(
      "datetime",
      "2020-01-01T08:00:00",
      null,
      "dd-MM-yyyy HH:mm:ss"
    );

    expect(minDateConstraint.validate("01-07-2020 08:00:00")).toBeTruthy();
    expect(minDateConstraint.validate("01-07-2019 08:00:00")).toBeFalsy();

    const maxDateConstraint = new DateBoundaryConstraint(
      "datetime",
      null,
      "2020-08-17T13:40:46",
      "dd-MM-yyyy HH:mm:ss"
    );

    expect(maxDateConstraint.validate("01-07-2020 08:00:00")).toBeTruthy();
    expect(maxDateConstraint.validate("18-0-2020 08:00:00")).toBeFalsy();
  });
});

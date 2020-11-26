import {
  DateUtil,
  TimeUtil,
  TimestampUtil,
  ISO_DATE_FORMAT,
  ISO_TIME_FORMAT,
  ISO_TIMESTAMP_FORMAT,
} from "beinformed/utils/datetime/DateTimeUtil";

describe("DateTimeUtil", () => {
  test("Should convert java date time format to moment date time format", () => {
    expect(DateUtil.convertFormat()).toBe(ISO_DATE_FORMAT);
    expect(TimeUtil.convertFormat()).toBe(ISO_TIME_FORMAT);
    expect(TimestampUtil.convertFormat()).toBe(ISO_TIMESTAMP_FORMAT);

    expect(DateUtil.convertFormat("yyyy-MM-dd")).toBe("yyyy-MM-dd");
    expect(TimeUtil.convertFormat("HH:mm:ss")).toBe("HH:mm:ss");
    expect(TimestampUtil.convertFormat("yyyy-MM-dd HH:mm:ss")).toBe(
      "yyyy-MM-dd HH:mm:ss"
    );
  });

  test("Should render iso date to specified format", () => {
    expect(DateUtil.toFormat("2017-06-13", "dd-MM-yyyy")).toBe("13-06-2017");
    expect(DateUtil.toFormat("2017-06-13", "MM-dd-yyyy")).toBe("06-13-2017");
  });

  test("Should render specified format to iso date", () => {
    expect(DateUtil.toISO("13-06-2017", "dd-MM-yyyy")).toBe("2017-06-13");
    expect(DateUtil.toISO("06-13-2017", "MM-dd-yyyy")).toBe("2017-06-13");
  });

  test("Should render iso time to specified format", () => {
    expect(TimeUtil.toFormat("14:15:12", "HH:mm")).toBe("14:15");
    expect(TimeUtil.toFormat("14:15:12", "h:mm")).toBe("2:15");
    expect(TimeUtil.toFormat("23:15:12", "h:mm")).toBe("11:15");
  });

  test("Should render specified format to iso time", () => {
    expect(TimeUtil.toISO("14:15", "HH:mm")).toBe("14:15:00");
    expect(TimeUtil.toISO("2:15 AM", "h:mm aa")).toBe("02:15:00");
    expect(TimeUtil.toISO("02:15 PM", "hh:mm aa")).toBe("14:15:00");
    expect(TimeUtil.toISO("11:15 AM", "h:mm aa")).toBe("11:15:00");
  });

  test("Should render iso timestamp to specified format", () => {
    expect(
      TimestampUtil.toFormat("2017-06-13T14:15:12.000", "dd-MM-yyyy HH:mm")
    ).toBe("13-06-2017 14:15");
    expect(TimestampUtil.toFormat("2017-06-13T14:15:12.000", "h:mm")).toBe(
      "2:15"
    );
    expect(
      TimestampUtil.toFormat("2017-06-13T23:15:12.000", "dd-MM-yyyy")
    ).toBe("13-06-2017");
  });

  test("Should render specified format to iso timestamp", () => {
    expect(TimestampUtil.toISO("13-06-2017 14:15", "dd-MM-yyyy HH:mm")).toBe(
      "2017-06-13T14:15:00.000"
    );
    expect(TimestampUtil.toISO("13-06-2017 2:15", "dd-MM-yyyy h:mm")).toBe(
      "2017-06-13T02:15:00.000"
    );
    expect(TimestampUtil.toISO("13-06-2017", "dd-MM-yyyy")).toBe(
      "2017-06-13T00:00:00.000"
    );
  });

  test("Should return invalid date when date entered is not a date", () => {
    expect(DateUtil.toISO("bla", "dd-MM-yyyy")).toBe("Invalid Date");
    expect(TimeUtil.toISO("bla", "HH:mm")).toBe("Invalid Date");
    expect(TimestampUtil.toISO("bla", "dd-MM-yyyy HH:mm")).toBe("Invalid Date");
  });

  test("hasFormat", () => {
    expect(DateUtil.hasFormat("18-10-1980", "dd-MM-yyyy")).toBeTruthy();
    expect(DateUtil.hasFormat("18-1-1980", "dd-MM-yyyy")).toBeTruthy();
    expect(DateUtil.hasFormat("18-1980", "dd-MM-yyyy")).toBeFalsy();
  });

  test("isValid", () => {
    expect(DateUtil.isValid("18-10-1980", "dd-MM-yyyy")).toBeTruthy();
    expect(TimeUtil.isValid("13:20", "HH:mm")).toBeTruthy();
    expect(TimestampUtil.isValid("18-10-1980 13:20", "dd-MM-yyyy HH:mm")).toBe(
      true
    );

    expect(DateUtil.isValid("bla", "dd-MM-yyyy")).toBeFalsy();
    expect(TimeUtil.isValid("bla", "HH:mm")).toBeFalsy();
    expect(TimestampUtil.isValid("bla", "dd-MM-yyyy HH:mm")).toBeFalsy();
  });

  test("isAfter", () => {
    expect(DateUtil.isAfter("1980-10-18", "1980-10-17")).toBeTruthy();
    expect(TimeUtil.isAfter("13:20:00", "13:19:00")).toBeTruthy();
    expect(
      TimestampUtil.isAfter(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:19:00.000"
      )
    ).toBeTruthy();

    expect(DateUtil.isAfter("1980-10-18", "1980-10-18")).toBeFalsy();
    expect(TimeUtil.isAfter("13:20:00", "13:20:00")).toBeFalsy();
    expect(
      TimestampUtil.isAfter(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:20:00.000"
      )
    ).toBeFalsy();

    expect(DateUtil.isAfter("1980-10-18", "1980-10-19")).toBeFalsy();
    expect(TimeUtil.isAfter("13:20:00", "13:21:00")).toBeFalsy();
    expect(
      TimestampUtil.isAfter(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:21:00.000"
      )
    ).toBeFalsy();
  });

  test("isSameOrAfter", () => {
    expect(DateUtil.isSameOrAfter("1980-10-18", "1980-10-17")).toBeTruthy();
    expect(TimeUtil.isSameOrAfter("13:20:00", "13:19:00")).toBeTruthy();
    expect(
      TimestampUtil.isSameOrAfter(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:19:00.000"
      )
    ).toBeTruthy();

    expect(DateUtil.isSameOrAfter("1980-10-18", "1980-10-18")).toBeTruthy();
    expect(TimeUtil.isSameOrAfter("13:20:00", "13:20:00")).toBeTruthy();
    expect(
      TimestampUtil.isSameOrAfter(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:20:00.000"
      )
    ).toBeTruthy();

    expect(DateUtil.isSameOrAfter("1980-10-18", "1980-10-19")).toBeFalsy();
    expect(TimeUtil.isSameOrAfter("13:20:00", "13:21:00")).toBeFalsy();
    expect(
      TimestampUtil.isSameOrAfter(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:21:00.000"
      )
    ).toBeFalsy();
  });

  test("isBefore", () => {
    expect(DateUtil.isBefore("1980-10-18", "1980-10-17")).toBeFalsy();
    expect(TimeUtil.isBefore("13:20:00", "13:19:00")).toBeFalsy();
    expect(
      TimestampUtil.isBefore(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:19:00.000"
      )
    ).toBeFalsy();

    expect(DateUtil.isBefore("1980-10-18", "1980-10-18")).toBeFalsy();
    expect(TimeUtil.isBefore("13:20:00", "13:20:00")).toBeFalsy();
    expect(
      TimestampUtil.isBefore(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:20:00.000"
      )
    ).toBeFalsy();

    expect(DateUtil.isBefore("1980-10-18", "1980-10-19")).toBeTruthy();
    expect(TimeUtil.isBefore("13:20:00", "13:21:00")).toBeTruthy();
    expect(
      TimestampUtil.isBefore(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:21:00.000"
      )
    ).toBeTruthy();
  });

  test("isSameOrBefore", () => {
    expect(DateUtil.isSameOrBefore("1980-10-18", "1980-10-17")).toBeFalsy();
    expect(TimeUtil.isSameOrBefore("13:20:00", "13:19:00")).toBeFalsy();
    expect(
      TimestampUtil.isSameOrBefore(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:19:00.000"
      )
    ).toBeFalsy();

    expect(DateUtil.isSameOrBefore("1980-10-18", "1980-10-18")).toBeTruthy();
    expect(TimeUtil.isSameOrBefore("13:20:00", "13:20:00")).toBeTruthy();
    expect(
      TimestampUtil.isSameOrBefore(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:20:00.000"
      )
    ).toBeTruthy();

    expect(DateUtil.isSameOrBefore("1980-10-18", "1980-10-19")).toBeTruthy();
    expect(TimeUtil.isSameOrBefore("13:20:00", "13:21:00")).toBeTruthy();
    expect(
      TimestampUtil.isSameOrBefore(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:21:00.000"
      )
    ).toBeTruthy();
  });

  test("isSame", () => {
    expect(DateUtil.isSame("1980-10-18", "1980-10-17")).toBeFalsy();
    expect(TimeUtil.isSame("13:20:00", "13:19:00")).toBeFalsy();
    expect(
      TimestampUtil.isSame("1980-10-18T13:20:00.000", "1980-10-18T13:19:00.000")
    ).toBeFalsy();

    expect(DateUtil.isSame("1980-10-18", "1980-10-18")).toBeTruthy();
    expect(TimeUtil.isSame("13:20:00", "13:20:00")).toBeTruthy();
    expect(
      TimestampUtil.isSame("1980-10-18T13:20:00.000", "1980-10-18T13:20:00.000")
    ).toBeTruthy();

    expect(DateUtil.isSame("1980-10-18", "1980-10-19")).toBeFalsy();
    expect(TimeUtil.isSame("13:20:00", "13:21:00")).toBeFalsy();
    expect(
      TimestampUtil.isSame("1980-10-18T13:20:00.000", "1980-10-18T13:21:00.000")
    ).toBeFalsy();
  });

  test("isSameDay", () => {
    expect(DateUtil.isSameDay("1980-10-18", "1980-10-17")).toBeFalsy();
    expect(DateUtil.isSameDay("1980-10-18", "1980-10-18")).toBeTruthy();
    expect(
      TimestampUtil.isSameDay(
        "1980-10-18T13:20:00.000",
        "1980-10-19T13:19:00.000"
      )
    ).toBeFalsy();
    expect(
      TimestampUtil.isSameDay(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:19:00.000"
      )
    ).toBeTruthy();
  });

  test("isOther", () => {
    expect(DateUtil.isOther("1980-10-18", "1980-10-17")).toBeTruthy();
    expect(TimeUtil.isOther("13:20:00", "13:19:00")).toBeTruthy();
    expect(
      TimestampUtil.isOther(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:19:00.000"
      )
    ).toBeTruthy();

    expect(DateUtil.isOther("1980-10-18", "1980-10-18")).toBeFalsy();
    expect(TimeUtil.isOther("13:20:00", "13:20:00")).toBeFalsy();
    expect(
      TimestampUtil.isOther(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:20:00.000"
      )
    ).toBeFalsy();

    expect(DateUtil.isOther("1980-10-18", "1980-10-19")).toBeTruthy();
    expect(TimeUtil.isOther("13:20:00", "13:21:00")).toBeTruthy();
    expect(
      TimestampUtil.isOther(
        "1980-10-18T13:20:00.000",
        "1980-10-18T13:21:00.000"
      )
    ).toBeTruthy();
  });

  test("isWeekend", () => {
    expect(DateUtil.isWeekend("2018-12-14")).toBeFalsy();
    expect(DateUtil.isWeekend("2018-12-15")).toBeTruthy();
    expect(DateUtil.isWeekend("2018-12-16")).toBeTruthy();
    expect(DateUtil.isWeekend("2018-12-17")).toBeFalsy();
    expect(DateUtil.isWeekend("2018-12-18")).toBeFalsy();
    expect(DateUtil.isWeekend("2018-12-19")).toBeFalsy();
    expect(DateUtil.isWeekend("2018-12-20")).toBeFalsy();
  });

  test("addSeconds", () => {
    expect(DateUtil.addSeconds("1980-01-01", 1)).toBe("1980-01-01");
    expect(TimeUtil.addSeconds("13:20:00", 1)).toBe("13:20:01");
    expect(TimestampUtil.addSeconds("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-01T13:20:01.000"
    );
  });

  test("addMinutes", () => {
    expect(DateUtil.addMinutes("1980-01-01", 1)).toBe("1980-01-01");
    expect(TimeUtil.addMinutes("13:20:00", 1)).toBe("13:21:00");
    expect(TimestampUtil.addMinutes("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-01T13:21:00.000"
    );
  });

  test("addHours", () => {
    expect(DateUtil.addHours("1980-01-01", 1)).toBe("1980-01-01");
    expect(TimeUtil.addHours("13:20:00", 1)).toBe("14:20:00");
    expect(TimestampUtil.addHours("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-01T14:20:00.000"
    );
  });

  test("addDays", () => {
    expect(DateUtil.addDays("1980-01-01", 1)).toBe("1980-01-02");
    expect(TimeUtil.addDays("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.addDays("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-02T13:20:00.000"
    );
  });

  test("addWeeks", () => {
    expect(DateUtil.addWeeks("1980-01-01", 1)).toBe("1980-01-08");
    expect(TimeUtil.addWeeks("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.addWeeks("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-08T13:20:00.000"
    );
  });

  test("addMonths", () => {
    expect(DateUtil.addMonths("1980-01-01", 1)).toBe("1980-02-01");
    expect(TimeUtil.addMonths("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.addMonths("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-02-01T13:20:00.000"
    );
  });

  test("addYears", () => {
    expect(DateUtil.addYears("1980-01-01", 1)).toBe("1981-01-01");
    expect(TimeUtil.addYears("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.addYears("1980-01-01T13:20:00.000", 1)).toBe(
      "1981-01-01T13:20:00.000"
    );
  });

  test("subtractSeconds", () => {
    expect(DateUtil.subtractSeconds("1980-01-01", 1)).toBe("1979-12-31");
    expect(TimeUtil.subtractSeconds("13:20:00", 1)).toBe("13:19:59");
    expect(TimestampUtil.subtractSeconds("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-01T13:19:59.000"
    );
  });

  test("subtractMinutes", () => {
    expect(DateUtil.subtractMinutes("1980-01-01", 1)).toBe("1979-12-31");
    expect(TimeUtil.subtractMinutes("13:20:00", 1)).toBe("13:19:00");
    expect(TimestampUtil.subtractMinutes("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-01T13:19:00.000"
    );
  });

  test("subtractHours", () => {
    expect(DateUtil.subtractHours("1980-01-01", 1)).toBe("1979-12-31");
    expect(TimeUtil.subtractHours("13:20:00", 1)).toBe("12:20:00");
    expect(TimestampUtil.subtractHours("1980-01-01T13:20:00.000", 1)).toBe(
      "1980-01-01T12:20:00.000"
    );
  });

  test("subtractDays", () => {
    expect(DateUtil.subtractDays("1980-01-01", 1)).toBe("1979-12-31");
    expect(TimeUtil.subtractDays("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.subtractDays("1980-01-01T13:20:00.000", 1)).toBe(
      "1979-12-31T13:20:00.000"
    );
  });

  test("subtractWeeks", () => {
    expect(DateUtil.subtractWeeks("1980-01-01", 1)).toBe("1979-12-25");
    expect(TimeUtil.subtractWeeks("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.subtractWeeks("1980-01-01T13:20:00.000", 1)).toBe(
      "1979-12-25T13:20:00.000"
    );
  });

  test("subtractMonths", () => {
    expect(DateUtil.subtractMonths("1980-01-01", 1)).toBe("1979-12-01");
    expect(TimeUtil.subtractMonths("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.subtractMonths("1980-01-01T13:20:00.000", 1)).toBe(
      "1979-12-01T13:20:00.000"
    );
  });

  test("subtractYears", () => {
    expect(DateUtil.subtractYears("1980-01-01", 1)).toBe("1979-01-01");
    expect(TimeUtil.subtractYears("13:20:00", 1)).toBe("13:20:00");
    expect(TimestampUtil.subtractYears("1980-01-01T13:20:00.000", 1)).toBe(
      "1979-01-01T13:20:00.000"
    );
  });

  test("startOfMonth", () => {
    expect(DateUtil.startOfMonth("1980-01-15")).toBe("1980-01-01");
  });

  test("startOfWeek", () => {
    expect(DateUtil.startOfWeek("1980-01-15")).toBe("1980-01-14");
  });

  test("getWeek", () => {
    expect(DateUtil.getWeek("1980-01-15")).toBe(3);
  });

  test("getHours", () => {
    expect(TimeUtil.getHours("13:20:00")).toBe(13);
    expect(TimestampUtil.getHours("1980-01-01T13:20:00.000")).toBe(13);
  });

  test("getMinutes", () => {
    expect(TimeUtil.getMinutes("13:20:00")).toBe(20);
    expect(TimestampUtil.getMinutes("1980-01-01T13:20:00.000")).toBe(20);
  });

  test("setSecond", () => {
    expect(DateUtil.setSecond("1980-01-01", 22)).toBe("1980-01-01");
    expect(TimeUtil.setSecond("13:20:00", 22)).toBe("13:20:22");
    expect(TimestampUtil.setSecond("1980-01-01T13:20:00.000", 22)).toBe(
      "1980-01-01T13:20:22.000"
    );
  });

  test("setMinute", () => {
    expect(DateUtil.setMinute("1980-01-01", 22)).toBe("1980-01-01");
    expect(TimeUtil.setMinute("13:20:00", 22)).toBe("13:22:00");
    expect(TimestampUtil.setMinute("1980-01-01T13:20:00.000", 22)).toBe(
      "1980-01-01T13:22:00.000"
    );
  });

  test("setHour", () => {
    expect(DateUtil.setHour("1980-01-01", 22)).toBe("1980-01-01");
    expect(TimeUtil.setHour("13:20:00", 22)).toBe("22:20:00");
    expect(TimestampUtil.setHour("1980-01-01T13:20:00.000", 22)).toBe(
      "1980-01-01T22:20:00.000"
    );
  });

  test("setMonth", () => {
    expect(DateUtil.setMonth("1980-01-01", 6)).toBe("1980-07-01");
    expect(TimeUtil.setMonth("13:20:00", 6)).toBe("13:20:00");
    expect(TimestampUtil.setMonth("1980-01-01T13:20:00.000", 6)).toBe(
      "1980-07-01T13:20:00.000"
    );
  });

  test("setYear", () => {
    expect(DateUtil.setYear("1980-01-01", 1986)).toBe("1986-01-01");
    expect(TimeUtil.setYear("13:20:00", 1986)).toBe("13:20:00");
    expect(TimestampUtil.setYear("1980-01-01T13:20:00.000", 1986)).toBe(
      "1986-01-01T13:20:00.000"
    );
  });
});

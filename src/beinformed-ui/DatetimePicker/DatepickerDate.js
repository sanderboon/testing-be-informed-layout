// @flow
import { useState } from "react";
import classNames from "classnames";

import {
  DateUtil,
  ISO_TIMESTAMP_FORMAT,
  TimestampUtil,
} from "beinformed/utils/datetime/DateTimeUtil";

import {
  DatepickerDateDays,
  DatepickerDateDecades,
  DatepickerDateMonths,
  DatepickerDateToolbar,
  DatepickerDateYears,
} from "_component-registry/datetimepicker";

export type Props = {
  +className?: string,
  +date: string,
  +maxdate: ?string,
  +mindate: ?string,
  +outputFormat: string,
  +renderOtherDays?: boolean,
  +onClick: (date: string) => void,
};

const DatepickerDate = ({
  className,
  date,
  maxdate,
  mindate,
  outputFormat,
  renderOtherDays = true,
  onClick,
}: Props) => {
  const [type, setType] = useState("days");
  const [isoDate, setIsoDate] = useState(
    DateUtil.toISO(date, ISO_TIMESTAMP_FORMAT)
  );

  const handleSelect = (value: string) => {
    const time = TimestampUtil.toFormat(date, "HH:mm:ss");

    onClick(TimestampUtil.toFormat(`${value}T${time}.000`, outputFormat));
  };

  /**
   * Process picked value, depending on view type
   */
  const handleClick = (value: string) => {
    const newTypeMap = {
      months: "days",
      years: "months",
      decades: "years",
    };

    if (type in newTypeMap && type !== "days") {
      setIsoDate(value);
      setType(newTypeMap[type]);
    } else {
      handleSelect(value);
    }
  };

  const handleKeyDown = (value: string) => {
    setIsoDate(value);
  };

  const calendarMap = {
    days: DatepickerDateDays,
    months: DatepickerDateMonths,
    years: DatepickerDateYears,
    decades: DatepickerDateDecades,
  };

  const DatepickerPeriod = calendarMap[type];

  return (
    <div className={classNames("datepicker-date", className)}>
      <DatepickerDateToolbar
        date={isoDate}
        type={type}
        onChange={(value: string) => setIsoDate(value)}
        onSwitch={(value: "days" | "months" | "years" | "decades") =>
          setType(value)
        }
      />
      {type === "days" ? (
        <DatepickerDateDays
          date={isoDate}
          renderOther={renderOtherDays}
          mindate={mindate}
          maxdate={maxdate}
          onClick={handleClick}
          onCalKeyDown={handleKeyDown}
        />
      ) : (
        <DatepickerPeriod
          date={isoDate}
          mindate={mindate}
          maxdate={maxdate}
          onClick={handleClick}
          onCalKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

DatepickerDate.displayName = "BI.DatepickerDate";

export default DatepickerDate;

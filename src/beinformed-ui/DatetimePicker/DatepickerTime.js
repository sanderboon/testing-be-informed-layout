// @flow
import { useState } from "react";

import {
  TimeUtil,
  TimestampUtil,
  ISO_TIMESTAMP_FORMAT,
} from "beinformed/utils/datetime/DateTimeUtil";

import {
  DatepickerTimeHours,
  DatepickerTimeMinutes,
  DatepickerTimeSeconds,
  DatepickerTimeSelect,
} from "_component-registry/datetimepicker";

export type Props = {
  +className?: string,
  +outputFormat: string,
  +time: string,
  +onConfirm: (date: string) => void,
};

const DatepickerTime = ({
  className,
  outputFormat,
  time,
  onConfirm,
}: Props) => {
  const [isoTime, setIsoTime] = useState(
    TimeUtil.toISO(time, ISO_TIMESTAMP_FORMAT)
  );
  const [type, setType] = useState("select");

  const handleConfirm = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    const date = TimestampUtil.toFormat(time, "yyyy-MM-dd");
    onConfirm(TimestampUtil.toFormat(`${date}T${isoTime}.000`, outputFormat));
  };

  const getTimeByType = (value) => {
    switch (type) {
      case "hours":
        return TimeUtil.setHour(isoTime, value);
      case "minutes":
        return TimeUtil.setMinute(isoTime, value);
      case "seconds":
        return TimeUtil.setSecond(isoTime, value);
      default:
        return isoTime;
    }
  };

  const handleClick = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement && type !== "select") {
      const value = parseInt(e.target.dataset.value, 10);

      setIsoTime(getTimeByType(value));
      setType("select");
    }
  };

  const has12Hours = outputFormat.includes("h");

  switch (type) {
    case "select":
      return (
        <div className={className}>
          <DatepickerTimeSelect
            time={isoTime}
            outputFormat={outputFormat}
            onConfirm={handleConfirm}
            onClick={(newType) => setType(newType)}
            onChange={(newTime) => setIsoTime(newTime)}
          />
        </div>
      );

    case "hours":
      return (
        <div className={className}>
          <DatepickerTimeHours
            has12HoursFormat={has12Hours}
            onClick={handleClick}
          />
        </div>
      );

    case "minutes":
      return (
        <div className={className}>
          <DatepickerTimeMinutes onClick={handleClick} />
        </div>
      );

    case "seconds":
      return (
        <div className={className}>
          <DatepickerTimeSeconds onClick={handleClick} />
        </div>
      );

    default:
      return null;
  }
};

DatepickerTime.displayName = "BI.DatepickerTime";

export default DatepickerTime;

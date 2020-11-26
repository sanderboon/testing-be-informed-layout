// @flow
import { useState } from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";

import { ISO_DATE_FORMAT } from "beinformed/constants/Constants";
import { getSetting } from "beinformed/constants/Settings";

import { DateInput, TimeInput } from "_component-registry/input";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +autoComplete?: "on" | "off" | "new-password",
  +type?: string,
  +children?: Node,
  +className?: string,
  +disabled?: boolean,
  +format?: string,
  +dateInputValue?: string,
  +timeInputValue?: string,
  +dateInputFormat?: string,
  +timeInputFormat?: string,
  +id?: string,
  +inFilterContext?: boolean,
  +inError?: boolean,
  +maxdate?: string | null,
  +mindate?: string | null,
  +name: string,
  +placeholder?: string,
  +readOnly?: boolean,
  +value: string,
  +append?: any,
  +onValueChange: (value: any) => void,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
  +onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onFocus?: (e: SyntheticInputEvent<*>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  +onKeyUp?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
};

const getTimeInputWidth = (format: string): string => {
  const MINIMAL_WIDTH_REM = 2.3;

  // strip separators from format because they don't require much space in the input field
  const formatLength = format ? format.replace(":", "").length : 6;
  const inputWidth = MINIMAL_WIDTH_REM + formatLength * 0.5;

  return `${inputWidth}rem`;
};

const getDatetime = (date?: string, time?: string): string => {
  if (date && time) {
    return `${date} ${time}`;
  }

  if (date) {
    return date;
  }

  if (time) {
    return time;
  }

  return "";
};

const StyledDateInput = styled(DateInput)`
  flex-wrap: nowrap;

  ${({ inFilterContext }) =>
    !inFilterContext &&
    css`
      .form-control {
        width: 7rem;
      }
    `}

  ${({ hasTime }) =>
    hasTime
      ? css`
          margin-right: 10px;
          display: inline-flex;
        `
      : css`
          display: flex;
        `};
`;

const StyledTimeInput = styled(TimeInput)`
  display: ${({ hasDate }) => (hasDate ? "inline-flex" : "flex")};
  flex-wrap: nowrap;

  .form-control {
    width: ${({ format }) => getTimeInputWidth(format)};
  }
`;

const StyledDatetimeInput = styled.div`
  display: inline-flex;
  height: calc(2.25rem + 2px);
`;

const DatetimeInput = ({
  format = ISO_DATE_FORMAT,
  dateInputValue,
  timeInputValue,
  dateInputFormat,
  timeInputFormat,
  className,
  inFilterContext,
  onChange,
  onValueChange,
  value = "",
  type = "text",
  readOnly = false,
  disabled = false,
  placeholder,
  mindate,
  maxdate,
  ...inputProps
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(dateInputValue);
  const [selectedTime, setSelectedTime] = useState(timeInputValue);

  const WIDGET_DATE_INPUT_FORMAT = getSetting("DATE_INPUT_FORMAT");

  const hasDateValue = /[DMY]/gu.test(format);
  const hasTimeValue = /[Hms]/gu.test(format);

  const handleValueChange = (date?: string, time?: string) =>
    onValueChange(getDatetime(date, time));

  // handle date input change event
  const handleDateChangeEvent = (e: SyntheticInputEvent<any>) => {
    const currentDate = e.target.value;

    setSelectedDate(currentDate);
    handleValueChange(currentDate, selectedTime);
  };

  // handle time input change event
  const handleTimeChangeEvent = (e: SyntheticInputEvent<any>) => {
    const currentTime = e.target.value;
    setSelectedTime(currentTime);
    handleValueChange(selectedDate, currentTime);
  };

  // date picker event
  const handleDateSelect = (dateInput) => {
    setSelectedDate(dateInput);
    handleValueChange(dateInput, selectedTime);
  };

  // time picker event
  const handleTimeSelect = (timeInput) => {
    setSelectedTime(timeInput);
    handleValueChange(selectedDate, timeInput);
  };

  return (
    <StyledDatetimeInput className={classNames("datetime-input", className)}>
      {hasDateValue && (
        <StyledDateInput
          {...inputProps}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          inFilterContext={inFilterContext}
          format={inFilterContext ? format : dateInputFormat}
          hasTime={hasTimeValue}
          placeholder={
            inFilterContext
              ? placeholder
              : WIDGET_DATE_INPUT_FORMAT.toLowerCase()
          }
          value={inFilterContext ? value : selectedDate}
          mindate={
            mindate && !inFilterContext ? mindate.split("T")[0] : mindate
          }
          maxdate={
            maxdate && !inFilterContext ? maxdate.split("T")[0] : maxdate
          }
          onChange={inFilterContext ? onChange : handleDateChangeEvent}
          onValueChange={inFilterContext ? onValueChange : handleDateSelect}
        />
      )}
      {hasTimeValue && !inFilterContext && (
        <StyledTimeInput
          {...inputProps}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          format={timeInputFormat}
          hasDate={hasDateValue}
          placeholder={timeInputFormat && timeInputFormat.toLowerCase()}
          value={selectedTime}
          onChange={handleTimeChangeEvent}
          onValueChange={handleTimeSelect}
        />
      )}
    </StyledDatetimeInput>
  );
};

DatetimeInput.displayName = "BI.DatetimeInput";

export default DatetimeInput;

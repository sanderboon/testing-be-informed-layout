// @flow
import { useState, useEffect, useRef } from "react";

import FocusTrap from "focus-trap-react";

import classNames from "classnames";
import styled from "styled-components";

import { themeProp, roundedCorners } from "beinformed/theme/utils";

import { ISO_DATE_FORMAT } from "beinformed/utils/datetime/DateTimeUtil";

import {
  DatepickerDate,
  DatepickerTime,
  DatepickerToolbar,
} from "_component-registry/datetimepicker";

import { KEYCODES } from "beinformed/constants/Constants";

import { toIso } from "./_utils";

export type Props = {
  +className?: string,
  +date: string,
  +format: string,
  +maxdate?: ?string,
  +mindate?: ?string,
  +renderOtherDays?: boolean,
  +onClick: () => void,
  +onSelect: (date: string) => void,
  +onClose: () => void,
  +onFocus?: (e: SyntheticInputEvent<*>) => void,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
};

const StyledDatetimePicker = styled.div`
  float: left;
  display: block;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background-color: ${themeProp("WHITE")};
  ${roundedCorners()};

  *:focus {
    border-color: ${themeProp("INPUT_FOCUS_BORDER_COLOR", "#80bdff")};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    z-index: 99999;
    position: relative;
  }
`;

const DatetimePicker = ({
  className,
  date,
  format = ISO_DATE_FORMAT,
  maxdate,
  mindate,
  renderOtherDays = true,
  onClick,
  onSelect,
  onClose,
  onFocus,
  onBlur,
}: Props) => {
  const _datetimepicker = useRef(null);

  const hasDate = /[DMY]/gu.test(format);
  const hasTime = /[Hms]/gu.test(format);

  const [type, setType] = useState(hasDate ? "date" : "time");

  useEffect(() => {
    const handleKeyDown = (e: SyntheticKeyboardEvent<any>) => {
      if (e.keyCode === KEYCODES.ESCAPE) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const isoDate = toIso(date, format);

  return (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
      }}
    >
      <StyledDatetimePicker
        ref={_datetimepicker}
        className={classNames("datetimepicker", className)}
        onClick={onClick}
        tabIndex="0"
        role="dialog"
        aria-label="Pick a date"
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {hasDate && type === "date" && (
          <DatepickerDate
            date={isoDate}
            renderOtherDays={renderOtherDays}
            mindate={mindate}
            maxdate={maxdate}
            outputFormat={format}
            onClick={onSelect}
          />
        )}

        {hasTime && type === "time" && (
          <DatepickerTime
            time={isoDate}
            outputFormat={format}
            onConfirm={onSelect}
          />
        )}
        {hasDate && hasTime && (
          <DatepickerToolbar
            datetime={isoDate}
            type={type}
            onSwitch={(value: "date" | "time") => setType(value)}
          />
        )}
      </StyledDatetimePicker>
    </FocusTrap>
  );
};

DatetimePicker.displayName = "BI.DatetimePicker";

export default DatetimePicker;

// @flow
import { useRef, useEffect } from "react";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { KEYCODES } from "beinformed/constants/Constants";

import { getWeeks, isOtherMonth } from "./_utils";

import {
  DatepickerTable,
  DatepickerTableCell,
  DatepickerDateDaysHeader,
} from "_component-registry/datetimepicker";

export type Props = {
  +className?: string,
  +date: string,
  +maxdate: ?string,
  +mindate: ?string,
  +renderOther?: boolean,
  +onCalKeyDown: (value: string) => void,
  +onClick: (value: string) => void,
};

const StyledDay = styled(DatepickerTableCell)`
  ${({ isWeekend, isActive }) =>
    isWeekend &&
    !isActive &&
    css`
      background-color: ${themeProp("CALENDAR_CELL_WEEKEND_B    G", "#f8f9fa")};
    `}
`;

const DatepickerDateDays = ({
  className,
  date,
  mindate,
  maxdate,
  renderOther,
  onClick,
  onCalKeyDown,
}: Props) => {
  const _table = useRef<HTMLTableElement | null>(null);

  const handleSelect = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement) {
      const day = e.target.dataset.value;

      if (
        (!mindate || DateUtil.isSameOrAfter(day, mindate)) &&
        (!maxdate || DateUtil.isSameOrBefore(day, maxdate))
      ) {
        onClick(e.target.dataset.value);
      }
    }
  };

  const handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractDays(date, 1),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addDays(date, 1),
      [KEYCODES.ARROW_DOWN]: DateUtil.addWeeks(date, 1),
      [KEYCODES.ARROW_UP]: DateUtil.subtractWeeks(date, 1),
      [KEYCODES.PAGE_UP]: DateUtil.subtractMonths(date, 1),
      [KEYCODES.PAGE_DOWN]: DateUtil.addMonths(date, 1),
    };

    if (e.keyCode === KEYCODES.SPACE || e.keyCode === KEYCODES.ENTER) {
      e.preventDefault();
      onClick(date);
    } else if (keyMap[e.keyCode]) {
      e.preventDefault();
      onCalKeyDown(keyMap[e.keyCode]);
    }
  };

  useEffect(() => {
    if (_table.current !== null) {
      _table.current.focus();
    }
  }, []);

  return (
    <DatepickerTable
      ref={_table}
      className={classNames("datepicker-calendar datepicker-days", className)}
      onKeyDown={handleKeyDown}
    >
      <DatepickerDateDaysHeader />
      <tbody>
        {getWeeks(date).map((week) => (
          <tr className="datepicker-week" key={week.number}>
            {week.days.map((day) => (
              <StyledDay
                key={`${week.number}-${day}`}
                value={day}
                renderEmpty={isOtherMonth(day, date) && !renderOther}
                isActive={DateUtil.isSame(day, date)}
                isToday={day === DateUtil.now()}
                isOther={isOtherMonth(day, date)}
                isDisabled={
                  (mindate && DateUtil.isBefore(day, mindate)) ||
                  (maxdate && DateUtil.isAfter(day, maxdate))
                }
                isWeekend={DateUtil.isWeekend(day)}
                ariaLabel={DateUtil.toFormat(day, "PPPP")}
                onClick={handleSelect}
              >
                {DateUtil.toFormat(day, "d")}
              </StyledDay>
            ))}
          </tr>
        ))}
      </tbody>
    </DatepickerTable>
  );
};

DatepickerDateDays.displayName = "BI.DatepickerDateDays";

export default DatepickerDateDays;

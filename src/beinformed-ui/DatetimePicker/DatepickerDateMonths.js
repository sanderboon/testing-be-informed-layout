// @flow
import { useEffect, useRef } from "react";

import styled from "styled-components";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { KEYCODES } from "beinformed/constants/Constants";

import {
  DatepickerTable,
  DatepickerTableCell,
} from "_component-registry/datetimepicker";

export type Props = {
  +className?: string,
  +date: string,
  +maxdate: ?string,
  +mindate: ?string,
  +onCalKeyDown: (value: string) => void,
  +onClick: (value: string) => void,
};

const StyledMonth = styled(DatepickerTableCell)`
  line-height: 3.6em;
`;

const DatepickerDateMonths = ({
  className,
  date,
  maxdate,
  mindate,
  onCalKeyDown,
  onClick,
}: Props) => {
  const _table = useRef<HTMLTableElement | null>(null);

  const handleSelect = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement) {
      onClick(e.target.dataset.value);
    }
  };

  const handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const MONTHS_PER_ROW = 3;

    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractMonths(date, 1),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addMonths(date, 1),
      [KEYCODES.ARROW_DOWN]: DateUtil.addMonths(date, MONTHS_PER_ROW),
      [KEYCODES.ARROW_UP]: DateUtil.subtractMonths(date, MONTHS_PER_ROW),
      [KEYCODES.PAGE_UP]: DateUtil.subtractYears(date, 1),
      [KEYCODES.PAGE_DOWN]: DateUtil.addYears(date, 1),
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

  const months = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];

  return (
    <DatepickerTable
      className={className}
      ref={_table}
      onKeyDown={handleKeyDown}
    >
      <tbody>
        {months.map((monthGroup, idx) => (
          <tr key={`monthgroup-${idx}`}>
            {monthGroup.map((m) => {
              const month = DateUtil.setMonth(date, m);

              return (
                <StyledMonth
                  key={month}
                  className={className}
                  value={month}
                  isActive={DateUtil.isSame(month, date)}
                  isDisabled={
                    DateUtil.isBefore(month, mindate) ||
                    DateUtil.isAfter(month, maxdate)
                  }
                  ariaLabel={DateUtil.toFormat(month, "MMMM yyyy")}
                  onClick={handleSelect}
                >
                  {DateUtil.toFormat(month, "MMM")}
                </StyledMonth>
              );
            })}
          </tr>
        ))}
      </tbody>
    </DatepickerTable>
  );
};

DatepickerDateMonths.displayName = "BI.DatepickerDateMonths";

export default DatepickerDateMonths;

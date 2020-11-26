// @flow
import { useEffect, useRef } from "react";

import styled from "styled-components";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { KEYCODES } from "beinformed/constants/Constants";

import {
  DatepickerTable,
  DatepickerTableCell,
} from "_component-registry/datetimepicker";

import { getYears } from "./_utils";

export type Props = {
  +className?: string,
  +date: string,
  +maxdate: ?string,
  +mindate: ?string,
  +onCalKeyDown: (value: string) => void,
  +onClick: (value: string) => void,
};

const StyledYear = styled(DatepickerTableCell)`
  line-height: 3.6em;
`;

const DatepickerDateYears = ({
  className,
  date,
  maxdate,
  mindate,
  onClick,
  onCalKeyDown,
}: Props) => {
  const _table = useRef<HTMLTableElement | null>(null);

  const handleSelect = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement) {
      onClick(e.target.dataset.value);
    }
  };

  const handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const YEARS_IN_DECADE = 10;
    const YEARS_PER_ROW = 3;

    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractYears(date, 1),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addYears(date, 1),
      [KEYCODES.ARROW_DOWN]: DateUtil.addYears(date, YEARS_PER_ROW),
      [KEYCODES.ARROW_UP]: DateUtil.subtractYears(date, YEARS_PER_ROW),
      [KEYCODES.PAGE_UP]: DateUtil.subtractYears(date, YEARS_IN_DECADE),
      [KEYCODES.PAGE_DOWN]: DateUtil.addYears(date, YEARS_IN_DECADE),
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

  const years = getYears(date);

  const NEXT_DECADE_ROW = 3;
  const NEXT_DECADE_COL = 2;

  const [[PREV_DECADE]] = years;
  const NEXT_DECADE = years[NEXT_DECADE_ROW][NEXT_DECADE_COL];

  return (
    <DatepickerTable
      className={className}
      ref={_table}
      onKeyDown={handleKeyDown}
    >
      <tbody>
        {years.map((yearGroup, idx) => (
          <tr key={`yeargroup-${idx}`}>
            {yearGroup.map((y) => {
              const year = DateUtil.setYear(date, y);

              return (
                <StyledYear
                  key={year}
                  className={className}
                  value={year}
                  isActive={DateUtil.isSame(year, date)}
                  isOther={[PREV_DECADE, NEXT_DECADE].includes(y)}
                  isDisabled={
                    DateUtil.isBefore(year, mindate) ||
                    DateUtil.isAfter(year, maxdate)
                  }
                  ariaLabel={DateUtil.toFormat(year, "yyyy")}
                  onClick={handleSelect}
                >
                  {DateUtil.toFormat(year, "yyyy")}
                </StyledYear>
              );
            })}
          </tr>
        ))}
      </tbody>
    </DatepickerTable>
  );
};

DatepickerDateYears.displayName = "BI.DatepickerDateYears";

export default DatepickerDateYears;

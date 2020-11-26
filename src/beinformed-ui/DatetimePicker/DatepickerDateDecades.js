// @flow
import { useEffect, useRef } from "react";
import styled from "styled-components";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { KEYCODES } from "beinformed/constants/Constants";

import {
  DatepickerTable,
  DatepickerTableCell,
} from "_component-registry/datetimepicker";

import { getDecades } from "./_utils";

export type Props = {
  +className?: string,
  +date: string,
  +maxdate: ?string,
  +mindate: ?string,
  +onCalKeyDown: (value: string) => void,
  +onClick: (value: string) => void,
};

const StyledDecade = styled(DatepickerTableCell)`
  line-height: 3.6em;
`;

const DatepickerDateDecades = ({
  className,
  date,
  maxdate,
  mindate,
  onCalKeyDown,
  onClick,
}: Props) => {
  const _table = useRef<HTMLTableElement | null>(null);

  const handleSelect = (e: SyntheticEvent<*>) => {
    const element = e.target;
    if (element instanceof HTMLElement) {
      onClick(element.dataset.value);
    }
  };

  const handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const YEARS_IN_CENTURY = 100;
    const YEARS_IN_DECADE = 10;
    const YEARS_AROUND_CENTURY = 30;

    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractYears(date, YEARS_IN_DECADE),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addYears(date, YEARS_IN_DECADE),
      [KEYCODES.ARROW_DOWN]: DateUtil.addYears(date, YEARS_AROUND_CENTURY),
      [KEYCODES.ARROW_UP]: DateUtil.subtractYears(date, YEARS_AROUND_CENTURY),
      [KEYCODES.PAGE_UP]: DateUtil.subtractYears(date, YEARS_IN_CENTURY),
      [KEYCODES.PAGE_DOWN]: DateUtil.addYears(date, YEARS_IN_CENTURY),
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

  const decades = getDecades(date);

  const NEXT_CENTURY_ROW = 3;
  const NEXT_CENTURY_COL = 2;

  const [[PREV_CENTURY]] = decades;
  const NEXT_CENTURY = decades[NEXT_CENTURY_ROW][NEXT_CENTURY_COL];

  return (
    <DatepickerTable
      ref={_table}
      className={className}
      onKeyDown={handleKeyDown}
    >
      <tbody>
        {decades.map((decadeGroup, idx) => (
          <tr key={`decadegroup-${idx}`}>
            {decadeGroup.map((d) => {
              const decade = DateUtil.setYear(date, d);
              const isOtherCentury = [PREV_CENTURY, NEXT_CENTURY].includes(d);

              const YEARS_IN_DECADE = 10;
              const startDecade = decade;
              const endDecade = DateUtil.addYears(decade, YEARS_IN_DECADE);
              const isActive =
                DateUtil.isAfter(date, startDecade, "yyyy-MM-dd") &&
                DateUtil.isSameOrBefore(date, endDecade, "yyyy-MM-dd");

              const startYear = DateUtil.toFormat(startDecade, "yyyy");
              const endYear = DateUtil.toFormat(endDecade, "yyyy");

              const decadeLabel = `${startYear} - ${endYear}`;

              return (
                <StyledDecade
                  key={decade}
                  className={className}
                  value={decade}
                  isActive={isActive}
                  isOther={isOtherCentury}
                  isDisabled={
                    DateUtil.isBefore(decade, mindate) ||
                    DateUtil.isAfter(decade, maxdate)
                  }
                  ariaLabel={decadeLabel}
                  onClick={handleSelect}
                >
                  {decadeLabel}
                </StyledDecade>
              );
            })}
          </tr>
        ))}
      </tbody>
    </DatepickerTable>
  );
};

DatepickerDateDecades.displayName = "BI.DatepickerDateDecades";

export default DatepickerDateDecades;

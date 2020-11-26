// @flow
import styled, { css } from "styled-components";

import { Message, useMessage } from "beinformed/i18n";

import { DatepickerTableHeaderCell } from "_component-registry/datetimepicker";

import { themeProp } from "beinformed/theme/utils/themeProps";

const StyledHeader = styled(DatepickerTableHeaderCell)`
  ${({ isWeekend }) =>
    isWeekend &&
    css`
      background-color: ${themeProp("CALENDAR_CELL_WEEKEND_BG", "#f8f9fa")};
    `}
`;

export type Props = {
  +className?: string,
};

const DatepickerDateDaysHeader = ({ className }: Props) => (
  <thead className={className}>
    <tr>
      <StyledHeader
        scope="col"
        title={useMessage("Datepicker.Day.Monday", "Monday")}
      >
        <Message id="Datepicker.Day.MondayShort">Mo</Message>
      </StyledHeader>
      <StyledHeader
        scope="col"
        title={useMessage("Datepicker.Day.Tuesday", "Tuesday")}
      >
        <Message id="Datepicker.Day.TuesdayShort">Tu</Message>
      </StyledHeader>
      <StyledHeader
        scope="col"
        title={useMessage("Datepicker.Day.Wednesday", "Wednesday")}
      >
        <Message id="Datepicker.Day.WednesdayShort">We</Message>
      </StyledHeader>
      <StyledHeader
        scope="col"
        title={useMessage("Datepicker.Day.Thursday", "Thursday")}
      >
        <Message id="Datepicker.Day.ThursdayShort">Th</Message>
      </StyledHeader>
      <StyledHeader
        scope="col"
        title={useMessage("Datepicker.Day.Friday", "Friday")}
      >
        <Message id="Datepicker.Day.FridayShort">Fr</Message>
      </StyledHeader>
      <StyledHeader
        isWeekend
        scope="col"
        title={useMessage("Datepicker.Day.Saturday", "Saturday")}
      >
        <Message id="Datepicker.Day.SaturdayShort">Sa</Message>
      </StyledHeader>
      <StyledHeader
        isWeekend
        scope="col"
        title={useMessage("Datepicker.Day.Sunday", "Sunday")}
      >
        <Message id="Datepicker.Day.SundayShort">Su</Message>
      </StyledHeader>
    </tr>
  </thead>
);

DatepickerDateDaysHeader.displayName = "BI.DatepickerDateDaysHeader";

export default DatepickerDateDaysHeader;

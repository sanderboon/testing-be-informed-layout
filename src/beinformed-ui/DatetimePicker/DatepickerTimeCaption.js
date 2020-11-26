// @flow
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

const DatepickerTimeCaption = styled.div`
  background-color: ${themeProp("CALENDAR_TITLE_BG")};
  color: ${themeProp("CALENDAR_TITLE_COLOR")};
  padding: ${spacer(0.5)};
  text-align: center;
  font-weight: ${themeProp("FONT_WEIGHT_BOLD")};
  font-size: ${themeProp("FONT_SIZE_SMALL")};
`;
DatepickerTimeCaption.displayName = "BI.DatepickerTimeCaption";

export default DatepickerTimeCaption;

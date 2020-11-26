// @flow

import styled from "styled-components";
import { themeProp, darkenColor, spacers } from "beinformed/theme/utils";

import { mdiCalendar, mdiClock } from "@mdi/js";

import { TimestampUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { KEYCODES } from "beinformed/constants/Constants";

import { Icon } from "_component-registry/icon";

export type Props = {
  +className?: string,
  +datetime: string,
  +type: string,
  +iconDate?: string,
  +iconTime?: string,
  +onSwitch: (type: "time" | "date") => void,
};

const StyledToolbarButton = styled.button`
  width: 100%;
  border: 0;
  color: ${themeProp("GREY_900", "#212529")};
  text-align: center;
  vertical-align: middle;
  padding: ${spacers(0.375, 0.75)};
  cursor: pointer;
  background-color: ${themeProp("GREY_100", "#f8f9fa")};

  &:focus,
  &:hover {
    color: ${themeProp("GREY_900", "#212529")};
    background-color: ${darkenColor(0.1, "GREY_100", "#f8f9fa")};
    text-decoration: none;
  }
  &:active {
    color: ${themeProp("GREY_900", "#212529")};
    background-color: ${darkenColor(0.1, "GREY_100", "#f8f9fa")};
  }
`;

/**
 * Render date field
 */
const DatepickerToolbar = ({
  className,
  datetime,
  type,
  iconDate = mdiCalendar,
  iconTime = mdiClock,
  onSwitch,
}: Props) => {
  const format = type === "date" ? "HH:mm:ss" : "dd-MM-yyyy";
  const switchType = type === "date" ? "time" : "date";

  return (
    <div className={className}>
      <StyledToolbarButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onSwitch(switchType);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
            e.preventDefault();
            onSwitch(switchType);
          }
        }}
      >
        <Icon path={type === "date" ? iconDate : iconTime} textAfter />
        {TimestampUtil.toFormat(datetime, format)}
      </StyledToolbarButton>
    </div>
  );
};

DatepickerToolbar.displayName = "BI.DatepickerToolbar";

export default DatepickerToolbar;

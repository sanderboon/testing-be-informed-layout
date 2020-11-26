// @flow
import styled from "styled-components";
import { roundedCorners, spacer } from "beinformed/theme/utils";
import classNames from "classnames";

import { mdiArrowUp, mdiArrowDown } from "@mdi/js";

import { TimeUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { useMessage } from "beinformed/i18n";

import { Icon } from "_component-registry/icon";
import { StyledButton } from "_component-registry/elements";

export type Props = {
  +className?: string,
  +time: string,
  +partName: "hours" | "minutes" | "seconds",
  +upIcon?: string,
  +downIcon?: string,
  +is12HourFormat?: boolean,
  +onChange: (value: string) => void,
  +onClick: (type: "hours" | "minutes" | "seconds") => void,
};

const StyledPart = styled.div`
  text-align: center;
  margin-right: ${spacer()};

  &:last-child {
    margin-right: 0;
  }
`;

const StyledTimeParts = styled(StyledButton)`
  display: block;
  border-radius: 0;
  width: 100%;
`;

const StyledButtonUp = styled(StyledTimeParts)`
  ${roundedCorners("top-left")};
  ${roundedCorners("top-right")};
`;

const StyledButtonContent = styled(StyledTimeParts)`
  padding: 10px ${spacer(0.75)};
`;

const StyledButtonDown = styled(StyledTimeParts)`
  ${roundedCorners("bottom-left")};
  ${roundedCorners("bottom-right")};
`;

/**
 * Renders a DatepickerTimePartButton
 */
const DatepickerTimePartButton = ({
  className,
  time,
  partName,
  upIcon = mdiArrowUp,
  downIcon = mdiArrowDown,
  is12HourFormat = false,
  onChange,
  onClick,
}: Props) => {
  const handleClickUp = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (partName === "hours") {
      return onChange(TimeUtil.addHours(time, 1));
    }

    if (partName === "minutes") {
      return onChange(TimeUtil.addMinutes(time, 1));
    }

    if (partName === "seconds") {
      return onChange(TimeUtil.addSeconds(time, 1));
    }

    return null;
  };

  const handlePartChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onClick(partName);
  };

  const handleClickDown = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (partName === "hours") {
      return onChange(TimeUtil.subtractHours(time, 1));
    }

    if (partName === "minutes") {
      return onChange(TimeUtil.subtractMinutes(time, 1));
    }

    if (partName === "seconds") {
      return onChange(TimeUtil.subtractSeconds(time, 1));
    }

    return null;
  };

  const format = {
    hours: is12HourFormat ? "hh" : "HH",
    minutes: "mm",
    seconds: "ss",
  };

  return (
    <StyledPart className={classNames(`timepicker-${partName}`, className)}>
      <StyledButtonUp
        aria-label={useMessage("DatePicker.up", "Up")}
        onClick={handleClickUp}
      >
        <Icon path={upIcon} />
      </StyledButtonUp>
      <StyledButtonContent onClick={handlePartChange}>
        {TimeUtil.toFormat(time, format[partName])}
      </StyledButtonContent>
      <StyledButtonDown
        aria-label={useMessage("DatePicker.down", "Down")}
        onClick={handleClickDown}
      >
        <Icon path={downIcon} />
      </StyledButtonDown>
    </StyledPart>
  );
};

DatepickerTimePartButton.displayName = "BI.DatepickerTimePartButton";

export default DatepickerTimePartButton;

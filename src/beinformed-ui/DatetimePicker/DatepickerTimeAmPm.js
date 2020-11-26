// @flow
import styled from "styled-components";
import { roundedCorners, spacer } from "beinformed/theme/utils";
import classNames from "classnames";

import { TimeUtil } from "beinformed/utils/datetime/DateTimeUtil";

import { StyledButton } from "_component-registry/elements";

export type Props = {
  +className?: string,
  +time: string,
  +onChange: (value: string) => void,
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

const StyledButtonAm = styled(StyledTimeParts)`
  ${roundedCorners("top-left")};
  ${roundedCorners("top-right")};
`;

const StyledButtonPm = styled(StyledTimeParts)`
  ${roundedCorners("bottom-left")};
  ${roundedCorners("bottom-right")};
`;

const DatepickerTimeAmPm = ({ className, time, onChange }: Props) => {
  const handleClickAm = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return onChange(TimeUtil.subtractHours(time, 12));
  };

  const handleClickPm = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return onChange(TimeUtil.addHours(time, 12));
  };

  const current = TimeUtil.toFormat(time, "aa");

  return (
    <StyledPart className={classNames("timepicker-ampm", className)}>
      <StyledButtonAm
        className={classNames("timepicker-am", { active: current === "AM" })}
        isActive={current === "AM"}
        onClick={handleClickAm}
      >
        AM
      </StyledButtonAm>
      <StyledButtonPm
        className={classNames("timepicker-pm", { active: current === "PM" })}
        isActive={current === "PM"}
        onClick={handleClickPm}
      >
        PM
      </StyledButtonPm>
    </StyledPart>
  );
};

DatepickerTimeAmPm.displayName = "BI.DatepickerTimeAmPm";

export default DatepickerTimeAmPm;

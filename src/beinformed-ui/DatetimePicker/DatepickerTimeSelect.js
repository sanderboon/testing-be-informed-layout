// @flow
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { mdiCheck } from "@mdi/js";

import { useMessage } from "beinformed/i18n";

import {
  DatepickerTimePartButton,
  DatepickerTimeAmPm,
} from "_component-registry/datetimepicker";
import { Icon } from "_component-registry/icon";
import { StyledButton } from "_component-registry/elements";

export type Props = {
  +className?: string,
  +time: string,
  +outputFormat: string,
  +selectIcon?: string,
  +onChange: (value: string) => void,
  +onClick: (type: "select" | "hours" | "minutes" | "seconds") => void,
  +onConfirm: (e: SyntheticEvent<*>) => void,
};

const StyledSelect = styled.div`
  padding: ${spacer()};
`;
const StyledDatepickerParts = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledConfirm = styled.div`
  clear: both;
  margin-top: ${spacer()};
  margin-top: ${spacer()};
`;
const StyledConfirmButton = styled(StyledButton)`
  width: 100%;
`;

/**
 * render
 */
const DatepickerTimeSelect = ({
  className,
  time,
  outputFormat = "",
  selectIcon = mdiCheck,
  onChange,
  onClick,
  onConfirm,
}: Props) => {
  const has24Hours = outputFormat.includes("H");
  const has12Hours = outputFormat.includes("h");
  const hasMinutes = outputFormat.includes("m");
  const hasSeconds = outputFormat.includes("s");
  const hasAmPm = outputFormat.includes("a");

  return (
    <StyledSelect className={className}>
      <StyledDatepickerParts>
        {(has24Hours || has12Hours) && (
          <DatepickerTimePartButton
            time={time}
            partName="hours"
            is12HourFormat={has12Hours}
            onChange={onChange}
            onClick={onClick}
          />
        )}
        {hasMinutes && (
          <DatepickerTimePartButton
            time={time}
            partName="minutes"
            onChange={onChange}
            onClick={onClick}
          />
        )}
        {hasSeconds && (
          <DatepickerTimePartButton
            time={time}
            partName="seconds"
            onChange={onChange}
            onClick={onClick}
          />
        )}
        {hasAmPm && <DatepickerTimeAmPm time={time} onChange={onChange} />}
      </StyledDatepickerParts>
      <StyledConfirm>
        <StyledConfirmButton
          onClick={onConfirm}
          aria-label={useMessage("DatetimePicker.useTime", "Use time")}
        >
          <Icon path={selectIcon} />
        </StyledConfirmButton>
      </StyledConfirm>
    </StyledSelect>
  );
};
DatepickerTimeSelect.displayName = "BI.DatepickerTimeSelect";

export default DatepickerTimeSelect;

// @flow
import {
  DatepickerTimeCaption,
  DatepickerTimeTable,
} from "_component-registry/datetimepicker";
import { Message } from "beinformed/i18n";

export type Props = {
  +className?: string,
  +onClick: (e: SyntheticEvent<*>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
};

/**
 * Render date field
 */
const DatepickerTimeMinutes = ({ className, onClick, onKeyDown }: Props) => {
  const minutes = [
    ["00", "05", "10"],
    ["15", "20", "25"],
    ["30", "35", "40"],
    ["45", "50", "55"],
  ];

  return (
    <div>
      <DatepickerTimeCaption>
        <Message id="DatepickerTimeHours.Minute">Minute</Message>
      </DatepickerTimeCaption>
      <DatepickerTimeTable
        className={className}
        cells={minutes}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

DatepickerTimeMinutes.displayName = "BI.DatepickerTimeMinutes";

export default DatepickerTimeMinutes;

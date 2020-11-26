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
const DatepickerTimeSeconds = ({ className, onClick, onKeyDown }: Props) => {
  const seconds = [
    ["00", "05", "10"],
    ["15", "20", "25"],
    ["30", "35", "40"],
    ["45", "50", "55"],
  ];

  return (
    <div>
      <DatepickerTimeCaption>
        <Message id="DatepickerTimeHours.Seconds">Seconds</Message>
      </DatepickerTimeCaption>
      <DatepickerTimeTable
        className={className}
        cells={seconds}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

DatepickerTimeSeconds.displayName = "BI.DatepickerTimeSeconds";

export default DatepickerTimeSeconds;

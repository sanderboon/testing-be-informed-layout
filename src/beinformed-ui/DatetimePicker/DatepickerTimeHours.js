// @flow
import {
  DatepickerTimeTable,
  DatepickerTimeCaption,
} from "_component-registry/datetimepicker";
import { Message } from "beinformed/i18n";

export type Props = {
  +className?: string,
  +has12HoursFormat?: boolean,
  +onClick: (e: SyntheticEvent<*>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
};

/**
 * Render date field
 */
const DatepickerTimeHours = ({
  className,
  has12HoursFormat,
  onClick,
  onKeyDown,
}: Props) => {
  const hours = has12HoursFormat
    ? [
        ["01", "02", "03"],
        ["04", "05", "06"],
        ["07", "08", "09"],
        ["10", "11", "12"],
      ]
    : [
        ["00", "01", "02", "03"],
        ["04", "05", "06", "07"],
        ["08", "09", "10", "11"],
        ["12", "13", "14", "15"],
        ["16", "17", "18", "19"],
        ["20", "21", "22", "23"],
      ];

  return (
    <div>
      <DatepickerTimeCaption>
        <Message id="DatepickerTimeHours.Hour">Hour</Message>
      </DatepickerTimeCaption>
      <DatepickerTimeTable
        className={className}
        cells={hours}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

DatepickerTimeHours.displayName = "BI.DatepickerTimeHours";

export default DatepickerTimeHours;

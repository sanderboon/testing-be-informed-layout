// @flow
import {
  DatepickerTable,
  DatepickerTableCell,
} from "_component-registry/datetimepicker";

export type Props = {
  +className?: string,
  +cells: Array<Array<string>>,
  +onClick: (e: SyntheticEvent<*>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
};

/**
 * Render date field
 */
const DatepickerTimeTable = ({
  className,
  cells,
  onClick,
  onKeyDown,
}: Props) => (
  <DatepickerTable className={className}>
    <tbody>
      {cells.map((row, i) => (
        <tr key={i}>
          {row.map((cell) => (
            <DatepickerTableCell
              key={`cell-${cell}`}
              value={cell}
              onClick={onClick}
              onKeyDown={onKeyDown}
            >
              {cell}
            </DatepickerTableCell>
          ))}
        </tr>
      ))}
    </tbody>
  </DatepickerTable>
);

DatepickerTimeTable.displayName = "BI.DatepickerTimeTable";

export default DatepickerTimeTable;

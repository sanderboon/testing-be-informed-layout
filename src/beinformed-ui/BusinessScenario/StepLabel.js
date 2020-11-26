// @flow
import classNames from "classnames";

export type Props = {
  +className?: string,
  +X: number,
  +Y: number,
  +text: string,
};

const STEP_LABEL_MAX_LINES = 4;
const MAX_CHARS = 20;
const MARGIN_TEXT = 20;

const StepLabel = ({ className, X, Y, text }: Props) => {
  const lines = [];

  let line = "";
  text.split(" ").forEach((word) => {
    if (`${line} ${word}`.length > MAX_CHARS) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`;
    }
  });
  lines.push(line);

  return (
    <text
      className={classNames("step-label", className)}
      x={X}
      y={Y + MARGIN_TEXT}
      dy="0.71em"
      width="85"
      fontSize="12px"
      textAnchor="middle"
    >
      {lines.map((lineItem, i) => {
        if (i < STEP_LABEL_MAX_LINES) {
          return (
            <tspan key={i} x={X} y={Y + MARGIN_TEXT} dy={`${i}em`}>
              {lineItem}
              {i === STEP_LABEL_MAX_LINES - 1 &&
              lines.length > STEP_LABEL_MAX_LINES
                ? "..."
                : ""}
            </tspan>
          );
        }
        return null;
      })}
    </text>
  );
};

StepLabel.displayName = "BI.StepLabel";

export default StepLabel;

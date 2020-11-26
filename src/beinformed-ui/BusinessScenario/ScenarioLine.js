// @flow
const MARGIN_TOP = 13;
const VERTICAL_DISTANCE = 80;

export type Props = {
  +Y: number,
};

const ScenarioLine = ({ Y }: Props) => (
  <line
    x1="0"
    y1={Y * VERTICAL_DISTANCE + MARGIN_TOP}
    x2="100%"
    y2={Y * VERTICAL_DISTANCE + MARGIN_TOP}
    stroke="#dddddd"
    strokeWidth="1px"
  />
);

ScenarioLine.displayName = "BI.ScenarioLine";

export default ScenarioLine;

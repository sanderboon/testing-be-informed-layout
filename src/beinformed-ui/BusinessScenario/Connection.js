// @flow
export type Props = {
  +X: number,
  +Y: number,
  +nextY: number,
};

const MARGIN_LEFT = 80;
const MARGIN_TOP = 13;
const HORIZONTAL_DISTANCE = 150;
const VERTICAL_DISTANCE = 80;

const Connection = ({ X, Y, nextY }: Props) => {
  const startX = X * HORIZONTAL_DISTANCE + MARGIN_LEFT;
  const startY = Y * VERTICAL_DISTANCE + MARGIN_TOP;
  const endX = startX + HORIZONTAL_DISTANCE;
  const endY = nextY * VERTICAL_DISTANCE + MARGIN_TOP;
  const curveX = startX + (endX - startX) / 2;

  return (
    <path
      d={`M${startX} ${startY} L${curveX} ${startY} ${endX} ${endY}`}
      stroke="#f6bb73"
      fill="transparent"
      strokeWidth="2"
    />
  );
};

Connection.displayName = "BI.Connection";

export default Connection;

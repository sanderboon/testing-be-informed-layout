// @flow
import classNames from "classnames";

import { Link } from "_component-registry/link";
import { Icon } from "_component-registry/icon";
import { StepLabel } from "_component-registry/modelcatalog";

import type { Href } from "beinformed/models";
export type Props = {
  +className?: string,
  +X: number,
  +Y: number,
  +label: string,
  +href: Href,
};

const MARGIN_LEFT = 80;
const MARGIN_TOP = 13;
const HORIZONTAL_DISTANCE = 150;
const VERTICAL_DISTANCE = 80;

const Step = ({ className, X, Y, label, href }: Props) => {
  const stepX = X * HORIZONTAL_DISTANCE + MARGIN_LEFT;
  const stepY = Y * VERTICAL_DISTANCE + MARGIN_TOP;

  return (
    <Link href={href} className={classNames("step", className)}>
      <Icon name="play" />
      <circle
        cx={stepX}
        cy={stepY}
        r={10}
        fill="#EF8400"
        stroke="#f7f7f9"
        strokeWidth="0"
      />
      <StepLabel X={stepX} Y={stepY} text={label} />
    </Link>
  );
};

Step.displayName = "BI.Step";

export default Step;

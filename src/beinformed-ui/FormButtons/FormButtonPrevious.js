// @flow
import classNames from "classnames";

import { Button } from "_component-registry/buttons";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +children?: Node,
  +onClick: Function,
};

const FormButtonPrevious = ({ className, children, onClick }: Props) => (
  <Button
    className={classNames("btn-previous", className)}
    type="button"
    name="previous"
    onClick={onClick}
  >
    {children}
  </Button>
);

FormButtonPrevious.displayName = "BI.FormButtonPrevious";

export default FormButtonPrevious;

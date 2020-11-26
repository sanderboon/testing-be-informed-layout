// @flow
import classNames from "classnames";

import { Button } from "_component-registry/buttons";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +children?: Node,
  +onClick: Function,
};

const FormButtonCancel = ({ className, children, onClick }: Props) => (
  <Button
    className={classNames("btn-cancel", className)}
    buttonStyle="LINK"
    type="button"
    name="close"
    onClick={onClick}
  >
    {children}
  </Button>
);

FormButtonCancel.displayName = "BI.FormButtonCancel";

export default FormButtonCancel;

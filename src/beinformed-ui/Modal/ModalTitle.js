// @flow
import classNames from "classnames";

import { Heading } from "_component-registry/elements";

import type { Node } from "react";
export type Props = { +className?: string, +children?: Node };

const ModalTitle = ({ className, children }: Props) => (
  <Heading as="h2" className={classNames("modal-title", className)}>
    {children}
  </Heading>
);

ModalTitle.displayName = "BI.ModalTitle";

export default ModalTitle;

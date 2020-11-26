// @flow
import classNames from "classnames";

import type { LabelAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: LabelAttributeModel,
  +className?: string,
};

/**
 * Render label attribute form group
 */
const LabelAttribute = ({ attribute, className }: Props) => (
  <h3 className={classNames("labelwidget", className)} data-id={attribute.name}>
    {attribute.label}
  </h3>
);

LabelAttribute.displayName = "BI.LabelAttribute";

export default LabelAttribute;

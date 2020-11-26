// @flow
import classNames from "classnames";

import { Column } from "_component-registry/grid";

export type Props = {
  +className?: string,
  +size?: number,
  +property: propertyJSON,
};

const FormContentPropertiesLabel = ({
  className,
  size = 4,
  property,
}: Props) => (
  <Column className={classNames("label", className)} size={size}>
    {property.mandatory === "true" ? `${property.label} *` : property.label}
  </Column>
);

FormContentPropertiesLabel.displayName = "BI.FormContentPropertiesLabel";

export default FormContentPropertiesLabel;

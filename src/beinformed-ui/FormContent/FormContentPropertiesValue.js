// @flow
import classNames from "classnames";

import { Column } from "_component-registry/grid";
import { Icon } from "_component-registry/icon";

export type Props = {
  +className?: string,
  +size?: number,
  +property: propertyJSON,
};

const FormContentPropertiesValue = ({
  className,
  size = 8,
  property,
}: Props) => {
  if (property.type === "boolean") {
    const iconName =
      property.value && property.value === "true"
        ? "checkbox-marked-outline"
        : "checkbox-blank-outline";

    return (
      <Column className={classNames("value", className)} size={size}>
        <Icon name={iconName} />
      </Column>
    );
  } else if (property.type === "hyperlink" && property.value) {
    return (
      <Column className={classNames("value", className)} size={size}>
        <a href={property.value} target="_blank" rel="noopener noreferrer">
          {property.value}
        </a>
      </Column>
    );
  }

  return (
    <Column className={classNames("value", className)} size={size}>
      {property.value || "-"}
    </Column>
  );
};

FormContentPropertiesValue.displayName = "BI.FormContentPropertiesValue";

export default FormContentPropertiesValue;

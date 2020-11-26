// @flow
import { Icon } from "_component-registry/icon";

export type Props = {
  className?: string,
  property: propertyJSON,
};

/**
 * Concept property value
 */
const ConceptPropertyValue = ({ property }: Props) => {
  if (property.type === "boolean") {
    return property.value && property.value === "true" ? (
      <Icon name="checkbox-marked-outline" />
    ) : (
      <Icon name="checkbox-blank-outline" />
    );
  }

  if (property.type === "hyperlink" && property.value) {
    return (
      <a href={property.value} target="_blank" rel="noopener noreferrer">
        {property.value}
      </a>
    );
  }

  return property.value || "-";
};

ConceptPropertyValue.displayName = "BI.ConceptPropertyValue";

export default ConceptPropertyValue;

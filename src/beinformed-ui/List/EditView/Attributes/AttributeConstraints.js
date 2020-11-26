// @flow
import { FormAttributeAssistant } from "_component-registry/attributes-assistant";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: AttributeType,
};

const AttributeConstraints = ({ className, attribute }: Props) => {
  const showConstraints =
    attribute.inError() ||
    attribute.hasErrors() ||
    attribute.constraintCollection.some(
      (constraint) => !constraint.hasValidation()
    );

  if (showConstraints) {
    return (
      <FormAttributeAssistant
        className={className}
        showErrors={attribute.hasServerErrors()}
        attribute={attribute}
      />
    );
  }

  return null;
};

AttributeConstraints.displayName = "BI.AttributeConstraints";

export default AttributeConstraints;

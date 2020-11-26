// @flow
import { TextInput } from "_component-registry/input";

import type { NumberAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: NumberAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render string widget
 */
const AttributeNumber = ({
  className,
  attribute,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => (
  <TextInput
    className={className}
    name={name}
    id={id}
    value={attribute.inputvalue}
    readOnly={attribute.readonly}
    inError={inError}
    ariaLabel={attribute.label}
    onBlur={onBlur}
    onChange={(e) => onChange(attribute, e.currentTarget.value)}
    onFocus={onFocus}
  />
);

AttributeNumber.displayName = "BI.AttributeNumber";

export default AttributeNumber;

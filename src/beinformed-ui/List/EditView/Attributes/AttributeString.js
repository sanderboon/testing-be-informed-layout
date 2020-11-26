// @flow
import { TextInput } from "_component-registry/input";

import type { StringAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: StringAttributeModel,
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
const AttributeString = ({
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
    prepend={attribute.prefix}
    append={attribute.postfix}
    readOnly={attribute.readonly}
    inError={inError}
    ariaLabel={attribute.label}
    onBlur={onBlur}
    onChange={(e) => onChange(attribute, e.currentTarget.value)}
    onFocus={onFocus}
  />
);

AttributeString.displayName = "BI.AttributeString";

export default AttributeString;

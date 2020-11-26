// @flow
import { PasswordInput } from "_component-registry/input";

import type { PasswordAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: PasswordAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render password widget
 */
const AttributePassword = ({
  className,
  attribute,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => (
  <PasswordInput
    className={className}
    ariaLabel={attribute.label}
    name={name}
    id={id}
    value={attribute.inputvalue}
    readOnly={attribute.readonly}
    inError={inError}
    onBlur={onBlur}
    onChange={(e) => onChange(attribute, e.currentTarget.value)}
    onFocus={onFocus}
  />
);

AttributePassword.displayName = "BI.AttributePassword";

export default AttributePassword;

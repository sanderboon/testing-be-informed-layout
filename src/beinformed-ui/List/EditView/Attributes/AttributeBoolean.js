// @flow
import { BooleanInput } from "_component-registry/input";

import type { BooleanAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: BooleanAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render choice widget
 */
const AttributeBoolean = ({
  className,
  attribute,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => (
  <BooleanInput
    className={className}
    name={name}
    id={id}
    label={attribute.label}
    type={attribute.choicetype}
    options={attribute.options.all}
    readOnly={attribute.readonly}
    ariaLabel={attribute.label}
    inError={inError}
    onBlur={onBlur}
    onChange={(e) => onChange(attribute, e.currentTarget.value)}
    onValueChange={(value) => onChange(attribute, value)}
    onFocus={onFocus}
  />
);

AttributeBoolean.displayName = "BI.AttributeBoolean";

export default AttributeBoolean;

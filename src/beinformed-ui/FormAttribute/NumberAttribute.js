// @flow
import { StringAttribute } from "_component-registry/attributes";

import type { NumberAttributeModel } from "beinformed/models";
import type { Props } from "beinformed-ui/FormAttribute/BaseAttribute";

/**
 * Renders number widget, same as text widget with different css class
 */
const NumberAttribute = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  formLayout,
  onBlur,
  onChange,
  onClick,
  onFocus,
}: Props<NumberAttributeModel>) => (
  <StringAttribute
    className={className}
    attribute={attribute}
    name={name}
    id={id}
    questionContentConfiguration={questionContentConfiguration}
    formLayout={formLayout}
    autoFocus={false}
    onChange={onChange}
    onClick={onClick}
    onBlur={onBlur}
    onFocus={onFocus}
  />
);

NumberAttribute.displayName = "BI.NumberAttribute";

export default NumberAttribute;

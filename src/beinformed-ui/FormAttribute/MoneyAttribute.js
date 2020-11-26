// @flow
import { StringAttribute } from "_component-registry/attributes";

import type { MoneyAttributeModel } from "beinformed/models";
import type { Props } from "beinformed-ui/FormAttribute/BaseAttribute";

/**
 * Renders number widget, same as text widget with different css class
 */
const MoneyAttribute = ({
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
}: Props<MoneyAttributeModel>) => (
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

MoneyAttribute.displayName = "BI.MoneyAttribute";

export default MoneyAttribute;

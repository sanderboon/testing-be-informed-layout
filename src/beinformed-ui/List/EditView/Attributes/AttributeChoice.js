// @flow
import { ChoiceInput } from "_component-registry/input";

import type { ChoiceAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: ChoiceAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +stacked?: boolean,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render choice widget
 */
const AttributeChoice = ({
  className,
  attribute,
  stacked,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => (
  <ChoiceInput
    className={className}
    stacked={stacked}
    name={name}
    id={id}
    label={attribute.label}
    type={attribute.choicetype}
    options={attribute.options.all}
    isTree={attribute.isTree}
    readOnly={attribute.readonly}
    ariaLabel={attribute.label}
    inError={inError}
    onBlur={onBlur}
    onChange={(e) => onChange(attribute, e.currentTarget.value)}
    onValueChange={(value) => onChange(attribute, value)}
    onFocus={onFocus}
  />
);

AttributeChoice.displayName = "BI.AttributeChoice";

export default AttributeChoice;

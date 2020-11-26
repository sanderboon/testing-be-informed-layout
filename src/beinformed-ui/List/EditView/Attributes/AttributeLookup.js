// @flow
import { LookupInput } from "_component-registry/lookup";

import type { ChoiceAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: ChoiceAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render lookup table cell
 */
const AttributeLookup = ({
  className,
  attribute,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => (
  <LookupInput
    className={className}
    name={name}
    id={id}
    options={attribute.options}
    ariaLabel={attribute.label}
    onBlur={onBlur}
    onChange={(e) => onChange(attribute, e.currentTarget.value)}
    onValueChange={(value) => onChange(attribute, value)}
    onFocus={onFocus}
    isMultiple={attribute.isMultiple}
    readOnly={attribute.readonly}
    inError={inError}
    lookupLink={attribute.lookupLink}
    lookupList={{
      link: attribute.lookupListLink,
      label: attribute.lookupListLabel,
      isTable: attribute.choicetype === "table",
    }}
    layouthint={attribute.layouthint}
  />
);

AttributeLookup.displayName = "BI.AttributeLookup";

export default AttributeLookup;

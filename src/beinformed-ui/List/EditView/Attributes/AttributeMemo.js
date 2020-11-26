// @flow
import { WysiwygInput, TextareaInput } from "_component-registry/input";

import type { MemoAttributeModel, XMLAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: MemoAttributeModel | XMLAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render inline memo cell
 */
const AttributeMemo = ({
  className,
  attribute,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  if (attribute.formatted) {
    return (
      <WysiwygInput
        className={className}
        name={name}
        id={id}
        value={attribute.inputvalue}
        ariaLabel={attribute.label}
        onBlur={onBlur}
        onValueChange={(value) => onChange(attribute, value)}
        onFocus={onFocus}
        readOnly={attribute.readonly}
      />
    );
  }

  return (
    <TextareaInput
      className={className}
      name={name}
      id={id}
      value={attribute.inputvalue}
      ariaLabel={attribute.label}
      onBlur={onBlur}
      onChange={(e) => onChange(attribute, e.currentTarget.value)}
      onFocus={onFocus}
      inError={inError}
      readOnly={attribute.readonly}
    />
  );
};

AttributeMemo.displayName = "BI.AttributeMemo";

export default AttributeMemo;

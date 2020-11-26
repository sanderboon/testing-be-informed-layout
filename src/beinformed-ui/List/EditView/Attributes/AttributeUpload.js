// @flow
import { UploadInput } from "_component-registry/input";

import type { UploadAttributeModel } from "beinformed/models";
export type Props = {
  +attribute: UploadAttributeModel,
  +className?: string,
  +id: string,
  +name: string,
  +inError?: boolean,
  +onBlur: Function,
  +onChange: Function,
  +onFocus: Function,
};

/**
 * Render string widget
 */
const AttributeUpload = ({
  className,
  attribute,
  name,
  id,
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => (
  <UploadInput
    className={className}
    name={name}
    ariaLabel={attribute.label}
    id={id}
    value={attribute.inputvalue}
    initialFiles={attribute.files}
    isMultiple={attribute.multiple}
    uploadConstraints={attribute.uploadConstraints}
    readOnly={attribute.readonly}
    inError={inError}
    onBlur={onBlur}
    onValueChange={(value) => onChange(attribute, value)}
    onFocus={onFocus}
  />
);

AttributeUpload.displayName = "BI.AttributeUpload";

export default AttributeUpload;

// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { UploadInput } from "_component-registry/input";

import type { UploadAttributeModel } from "beinformed/models";
import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

const UploadAttribute = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  formLayout,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: Props<UploadAttributeModel>) => (
  <BaseAttribute
    className={className}
    attribute={attribute}
    name={name}
    id={id}
    questionContentConfiguration={questionContentConfiguration}
    formLayout={formLayout}
    onChange={onChange}
    onClick={onClick}
    onBlur={onBlur}
    onFocus={onFocus}
    renderInput={({
      value,
      inError,
      handleBlur,
      handleValueChange,
      handleFocus,
    }: InputProps) => (
      <UploadInput
        name={name}
        id={id}
        value={value}
        initialFiles={attribute.files}
        readOnly={attribute.readonly}
        placeholder={attribute.placeholder}
        inError={inError}
        isMultiple={attribute.multiple}
        uploadConstraints={attribute.uploadConstraints}
        onBlur={handleBlur}
        onValueChange={handleValueChange}
        onFocus={handleFocus}
      />
    )}
  />
);

UploadAttribute.displayName = "BI.UploadAttribute";

export default UploadAttribute;

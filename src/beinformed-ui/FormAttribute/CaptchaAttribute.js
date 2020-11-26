// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { CaptchaInput } from "_component-registry/input";

import type { CaptchaAttributeModel } from "beinformed/models";
import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

const CaptchaAttribute = ({
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
}: Props<CaptchaAttributeModel>) => (
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
    renderInput={({ value, inError, handleValueChange }: InputProps) => (
      <CaptchaInput
        name={name}
        id={id}
        value={value}
        inError={inError}
        onValueChange={handleValueChange}
      />
    )}
  />
);

CaptchaAttribute.displayName = "BI.CaptchaAttribute";

export default CaptchaAttribute;

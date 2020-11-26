// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { PasswordInput } from "_component-registry/input";

import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";
import type { PasswordAttributeModel } from "beinformed/models";
type PasswordAttributeProps = { +enableSuggestions?: boolean };

const PasswordAttributeStandard = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  formLayout,
  enableSuggestions,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: {
  ...Props<PasswordAttributeModel>,
  ...PasswordAttributeProps,
}) => (
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
      handleChange,
      handleFocus,
    }: InputProps) => (
      <PasswordInput
        name={name}
        id={id}
        value={value}
        readOnly={attribute.readonly}
        placeholder={attribute.placeholder}
        inError={inError}
        enableSuggestions={
          attribute.key === "password_old" ? false : enableSuggestions
        }
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    )}
  />
);

PasswordAttributeStandard.displayName = "BI.PasswordAttributeStandard";

export default PasswordAttributeStandard;

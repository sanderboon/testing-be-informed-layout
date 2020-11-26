// @flow
import {
  PasswordAttributeStandard,
  PasswordAttributeWithConfirm,
} from "_component-registry/attributes";

import { CONFIRM_PASSWORD } from "beinformed/constants/LayoutHints";

import type { Props } from "beinformed-ui/FormAttribute/BaseAttribute";
import type { PasswordAttributeModel } from "beinformed/models";
type PasswordAttributeProps = { +enableSuggestions?: boolean };

const PasswordAttribute = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  formLayout,
  enableSuggestions,
  onChange,
  onBlur,
  onFocus,
}: {
  ...Props<PasswordAttributeModel>,
  ...PasswordAttributeProps,
}) => {
  if (attribute.layouthint.has(CONFIRM_PASSWORD)) {
    return (
      <PasswordAttributeWithConfirm
        className={className}
        attribute={attribute}
        name={name}
        id={id}
        questionContentConfiguration={questionContentConfiguration}
        formLayout={formLayout}
        enableSuggestions={enableSuggestions}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }

  return (
    <PasswordAttributeStandard
      className={className}
      attribute={attribute}
      name={name}
      id={id}
      questionContentConfiguration={questionContentConfiguration}
      formLayout={formLayout}
      enableSuggestions={
        attribute.key === "password_old" ? false : enableSuggestions
      }
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

PasswordAttribute.displayName = "BI.PasswordAttribute";

export default PasswordAttribute;

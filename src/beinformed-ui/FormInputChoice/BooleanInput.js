// @flow
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import {
  SelectInput,
  ChoiceInputGroup,
  InputGroup,
  ToggleInput,
  BooleanCheckbox,
} from "_component-registry/input";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";

export type Props = {
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +label?: string,
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +name: string,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +options: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
  +formLayout?: ?string,
  +placeholder?: string,
  +stacked?: boolean,
  +type: "checkbox" | "radiobutton" | "combobox" | "toggle",
  +inError?: boolean,
  +onBlur?: (
    e: SyntheticInputEvent<HTMLSelectElement | HTMLInputElement>
  ) => void,
  +onChange: (
    e: SyntheticInputEvent<HTMLSelectElement | HTMLInputElement>
  ) => void,
  +onValueChange: (value: any) => void,
  +onFocus?: (
    e: SyntheticInputEvent<HTMLSelectElement | HTMLInputElement>
  ) => void,
};

const StyledMessage = styled(Message)`
  color: ${themeProp("GREY_600", "#6c757d")};
  font-style: italic;
`;

const BooleanInput = ({
  className,
  options,
  type = "checkbox",
  disabled,
  id,
  label,
  name,
  optionContentConfiguration,
  placeholder,
  readOnly,
  formLayout,
  stacked,
  inError,
  onBlur,
  onChange,
  onValueChange,
  onFocus,
}: Props) => {
  const hasOptions = options.length > 0;

  const standardProps = {
    className,
    name,
    id,
    options,
    disabled,
    readOnly,
    inError,
  };

  if (hasOptions && type === "toggle") {
    return (
      <ToggleInput
        {...standardProps}
        onBlur={onBlur}
        onFocus={onFocus}
        label={label}
        formLayout={formLayout}
        onValueChange={onValueChange}
      />
    );
  } else if (hasOptions && type === "checkbox" && formLayout === "compact") {
    return (
      <BooleanCheckbox
        {...standardProps}
        onBlur={onBlur}
        onFocus={onFocus}
        label={label}
        onValueChange={onValueChange}
      />
    );
  } else if ((hasOptions && type === "checkbox") || type === "radiobutton") {
    return (
      <ChoiceInputGroup
        {...standardProps}
        onBlur={onBlur}
        onFocus={onFocus}
        label={label}
        onChange={onChange}
        stacked={stacked}
        formLayout={formLayout}
        optionContentConfiguration={optionContentConfiguration}
        type={type}
      />
    );
  } else if (hasOptions && type === "combobox") {
    return (
      <SelectInput
        {...standardProps}
        isMultiple={false}
        optionContentConfiguration={optionContentConfiguration}
        placeholder={placeholder}
        onValueChange={onValueChange}
      />
    );
  }

  return (
    <InputGroup>
      <StyledMessage
        id="ChoiceField.Msg.NotSupported"
        defaultMessage="Input not suported"
      />
    </InputGroup>
  );
};

BooleanInput.displayName = "BI.BooleanInput";

export default BooleanInput;

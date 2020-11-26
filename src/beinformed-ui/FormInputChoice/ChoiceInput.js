// @flow
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import {
  SelectInput,
  TableInput,
  TreeInput,
  ChoiceInputGroup,
  InputGroup,
} from "_component-registry/input";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +isTree?: boolean,
  +label?: string,
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +name: string,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +headers?: Array<Object> | null,
  +options: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
  +formLayout?: ?string,
  +placeholder?: string,
  +stacked?: boolean,
  +type:
    | "checkbox"
    | "radiobutton"
    | "list"
    | "listview"
    | "combobox"
    | "longlist"
    | "table",
  +isMultiple?: boolean,
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

const ChoiceInput = ({
  className,
  options,
  isTree = false,
  type = "checkbox",
  headers,
  ariaLabel,
  ariaLabelledBy,
  disabled,
  id,
  label,
  name,
  optionContentConfiguration,
  isMultiple,
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

  if (hasOptions && isTree && (type === "checkbox" || type === "radiobutton")) {
    return (
      <TreeInput
        {...standardProps}
        type={type}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        label={label}
        optionContentConfiguration={optionContentConfiguration}
        stacked={stacked}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
    );
  } else if ((hasOptions && type === "checkbox") || type === "radiobutton") {
    return (
      <ChoiceInputGroup
        {...standardProps}
        type={type}
        label={label}
        optionContentConfiguration={optionContentConfiguration}
        formLayout={formLayout}
        stacked={stacked}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
    );
  } else if (hasOptions && type === "table") {
    return (
      <TableInput
        {...standardProps}
        headers={headers}
        isMultiple={isMultiple}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
    );
  } else if (
    (hasOptions && type === "list") ||
    type === "listview" ||
    type === "combobox" ||
    type === "longlist"
  ) {
    return (
      <SelectInput
        {...standardProps}
        placeholder={placeholder}
        optionContentConfiguration={optionContentConfiguration}
        isMultiple={isMultiple}
        onValueChange={onValueChange}
      />
    );
  }

  return (
    <InputGroup>
      {hasOptions ? (
        <StyledMessage
          id="ChoiceField.Msg.NotSupported"
          defaultMessage="Input not suported"
        />
      ) : (
        <StyledMessage
          id="ChoiceField.Msg.NoOptionsAvailable"
          defaultMessage="No options available"
        />
      )}
    </InputGroup>
  );
};

ChoiceInput.displayName = "BI.ChoiceInput";

export default ChoiceInput;

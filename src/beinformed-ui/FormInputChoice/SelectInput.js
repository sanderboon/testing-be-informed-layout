// @flow
import classNames from "classnames";

import {
  Dropdown,
  DropdownButton,
  DropdownChildren,
} from "_component-registry/dropdown";
import {
  InputGroup,
  SelectInputActiveOptions,
  SelectInputAvailableOption,
} from "_component-registry/input";

import { flattenOptions } from "./_util";

import type { Node } from "react";
import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +children?: Node,
  +disabled?: boolean,
  +id?: string,
  +name: string,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +options: Array<ChoiceAttributeOptionModel>,
  +placeholder?: string,
  +readOnly?: boolean,
  +isMultiple?: boolean,
  +inError?: boolean,
  +onValueChange: (value: any) => void,
};

/**
 * Render a html select
 */
const SelectInput = ({
  options,
  id,
  name,
  className,
  disabled,
  readOnly,
  inError,
  placeholder,
  optionContentConfiguration,
  children,
  isMultiple,
  onValueChange,
}: Props) => {
  const flattenedOptions = flattenOptions(options);
  const value = flattenedOptions
    .filter((option) => option.selected)
    .map((option) => option.code)
    .join(",");

  const buttonStyle = inError ? "DANGER" : "DEFAULT";

  return (
    <InputGroup className={classNames("select-input", className)}>
      {readOnly ? (
        <div id={id || name} data-value={value}>
          <SelectInputActiveOptions
            options={flattenedOptions}
            placeholder={placeholder}
            optionContentConfiguration={optionContentConfiguration}
            isMultiple={isMultiple}
            readOnly={readOnly}
            disabled={disabled}
            onRemove={onValueChange}
          />
        </div>
      ) : (
        <Dropdown activeValue={value}>
          <DropdownButton
            id={id || name}
            disabled={disabled}
            buttonStyle={buttonStyle}
          >
            <SelectInputActiveOptions
              options={flattenedOptions}
              placeholder={placeholder}
              optionContentConfiguration={optionContentConfiguration}
              isMultiple={isMultiple}
              readOnly={readOnly}
              disabled={disabled}
              onRemove={onValueChange}
            />
          </DropdownButton>
          <DropdownChildren wrapContent>
            {flattenedOptions.map((option: ChoiceAttributeOptionModel) => (
              <SelectInputAvailableOption
                key={option.code}
                option={option}
                optionContentConfiguration={optionContentConfiguration}
                disabled={disabled}
                onClick={onValueChange}
              />
            ))}
          </DropdownChildren>
        </Dropdown>
      )}
      {children}
    </InputGroup>
  );
};

SelectInput.displayName = "BI.SelectInput";

export default SelectInput;

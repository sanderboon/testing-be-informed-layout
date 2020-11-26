// @flow
import { useMessage } from "beinformed/i18n";
import { ChoiceOption } from "_component-registry/input";

import type { Node } from "react";
import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +options: Array<ChoiceAttributeOptionModel>,
  +placeholder?: string,
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +isMultiple?: boolean,
  +readOnly?: boolean,
  +disabled?: boolean,
  +onRemove: (value: any) => void,
};

const SelectInputActiveOptions = ({
  className,
  options,
  placeholder = "",
  optionContentConfiguration,
  isMultiple,
  readOnly,
  disabled,
  onRemove,
}: Props) => {
  const defaultPlaceholder = useMessage(
    "SelectField.Placeholder",
    "Choose an option"
  );
  const selectedOptions = options.filter((option) => option.selected);

  if (selectedOptions.length > 0) {
    return options
      .filter((option) => option.selected)
      .map<Node>((option) => (
        <ChoiceOption
          key={option.code}
          className={className}
          option={option}
          optionContentConfiguration={optionContentConfiguration}
          isMultiple={isMultiple}
          isRemovable={!readOnly && !disabled}
          onRemove={() => onRemove(option)}
        />
      ));
  }

  if (readOnly || (placeholder && placeholder !== "")) {
    return placeholder;
  }

  return defaultPlaceholder;
};

SelectInputActiveOptions.displayName = "BI.SelectInputActiveOptions";

export default SelectInputActiveOptions;

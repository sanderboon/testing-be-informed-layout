// @flow
import classNames from "classnames";

import { useMessage } from "beinformed/i18n";

import {
  DatetimeInput,
  SelectInput,
  TextInput,
} from "_component-registry/input";

import { QuickSearchButton } from "_component-registry/quicksearch";

import {
  ChoiceAttributeModel,
  DatetimeAttributeModel,
} from "beinformed/models";

import type { FilterModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +searchOption: FilterModel | null,
  +value: string,
  +onChange: (value: string) => void,
};

/**
 * Render quick search input
 */
const QuickSearchInput = ({
  className,
  searchOption,
  value,
  onChange,
}: Props) => {
  const placeHolderText = useMessage(
    "QuickSearchInput.Placeholder",
    "Search by {SEARCHOPTION_LABEL}",
    {
      SEARCHOPTION_LABEL: searchOption ? searchOption.label : "",
    }
  );

  if (!searchOption) {
    return null;
  }

  const handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const { attribute } = searchOption;

  if (attribute instanceof ChoiceAttributeModel) {
    return (
      <SelectInput
        key="search-input"
        className={classNames("quicksearch-input", className)}
        name={attribute.name}
        options={attribute.options.map((option) => {
          const newOption = option;

          newOption.selected = option.code === value;

          return newOption;
        })}
        placeholder={placeHolderText}
        onValueChange={onChange}
      />
    );
  }

  if (attribute instanceof DatetimeAttributeModel) {
    return (
      <DatetimeInput
        key="search-input"
        className={classNames("quicksearch-input", className)}
        name={attribute.name}
        value={value}
        inError={attribute.inError()}
        ariaLabel={placeHolderText}
        placeholder={placeHolderText}
        autoComplete="off"
        append={QuickSearchButton}
        onValueChange={onChange}
        onChange={handleChange}
      />
    );
  }

  return (
    <TextInput
      key="search-input"
      className={classNames("quicksearch-input", className)}
      name={attribute.name}
      value={value}
      inError={attribute.inError()}
      ariaLabel={placeHolderText}
      placeholder={placeHolderText}
      autoComplete="off"
      append={QuickSearchButton}
      onChange={handleChange}
    />
  );
};

QuickSearchInput.displayName = "BI.QuickSearchInput";

export default QuickSearchInput;

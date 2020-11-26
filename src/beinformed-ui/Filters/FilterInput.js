// @flow
import { get } from "lodash";

import {
  ChoiceInput,
  DatetimeInput,
  TextInput,
} from "_component-registry/input";
import { LookupInput } from "_component-registry/lookup";

import {
  ChoiceAttributeModel,
  DatetimeAttributeModel,
} from "beinformed/models";

import type { FilterAttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: FilterAttributeType,
  +id: string,
  +label?: string,
  +value?: string,
  +onChange: Function,
  +onValueChange: Function,
  +onKeyDown?: Function,
};

const FilterInput = ({
  className,
  attribute,
  id,
  label,
  value,
  onChange,
  onValueChange,
  onKeyDown,
}: Props) => {
  const inputvalue =
    value ||
    (attribute.readonly ? attribute.readonlyvalue : attribute.inputvalue);

  if (attribute instanceof ChoiceAttributeModel) {
    if (attribute.type === "lookup") {
      const lookupListInfo = {
        link: attribute.lookupListLink,
        label: attribute.lookupListLabel,
        isTable: attribute.choicetype === "table",
      };

      return (
        <LookupInput
          id={id}
          name={id}
          label={label}
          isMultiple={attribute.isMultiple}
          options={attribute.options}
          lookupList={lookupListInfo}
          lookupLink={attribute.lookupLink}
          layouthint={attribute.layouthint}
          inError={attribute.inError()}
          onChange={onChange}
          onValueChange={onValueChange}
          onClick={onChange}
        />
      );
    }

    return (
      <ChoiceInput
        stacked
        id={id}
        name={id}
        label={label}
        type={attribute.choicetype}
        isMultiple={attribute.isMultiple}
        options={attribute.options.all}
        inError={attribute.inError()}
        onChange={onChange}
        onValueChange={onValueChange}
      />
    );
  }

  if (attribute instanceof DatetimeAttributeModel) {
    return (
      <DatetimeInput
        className={className}
        name={id}
        id={id}
        value={inputvalue}
        append={attribute.postfix}
        readOnly={attribute.readonly}
        inError={attribute.inError()}
        inFilterContext
        mindate={attribute.mindate}
        maxdate={attribute.maxdate}
        format={attribute.format}
        placeholder={
          attribute.placeholder === ""
            ? attribute.formatLabel
            : attribute.placeholder
        }
        onChange={onChange}
        onValueChange={onValueChange}
        onKeyDown={onKeyDown}
      />
    );
  }

  const prefix = get(attribute, "prefix", null);
  const postfix = get(attribute, "postfix", null);
  const placeholder = get(attribute, "placeholder", null);
  return (
    <TextInput
      className={className}
      name={id}
      id={id}
      value={inputvalue}
      prepend={prefix}
      append={postfix}
      readOnly={attribute.readonly}
      placeholder={placeholder}
      inError={attribute.inError()}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
FilterInput.displayName = "BI.FilterInput";

export default FilterInput;

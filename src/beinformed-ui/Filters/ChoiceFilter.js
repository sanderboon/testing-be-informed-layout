// @flow
import classNames from "classnames";

import { FormAttributeAssistant } from "_component-registry/attributes-assistant";
import { FilterInput } from "_component-registry/filters";

import type { FilterModel, ConceptIndexFilterModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +filter: FilterModel | ConceptIndexFilterModel,
  +onChange: Function,
};

const ChoiceFilter = ({ className, filter, onChange }: Props) => {
  const { attribute } = filter;

  const label = filter.context
    ? `${filter.label} (${filter.contextLabel})`
    : filter.label;

  return (
    <div className={classNames("choicefilter", className)}>
      <FilterInput
        attribute={attribute}
        id={filter.name}
        label={label}
        onChange={(e) => onChange(attribute, e.target.value, true)}
        onValueChange={(value) => onChange(attribute, value, true)}
      />
      <FormAttributeAssistant attribute={attribute} />
    </div>
  );
};

ChoiceFilter.displayName = "BI.ChoiceFilter";

export default ChoiceFilter;

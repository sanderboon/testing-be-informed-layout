// @flow
import { ListHref } from "beinformed/models";

import { ChosenBaseFilter } from "_component-registry/filters";

import type { ChoiceAttributeModel, ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +attribute: ChoiceAttributeModel,
  +param: string,
};

const ChosenChoiceFilter = ({ className, list, attribute, param }: Props) => {
  const selectedOptions = attribute.options && attribute.options.selected;
  return selectedOptions.map((option) => {
    const value = selectedOptions
      .filter((selOption) => selOption.code !== option.code)
      .map((selOption) => selOption.code)
      .join(",");

    const deleteHref = new ListHref(list.selfhref).setParameter(
      param,
      value,
      list.key
    );

    return (
      <ChosenBaseFilter
        key={`filter-${option.label}`}
        className={className}
        deleteHref={deleteHref}
      >
        {`${attribute.label}: ${option.label}`}
      </ChosenBaseFilter>
    );
  });
};

ChosenChoiceFilter.displayName = "BI.ChosenChoiceFilter";

export default ChosenChoiceFilter;

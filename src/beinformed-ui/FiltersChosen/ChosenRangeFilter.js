// @flow
import { ListHref } from "beinformed/models";
import { AttributeValueText } from "_component-registry/attributes-readonly";

import {
  ChosenBaseFilter,
  ChosenFilterLabel,
} from "_component-registry/filters";

import type { Props } from "./ChosenFilter";

const ChosenRangeFilter = ({ className, list, filter }: Props) => {
  const deleteHref = new ListHref(list.selfhref);

  filter.params.forEach((param) => {
    deleteHref.removeParameter(param.name, list.key);
  });

  return (
    <ChosenBaseFilter className={className} deleteHref={deleteHref}>
      <ChosenFilterLabel attribute={filter.attribute} />
      <AttributeValueText attribute={filter.attribute} />
    </ChosenBaseFilter>
  );
};

ChosenRangeFilter.displayName = "BI.ChosenRangeFilter";

export default ChosenRangeFilter;

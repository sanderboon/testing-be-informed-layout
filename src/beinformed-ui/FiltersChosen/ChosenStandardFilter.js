// @flow
import { ListHref } from "beinformed/models";
import { AttributeValueText } from "_component-registry/attributes-readonly";

import {
  ChosenBaseFilter,
  ChosenFilterLabel,
} from "_component-registry/filters";

import type { FilterAttributeType, ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +attribute: FilterAttributeType,
  +param: string,
};

const ChosenStandardFilter = ({ className, list, attribute, param }: Props) => {
  const deleteHref = new ListHref(list.selfhref).removeParameter(
    param,
    list.key
  );

  return (
    <ChosenBaseFilter className={className} deleteHref={deleteHref}>
      <ChosenFilterLabel attribute={attribute} />
      <AttributeValueText attribute={attribute} />
    </ChosenBaseFilter>
  );
};

ChosenStandardFilter.displayName = "BI.ChosenStandardFilter";

export default ChosenStandardFilter;

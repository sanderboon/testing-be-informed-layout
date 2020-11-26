// @flow
import classNames from "classnames";
import styled from "styled-components";

import { ListHref } from "beinformed/models";

import { Message } from "beinformed/i18n";

import { Link } from "_component-registry/link";

import type { ListModel, FilterModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +filters: Array<FilterModel>,
};

const StyledRemoveLink = styled(Link)`
  margin-left: auto;
  white-space: nowrap;
`;

const RemoveAllLink = ({ className, list, filters = [] }: Props) => {
  const resetHref = new ListHref(list.selfhref);
  resetHref.page = 1;

  filters.forEach((filter) => {
    filter.params.forEach((param) => {
      resetHref.removeParameter(param.name, list.key);
    });
  });

  return (
    <StyledRemoveLink
      className={classNames(
        className,
        "clear-filters-link",
        "reset-filters-link"
      )}
      href={resetHref}
      icon="refresh"
    >
      <Message id="Filters.Button.ClearAll" defaultMessage="Clear all" />
    </StyledRemoveLink>
  );
};
RemoveAllLink.displayName = "BI.RemoveAllLink";

export default RemoveAllLink;

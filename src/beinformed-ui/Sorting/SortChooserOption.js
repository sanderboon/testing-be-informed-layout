// @flow
import { forwardRef } from "react";

import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { DropdownLink } from "_component-registry/dropdown";
import { Icon } from "_component-registry/icon";

import { getGroupLabel } from "./_util";

import type { SortOptionModel, ListHref } from "beinformed/models";
export type Props = {
  +className?: string,
  +option: SortOptionModel,
  +href: ListHref,
  +onClick: Function,
};

const StyledGroupLabel = styled.span`
  font-style: italic;
  margin-left: ${spacer(0.25)};
`;

const SortChooserOption = forwardRef<Props, typeof DropdownLink>(
  ({ className, option, href, onClick }: Props, ref) => {
    const groupLabel = getGroupLabel(option.group, option);

    return (
      <DropdownLink
        ref={ref}
        className={className}
        href={href}
        value={option.oppositeValue}
        onClick={onClick}
      >
        {option.label}
        {groupLabel && <StyledGroupLabel>{groupLabel}</StyledGroupLabel>}
        {option.selected && (
          <Icon
            name={
              option.sortorder === "desc" ? "sort-ascending" : "sort-descending"
            }
            textBefore
          />
        )}
      </DropdownLink>
    );
  }
);
SortChooserOption.displayName = "BI.SortChooserOption";

export default SortChooserOption;

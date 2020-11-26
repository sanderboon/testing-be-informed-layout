// @flow
import { isUndefined } from "lodash";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { spacers, roundedCorners } from "beinformed/theme/utils";

import { Link } from "_component-registry/link";
import { AttributeList } from "_component-registry/attributes-readonly";
import { BaseListItem, ListItemTitle } from "_component-registry/list";

import { getListItemHref } from "../_util";

import type { ListModel, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +item: ListItemModel,
  +selectType?: "single" | "multi",
  +isSelected: boolean,
  +querystring?: string,
  +openListItemInCaseView?: boolean,
  +onSelect?: Function,
  +isLookup?: boolean,
};

const StyledListItem = styled(BaseListItem)`
  border: 1px solid rgba(0, 0, 0, 0.125);

  padding: ${({ isSelectable }) => (isSelectable ? 0 : spacers(0.75, 1.25))};

  &:first-child {
    ${roundedCorners("top-left")};
    ${roundedCorners("top-right")};
  }

  &:last-child {
    ${roundedCorners("bottom-left")};
    ${roundedCorners("bottom-right")};
  }
`;

const StyledDetail = styled.div`
  ${({ isSelectable }) =>
    isSelectable &&
    css`
      padding: ${spacers(0.75, 0.625, 0.75, 1.25)};
    `};

  display: block;
  width: 100%;
`;

const ListItem = ({
  className,
  list,
  item,
  selectType,
  isSelected,
  querystring,
  openListItemInCaseView,
  isLookup,
  onSelect,
}: Props) => {
  const { titleAttribute, attributes } = item;
  const isSelectable = !isUndefined(selectType) && Boolean(onSelect);

  const href = isLookup
    ? null
    : getListItemHref(list, item, querystring, openListItemInCaseView);

  return (
    <StyledListItem
      className={classNames("list-group-item", className)}
      isSelectable={isSelectable}
      list={list}
      item={item}
      selectType={selectType}
      querystring={querystring}
      openListItemInCaseView={openListItemInCaseView}
      isLookup={isLookup}
      isSelected={isSelected}
      onSelect={onSelect}
    >
      {href ? (
        <StyledDetail
          className="listitem-detail"
          as={Link}
          href={href}
          isSelectable={isSelectable}
        >
          {titleAttribute && <ListItemTitle attribute={titleAttribute} />}
          <AttributeList direction="horizontal" attributes={attributes} />
        </StyledDetail>
      ) : (
        <StyledDetail className="listitem-detail" isSelectable={isSelectable}>
          {titleAttribute && <ListItemTitle attribute={titleAttribute} />}
          <AttributeList direction="horizontal" attributes={attributes} />
        </StyledDetail>
      )}
    </StyledListItem>
  );
};

ListItem.displayName = "BI.ListItem";

export default ListItem;
